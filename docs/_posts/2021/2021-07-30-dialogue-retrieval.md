---
title: 좀 더 정확하고 빠른 Dialogue Retrieval 방법 - 1
author: 김대규
author_id: hnc-daekyoo
tags: NLP Dialog-System Retriever Bi-Encoder Cross-Encoder 
excerpt: 대화 모델에서 사용하는 Retriever에 대해 살펴봅니다
---

# 좀 더 정확하고 빠른 Dialogue Retrieval 방법 - 1

Dialogue task는 입력에 대해 적절한 답변을 선택하는 task로 간단히 생각해 볼 수 있습니다. 이를 모델 입장에서 말하면,  적절한 답변을 출력하기 위해 input 과 response candidate들 간에 적절한 scoring 작업을 수행한다고 얘기할 수 있습니다.

예를들어 아래와 같이 "다음 주에 가족끼리 놀러 갈려고"라는 1개의 input이 있고 {"친구들끼리 좋은 시간 되세요.", "오랜만에 가족끼리 놀러가니 기분이 좋으시겠어요.", "피곤하시군요 좀 쉬세요" ...} 등과 같은 response candidate set이 있다고 한다면 적절한 response를 선택하기 위해 input과 각 candidate에 스코어링을 진행하는 것으로 설명 할 수 있습니다.(multi sentence scoring)

이처럼 검색(Retrieval)은 입력에 대해 관련 높은 여러 후보에서 적합한 답변을 선택하는 Multi sentence scoring을 요구하는 task입니다. 앞서 말씀드린 적절한 답변을 선택하는 문제나 혹은 질의에 대한 문서 검색 영역에도 해당합니다.

![selection_response]({{ site.assets }}/2021/2021-07-30-dialogue-retrieval.png)

검색(retrieval)의 방법, 즉 입력 시퀀스와 이에 대응하는 레이블 시퀀스 간에 비교를 수행하는 방법에는 Bi-Encoder와 Cross-Encoder 방식이 있습니다. 아래 부터는 기존 방식에 대해 속도와 성능 면에서 장단점과 지난 2020년 Facebook AI Research에서 릴리즈한 Blender bot 1.0의 Poly-Encoder 모델에 대해 설명하고, 실용적인 부분에서 Poly-Encoder가 어떤 점을 기여했는지를 설명하고자 합니다.

Bi-Encoder, Cross-Encoder, Poly-Encoder 모두 이제는 일반화된 자연어처리 학습 방식이라고 말할 수 있는 사전학습된 언어모델을 기반으로 각각의 학습방식을 파인튜닝합니다.(이를 Transfer Learning이라고도 합니다.) 여기서는 사전학습 언어모델로 BERT를 사용해 설명하겠습니다.

각각의 입력(INPUT)과 답변(LABEL)은 3개 embedding을 합친것으로 표현됩니다. 토큰 임베딩, 포지션 임베딩 그리고 세그먼트 임베딩 입니다. 입력 토큰에 대한 세그먼트는 0이며 label 토큰에 대한 세그먼트는 1입니다. 이후 INPUT과 LABEL은 구분자인 스페셜 토큰인 [S] (Seperate token)을 주변에 붙여 입력으로 사용하게 됩니다.

# Bi-Encoder

Bi-Encoder는 먼저 input과 candidate label에 대해 별도의 벡터로 인코드됩니다. 여기서 input과 label이 별도로 인코드 된것 처럼, 세그먼트 토큰들은 모두 0 입니다. 즉 각각의 input과 candiate를 사전학습 언어모델에 입력으로 전달하여 벡터 표현을 얻도록 합니다. 그 후 이 출력을 matrix를 통해 차원을 축소하는 작업을 거칩니다. 이는 아래와 같이 표현이 가능합니다.

$$y_{ctxt} = red(T_1(ctxt)) \\
y_{cand} = red(T_2(cand))$$

$T_1$과 $T_2$는 앞서 설명한 사전학습된 언어모델(BERT) 입니다. 당연히 처음에는 동일하게 초기화 되어있을 수 있지만 파인튜닝을 거치면서 별도로 업데이트가 될 것입니다. 그리고 이 $T$의 출력은 입력길이가 $N$이라면 입력 $x$에 대해 $T(x) = h_1, .., h_N$를 출력으로 내게 됩니다. 결과적으로 입력 $x$간에 self-attention을 수행하여 $N$개의 표현을 내게 됩니다. 이 후 $red()$로 표현된 weighted-sum을 처리하여 멀티 표현으로되어 있는 벡터를 하나의 벡터로 축소하여 학습하는 내용을 좀 더 선명해지도록 하는 효과를 가져옵니다.

![bi-encoder]({{ site.assets }}/2021/2021-07-30-bi-encoder.png)

이제 후보 $cand_i$의 점수는 $s(ctxt, cand_i) = y_{ctxt} \cdot y_{cand_i}$인 dot-product로 계산됩니다. 모델은 $cand_1$은 정답 레이블이고 다른 것들은 학습 셋에서 가져온 $y_{ctxt} \cdot y_{cand_1} , ..., y_{ctxt} \cdot y_{cand_n}$인 $s(ctxt, cand_i)$ logit의 cross-entropy loss를 최소화하도록 학습됩니다. 여기서 $cand_1$은 올바른 후보(label)이고 나머지는 훈련 세트에서 가져온 negative samples입니다. 

$$[s(ctxt, cand_1), s(ctxt, cand_2), s(ctxt, cand_3), \dots, s(ctxt, cand_n)]$$

Bi-Encoder의 최대 장점은 input과 label을 별도로 encoding하기 때문에 representation이 분리되어있어 미리 계산한 임베딩을 캐싱할 수 있어 속도에 매우 빠르다는 것입니다. 이는 다시 말해, FAISS나 Annoy와 같은 MIPS tool을 사용해 임베딩을 해싱하여 매우 빠르게 처리할 수 있습니다.

# Cross-Encoder

Cross-encoder는 input과 label을 스페셜 토큰 [S]를 사이로 하나의 입력으로 합쳐(concat) 사용합니다. 아까 input embedding은 토큰 임베딩 + 세그먼트 임베딩 + 포지션 임베딩의 조합이라고 했는데. 여기에서는 input과 label이 결합되어 있으므로 input 토큰은 0, label 토큰은 1로 표현됩니다.

![input-label]({{ site.assets }}/2021/2021-07-30-input-label.png)

따라서 input과 label이 합쳐진 하나의 표현이 입력으로 feed되어 full self attion을 수행합니다. 즉  input의 모든 토큰들과 label의 모든 토큰들은 서로서로 attention 계산에 참여하게 됩니다. 따라서 BERT스스로가 input과 label사이에 풍부한 상호작용을 하도록 합니다. 

![cross-encoder]({{ site.assets }}/2021/2021-07-30-cross-encoder.png)

셀프 어센텬 후에, BERT의 모든 입력 토큰에 대한 인코딩 출력 중에 첫번째 토큰 (즉 [S] 토큰, [CLS]이기도 합니다)에 해당하는 임베딩을 사용하여 single representation으로 줄입니다. 그 후 linear projection을 수행하여 스칼라 점수로 변환합니다.

$$y_{ctxt,cand} = h_1 = f irst(T(ctxt, cand) \\
s(ctxt, cand_i) = y_{ctxt, cand_i} \cdot W$$

마찬가지로 주어진 logits과 Cross-Entropy loss를 최소화하여 학습이 진행됩니다. Cross-Encoder는 Bi-Encoder보다 입력에 대해 더 풍부한 attend 계산이 가능함에 따라 Bi-Encoder보다 높은 정확도를 제공합니다. 하지만 후보 레이블드을  Bi-Encoder처럼 별도로 인코딩 할 수 없기 때문에 사전에 캐시할 수 없어 추론이 매우 느릴 수 밖에 없습니다. 이런 이유로 Cross-Encoder는 서비스보다는 연구용으로 많이 쓰입니다.

# Poly-Encoder

representation이 분리되어 있기 때문에, Bi-encoder는 인코드된 candidate를 캐시할 수 있으며 이들 표현을 재사용하여 각 입력에 대해 빠른 예측 시간을 낼 수 있습니다. Cross-encoder는 반드시 각 입력과 레이블에 대해 인코딩을 재계산해야합니다. Humeau는 Poly-encoder 논문을 통해(Poly-encoders: architectures and pre-training strategies for fast and accurate multi-sentence scoring, 2019) Bi-Encoder와 Cross-Encoder의 장점을 혼합하여 이 문제를 해결하였습니다.

결론부터 말씀드리면 Poly-Endoer가 Bi-Encoder와 Cross-Encoder의 좋은 점만 취함으로써 Cross-Encoder보다는 빠르고 Bi-Encoder보다는 정확합니다.

먼저 입력은 Bi-Encoder처럼 input과 label이 별도로 인코딩 됩니다.

이후 총 3개의 attention 계산을 합니다.

1. Self-attention
2. Code와 context(1번 self-attention의 출력)과의 attention
3. Candidate label과 input context와의 attention

위의 3가지 attention과 Poly-Encoder에 대한 설명은 이후 post에서 이어서 하겠습니다.

## Reference
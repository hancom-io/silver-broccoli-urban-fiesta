---
title: Vision Transformer
author: 
  name: 박호준
  uri: https://github.com/hnc-hojunpark
tags: Vision-Transformer Swin-Transformer Attention
excerpt: Transformer를 이미지에 적용하는 방법에 대해 알아보자
use_math: true
---

# Vision Transformer

<br>
최근 이미지 인식에 Transformer를 적용하여 높은 성능을 달성하는 것이 화제가 되었습니다. 기존에는 Convolutional Layer를 겹겹이 쌓는 방식으로 이미지의 특징을 추출하고 이를 통해 이미지를 인식하는 방법이 대세였지만 Transformer 적용으로 인해 이미지 인식 패러다임이 바뀔 수 있다는 걸 보여주고 있습니다.

들어가기에 앞서 이 Transformer가 무엇인지 간략하게 알아보겠습니다.
Transformer는 주로 자연어 처리 분야에 적용되어 높은 성능을 이끌어왔습니다. 최근 몇 년간 자연어 처리의 많은 Task에서 SOTA를 이룬 BERT, GPT 언어모델은 각각 Transformer의 Encoder와 Decoder를 기반한 모델입니다. Transformer의 특징은 RNN, CNN과는 다르게 Attention만을 활용해 모델을 구축한 것입니다. 그림 1과 같이 Encoder-Decoder 구조로 이루어졌으며, Attention이 적용되어 데이터 간의 관계를 파악합니다.
자연어 처리 분야는 이제 Transformer를 기반한 이러한 BERT와 GPT와 같은 언어모델을 pre-training한 후 downstream task에 따라 fine-tuning하는 방식으로 일반화되었다고 할 수 있습니다.

>!["encoder-decoder"]({{ site.assets }}/2021/2021-08-01-encoder-decoder.jpg)
> *그림 1. Encoder-Decoder[1]*{: .caption }
 

그러면 이미지 인식 분야에서는 Transformer가 어떻게 적용이 될까요?
자연어처리 분야에 적용되어 높은 성능을 내던 Transformer는 이미지 인식 분야에서는 제한된 범위에서 일부 요소 기술로만 적용되어왔을 뿐, CNN의 성능을 대신할 수는 없었습니다. 이는 이미지의 특성이 Transformer보다는 Convolution이 특징을 추출하기 유리했기 때문입니다. 하지만 Vision Transformer가 적용되어 CNN과 비견될 정도로 높은 성능을 달성했다는 연구결과가 나왔고, 이는 이미지 인식 분야에서도 Transformer가 충분히 유용하다는 것이 입증되었습니다.
그렇다면 이미지에 Transformer가 어떻게 적용되는지 알아보겠습니다. 그림 2는 Vision Transformer 구조[2]입니다.

>!["vision-transformer"]({{ site.assets }}/2021/2021-08-01-vision-transformer.png)
> *그림 2. Vision Transformer 구조*{: .caption }

Vision Transformer에서는 이미지를 고정된 크기(16x16)의 패치로 분할하고 이 패치들을 input으로 사용하게 됩니다. 일반적인 Transformer는 1D sequence 데이터를 입력으로 받습니다. 따라서 16x16으로 분할된 패치들은 1-Dimension으로 변환을 합니다. 2D 이미지를 처리하기 위해 이미지 x ∈ RH×W×C를 Flatten 2D 패치 xp ∈ RN×(P 2 ·C) sequence로 재구성합니다. 여기서 (H, W)는 원본 이미지의 해상도이고 C는 채널 수, (P, P)는 이미지 패치의 해상도이고 N = HW/P2는 결과 패치 수이며, 이는 Transformer의 입력 시퀀스 길이로도 사용됩니다. Transformer는 일정한 latent 벡터 크기를 사용하므로 패치를 평면화하고 학습 가능한 Linear Projection을 사용하여 D차원에 매핑합니다. 이 Projection의 출력을 패치 임베딩이라고 합니다. 그리고 Classification 작업에 사용될 Classification Token 벡터가 추가되어집니다. 각각의 패치에 대해서는 이미지에서 차지하는 위치 정보가 패치별로 포함되어 임베딩됩니다. 이렇게 임베딩된 Vector Sequence를 Transformer Encoder에 넣습니다.

>!["Vision-transformer-encoder"]({{ site.assets }}/2021/2021-08-03-transformer-encoder.png)
> *그림 3. Vision Transformer Encoder*{: .caption }

Vision Transformer에서 사용하는 Transformer Encoder는 기존 Transformer Encoder와는 차이점이 있습니다. Transformer 같은 경우 일반적으로 Layer를 깊게 쌓을수록 학습이 힘들기 때문에 Normalization 과정이 필요합니다. 일반 Transformer에서는 Multi-Head Attention을 수행한 후 Normalization을 하지만 Vision Transforemr에서는 Layer Normalization을 수행하고 Multi-Head Attention을 적용합니다. Self-Attention 수행시 768차원이던 데이터가 64차원으로 줄어들기 때문에 Self-Attention을 12번 수행하여 768차원으로 출력을 내보냅니다. Transformer Encoder에서 Multi-Head Attention을 거치고 나온 출력은 Classification을 위한 MLP 모델에 넣고 최종적으로 Class를 예측하게 됩니다.

Vision Transformer는 위 과정을 거쳐서 이미지 Classification을 수행하게 됩니다. CNN과 Transformer를 비교하자면 CNN의 경우 지역적인 정보를 중요하게 생각하고 Transformer는 지역적인 정보를 상대적으로 덜 중요하게 여기면서 모델의 자유도를 높이게 됩니다. Vision Transformer는 CNN과 달리 inductive bias가 적은 관계로 좋은 성능을 내기 위해서는 굉장히 많은 데이터가 필요하거나 Augmentation과 Regularization을 신경써야 합니다. 충분한 양의 데이터가 있다면 기존의 CNN 모델을 뛰어넘는 성능을 낼 수 있지만 적은 수의 데이터에서는 Transformer가 오히려 성능이 떨어질 수 있다는게 단점입니다. 따라서 학습 데이터가 충분할 때 사용하는 것이 좋습니다. 최근에는 Transformer를 보완하기 위한 연구가 활발히 진행되고 있고 적은 데이터 수로도 높은 성능을 내는 Data Efficient Transformer 기술도 연구가 되고 있습니다.


# Swin Transformer


최근 Vision Transformer의 단점을 개선하고 아주 높은 성능을 내는 Swin Transformer[3]를 마이크로소프트에서 발표했습니다. Vision Transformer의 단점으로 이미지를 작은 패치로 분할하여 sequence 형태로 만들고 attention 계산을 하다보니 연산량이 많고, 패치의 크기가 변하지 않아서 segmentation같은 세밀한 task에는 vision transformer가 적용되기 힘들었습니다. 이러한 단점을 개선시키고 Detection, Segmentation에도 Transformer를 적용한 것이 Swin Transformer입니다. 그림 4는 Swin Transformer 전체구조입니다. Swin transformer block은 일반적인 multi-head self attention과 shifted windowing multi-head self attention으로 이루어져 있습니다.

>!["swin-transformer-architecture"]({{ site.assets }}/2021/2021-08-10-swin-transforer-architecture.png)
> *그림 4. Swin Transformer Architecture*{: .caption }

그림 5는 Swin Transformer와 Vision Transformer의 이미지 패치를 비교한 것입니다. 좌측이 Swin Transformer이고 우측이 Vision Transformer입니다. 

>!["Image-Patch"]({{ site.assets }}/2021/2021-08-06-swin-transformer.png)
> *그림 5. Image Patch*{: .caption }

Swin Transformer는 패치 사이즈를 줄이고 이 패치를 Window 단위로 묶고 Window 여러 개가 모이면 이미지가 됩니다. Vision Transformer보다 더 세밀하게 보기 위해 패치 사이즈를 (4, 8, 16) 단계별로 줄이고 Window라는 단위를 사용합니다. 초기에는 window 내에 포함되어 있는 패치의 크기가 작기 때문에, 이미지 내에서 적은 영역을 처리하지만, stage가 진행될수록 패치들은 병합되어 더 큰 패치로 이루어진 window를 사용합니다. 이는 조금 더 큰 객체를 잘 검출할 수 있다는 것으로 볼 수 있습니다. self-attention은 이미지 전체에 대한 것을 구하는 게 아니라 window당 self-attention을 구하게 됩니다. 

>!["Shifted-window"]({{ site.assets }}/2021/2021-08-07-shifted-window.png)
> *그림 6. Shifted window*{: .caption }

window별로 self-attention을 구했을 경우 문제점은 서로 다른 window끼리는 정보 공유가 되지 않는다는 점입니다. Swin Transformer에서는 패치를 naive하게 분할하지않고 layer가 진행될수록 window의 위치가 shift 됩니다. shift는 window size / 2 만큼 shift를 하는데, 이미지 범위를 벗어나면 그림 7과 같이 cyclic shift를 적용합니다.

>!["Cyclic-shift"]({{ site.assets }}/2021/2021-08-13-cyclic-shift.png)
> *그림 7. Cyclic shift*{: .caption }

cyclic shift는 그림 7과 같이 기존 window 크기보다 작은 sub-window들을 이동시켜 window 크기에 맞도록 합친 뒤 self-attention을 계산하는 방법입니다. 그림 7에서 A, B, C의 영역을 우측 하단으로 이동시켜 sub-window들의 결합으로 window의 크기를 유지하도록 합니다. 하지만 여러 개의 sub-window로 구성된 window의 경우 원본 feature map 측면에서 실제로 인접한 sub-window가 아니기 때문에 해당 window 내에서 self-attention을 계산할 때 Masking 기법을 사용하여 개별적인 sub-window 내의 attention score를 계산합니다.


이번 포스팅에서는 Vision Transformer와 Swin Transformer에 대해 알아보았습니다. Swin Transformer는 Object Detection과 Segmentation에서 현재 SOTA(State Of The Art) 성능을 보이고 있습니다. Vision Transformer의 경우 Classification 성능이 좋았지만 Swin Transformer는 Classification보다는 Detection과 Segmentation에서 아주 성능이 좋다고 합니다.
다음 포스팅에는 Swin Transformer와 이미지 인식 성능 향상 방법에 대해 더 자세히 알아보도록 하겠습니다.


## Reference
[1]. [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[2]. [AN IMAGE IS WORTH 16X16 WORDS: TRANSFORMERS FOR IMAGE RECOGNITION AT SCALE](https://arxiv.org/abs/2010.11929)

[3]. [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030)

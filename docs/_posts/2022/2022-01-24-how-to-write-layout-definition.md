---
title: "한컴오피스에서의 다이어그램 - 2. 레이아웃 정의 작성법"
author:
  name: 마형주
  uri: https://github.com/hnc-hjma
tags:
  - 한컴오피스
  - 다이어그램
  - Hancom Office
  - Diagram
  - Layout Definition
  - OOXML
excerpt: OOXML 다이어그램 개체의 레이아웃 정의 작성법을 소개합니다.
---

## 머리말

문서 내 입력된 모든 다이어그램 개체는 자신만의 레이아웃 정의를 함께 포함하고 있습니다. 일반 도형처럼 프리셋 타입이 표준으로 정해진 것이 아니기 때문에 개체의 레이아웃 방식까지도 스스로 정의해야 하는 것입니다. 레이아웃 정의를 해석하는 기능을 가지고 있는 오피스 앱이라면 어떤 다이어그램 개체라도 읽을 수 있도록 말이죠.

- 개발자센터
    - 기술블로그
- 한컴오피스
    - 다이어그램
        - 데이터모델
        - 레이아웃정의
        - 컬러정의
        - 스타일정의

이전 포스팅인 <[한컴오피스에서의 다이어그램 - 1. 기능 개요]({{ '/2021/10/01/ooxml-diagram-outline.html' | relative_url }})>에서도 언급했지만, 위와 같은 데이터 모델이 아래와 같이 각기 다른 형태의 레이아웃으로 표현되기 위해 문서 모델에 포함되는 것이 바로 이 레이아웃 정의입니다.

![모서리가 둥근 블록 목록형 예제]({{site.assets}}/2021/2021-10-01-diagram-example1.png){: width="390px"}
*모서리가 둥근 블록 목록형*{: .caption }
![세로 설명 목록형 예제]({{site.assets}}/2021/2021-10-01-diagram-example2.png){: width="390px"}
*세로 설명 목록형*{: .caption }
![원형 순환형 예제]({{site.assets}}/2021/2021-10-01-diagram-example3.png){: width="390px"}
*원형 순환형*{: .caption }
![세로 조직도형 예제]({{site.assets}}/2021/2021-10-01-diagram-example4.png){: width="390px"}
*세로 조직도형*{: .caption }

이번 포스팅에서는 레이아웃 정의 작성법을 소개합니다. 문법을 하나하나 설명하는 것은 공개되어 있는 <[OOXML 문서](https://www.ecma-international.org/publications-and-standards/standards/ecma-376/)> 내 Diagrams 파트를 보는 것과 크게 다를 바 없기 때문에, 한컴오피스에 포함된 레이아웃 타입인 '모서리가 둥근 블록 목록형'을 작성하면서 설명을 덧붙이는 형태로 구성해 봤습니다.

본문에 앞서 <[레이아웃 정의 XML 문서]({{site.assets}}/2022/2022-01-24-rounded-block-list.xml)>를 링크하니, 다른 창에 열어놓고 함께 보시면 도움이 될 것입니다.

<br>

## 레이아웃 정의 작성

레이아웃 타입 '모서리가 둥근 블록 목록형'은 데이터 모델의 항목수에 따라 다음과 같은 형태로 배치됩니다.

![모서리가 둥근 블록 목록형 예제]({{site.assets}}/2022/2022-01-24-rounded-block-list-sample.png){: width="390px"}
*데이터 모델 항목수에 따른 모서리가 둥근 블록 목록형*{: .caption }

이 레이아웃 타입의 가장 큰 특징은
1. 텍스트를 넣을 수 있는 가로세로 1:1 비율의 도형―모서리가 둥근 사각형―이
1. 데이터 모델의 항목 순서대로 왼쪽에서 오른쯕으로 일정 간격을 두고 적절히 배치되고,
1. 줄바꿈이 가능한 영역이 확보되면 줄을 바꾼 후 다시 왼쪽에서 오른쪽으로 배치하는 것

이라고 볼 수 있습니다. 이러한 특징들을 기억하면서 '모서리가 둥근 블록 목록형'의 레이아웃 정의를 작성해보도록 하겠습니다.

먼저 XML 문서를 선언하고 root 요소인 `<layoutDef>`에 레이아웃 타입 고유의 `uniqueId` 및 기타 속성을 부여합니다. 이후에는 하위 요소로 레이아웃의 제목과 설명, 분류 등을 작성합니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layoutDef xmlns="https://schemas.openxmlformats.org/drawingml/2006/diagram"
           uniqueId="urn:hancom.com/office/diagram/2020/3/layout/list_1">
  <title val="Rounded Block List"/>
  <desc val="Works well for showing non-sequential or grouped list."/>
  <catLst>
    <cat type="list" pri="101000"/>
  </catLst>
  ...
</layoutDef>
```

그리고 나서 레이아웃의 샘플 데이터를 지정합니다. 샘플 데이터는 레이아웃을 사용하는 다이어그램 개체가 처음 입력될 때 사용할 데이터 모델입니다. 동일한 형태로 스타일 데이터와 컬러 데이터도 정의하게 되는데, 이들은 다이어그램 개체에 스타일과 컬러를 지정할 때 UI에 사용하는 데이터 모델입니다. 아래 그림에서 사용 예를 확인하실 수 있습니다.

![샘플 데이터 예시]({{site.assets}}/2022/2022-01-24-sample-data-example-1.png){: width="390px"}
*샘플 데이터 항목 수가 5개인 경우 다이어그램 기본 상태*{: .caption }
![스타일 데이터 예시]({{site.assets}}/2022/2022-01-24-sample-data-example-2.png)
*스타일 데이터 항목 수가 2개인 경우 스타일 변경 UI*{: .caption }
![컬러 데이터 예시]({{site.assets}}/2022/2022-01-24-sample-data-example-3.png){: width="390px"}
*컬러 데이터 항목 수가 6개인 경우 색 변경 UI*{: .caption }

`<sampData>`와 `<styleData>`, `<clrData>`를 정의하는 형식은 모두 동일하며, 자세한 내용은 하위 요소인 `<dataModel>`에서 정의합니다. 개체 입력 시 기본 데이터 모델 항목을 5개로 설정하려면 샘플 데이터를 다음과 같이 정의하면 됩니다. 스타일 데이터와 컬러 데이터 예제는 생략했지만 정의하는 방법은 동일합니다.

```xml
  <sampData>
    <dataModel>
      <ptLst>
        <pt modelId="0" type="doc"/>
        <pt modelId="1">
          <prSet phldr="1"/>
        </pt>
        <pt modelId="2">
          <prSet phldr="1"/>
        </pt>
        <pt modelId="3">
          <prSet phldr="1"/>
        </pt>
        <pt modelId="4">
          <prSet phldr="1"/>
        </pt>
        <pt modelId="5">
          <prSet phldr="1"/>
        </pt>
      </ptLst>
      <cxnLst>
        <cxn modelId="6" srcId="0" destId="1" srcOrd="0" destOrd="0"/>
        <cxn modelId="7" srcId="0" destId="2" srcOrd="1" destOrd="0"/>
        <cxn modelId="8" srcId="0" destId="3" srcOrd="2" destOrd="0"/>
        <cxn modelId="9" srcId="0" destId="4" srcOrd="3" destOrd="0"/>
        <cxn modelId="10" srcId="0" destId="5" srcOrd="4" destOrd="0"/>
      </cxnLst>
      <bg/>
      <whole/>
    </dataModel>
  </sampData>
  <styleData>
    <dataModel>
      ...
    </dataModel>
  </styleData>
  <clrData>
    <dataModel>
      ...
    </dataModel>
  </clrData>
```

여기까지 일종의 메타데이터 정의가 완료되면, 본격적으로 레이아웃을 결정하는 레이아웃 노드를 정의하게 됩니다. 레이아웃 노드의 root 요소로는 다이어그램 `doc`에 대한 `<layoutNode>`가 위치하게 되며, 그 자식부터 자손까지 `<layoutNode>`들이 반복적으로 배치되면서 레이아웃이 정의됩니다.

어떤 `<layoutNode>`의 하위 레이아웃 노드가
1. 유동적인 동적 레이아웃인 경우 `<forEach>`의 하위에 `<layoutNode>`를 위치시켜 데이터 모델의 증감에 따라 반복적으로 레이아웃 노드를 매핑하기도 하고,
2. 고정적인 정적 레이아웃인 경우 자식으로 `<layoutNode>`를 직접 위치시키기도 합니다.
3. 특정 조건에 따라 다른 정의가 필요한 경우에는 `<choose>-<if>-<else>`로 분기하여 `<layoutNode>`를 정의할 수도 있습니다.

바로 이 `<layoutNode>` 요소가 도형의 배치 형태를 결정하고 데이터 모델과 도형 간의 매핑 방식을 정의하는 다이어그램의 기본 빌딩 블록입니다.

![동적 레이아웃 예시]({{site.assets}}/2022/2022-01-24-layout-node-example-1.png){: width="390px"}
*1. 동적 레이아웃 예시*{: .caption }
![정적 레이아웃 예시]({{site.assets}}/2022/2022-01-24-layout-node-example-2.png){: width="390px"}
*2. 정적 레이아웃 예시*{: .caption }
![분기 레이아웃 예시]({{site.assets}}/2022/2022-01-24-layout-node-example-3.png){: width="390px"}
*3. 분기 레이아웃 예시 (사용자 변수에 따라 같은 데이터 모델을 분기된 다른 형태로 표시한 경우)*{: .caption }

위 내용을 토대로 레이아웃 '모서리가 둥근 블록 목록형'을 정의해보겠습니다. 이 레이아웃은 데이터 모델의 항목 수에 따라 도형이 늘어나는 동적 레이아웃으로, 생성된 도형들은 알고리즘에 의해 왼쪽에서 오른쪽으로 배치되고 줄바꿈 이후 다시 왼쪽에서 오른쪽으로 배치되는 것을 반복하게 됩니다.

![스네이크 알고리즘 도식화]({{site.assets}}/2022/2022-01-24-snake-algorithm-form.png)
*마치 고전 게임 '스네이크'를 연상케 하는 배치 방식인 스네이크 알고리즘*{: .caption }

이러한 배치를 결정하는 것이 `<alg>` 요소이며, 이 레이아웃과 같은 배치 형태는 `type` 속성에 `snake` 값을 입력하면 됩니다. 그리고 하위 요소로 다음과 같이 몇 가지 파라미터만 더하면, 이 레이아웃의 특성대로 스네이크 알고리즘이 동작합니다.

```xml
<alg type="snake">
  <param type="grDir" val="tL"/>        <!--좌측 상단에서 도형이 시작됨-->
  <param type="flowDir" val="row"/>     <!--도형이 가로 방향으로 증가함-->
  <param type="contDir" val="sameDir"/> <!--줄바꿈 이후의 증가 방향이 전과 동일함-->
  <param type="off" val="ctr"/>         <!--가운데로 정렬됨-->
</alg>
```

`<choose>-<if>-<else>`를 사용하여 설정값에 따라 도형의 증가 방향이 바뀌도록 분기하여 정의할 수도 있습니다. 아래 정의에 의해 데이터 모델 `var`의 `dir` 설정에 따라 도형의 증가 방향이 달라지게 하여 좌우가 반전되는 사용성을 제공하는 것이 가능합니다.

```xml
<choose>
  <if func="var" arg="dir" op="equ" val="norm"> <!--norm: 기본 방향일 때-->
    <alg type="snake">
      <param type="grDir" val="tL"/>            <!--좌측 상단에서 도형이 시작됨-->
      ...
    </alg>
  </if>
  <else>                                        <!--rev: 반전 방향일 때-->
    <alg type="snake">
      <param type="grDir" val="tR"/>            <!--우측 상단에서 도형이 시작됨-->
      ...
    </alg>
  </else>
</choose>
```

알고리즘으로 도형들의 배치를 결정했다면, 제약조건과 규칙은 도형 자체의 특징들을 결정하게 됩니다. 이는 `<constr>`와 `<rule>` 요소로 정의되며, 각각은 `<constrLst>`와 `<ruleLst>` 요소 하위에 위치합니다. 위에서 정의한 스네이크 알고리즘에 의해 배치되는 도형들의 제약조건은 다음과 같습니다.

```xml
<constrLst>
  <constr type="w" for="ch" forName="node" refType="w"/>                                              <!--1-->
  <constr type="h" for="ch" forName="node" refType="w" refFor="ch" refForName="node"/>                <!--2-->
  <constr type="w" for="ch" forName="sibTrans" refType="w" refFor="ch" refForName="node" fact="0.1"/> <!--3-->
  <constr type="sp" refType="w" refFor="ch" refForName="sibTrans"/>                                   <!--4-->
  <constr type="primFontSz" for="ch" forName="node" op="equ" val="65"/>                               <!--5-->
</constrLst>
```

속성 `type`, `for`, `forName`은 적용 대상을 가리키고, `refType`, `refFor`, `refForName`은 참조하는 원본을 가리킵니다. 참조하는 원본이 존재하는 경우 `fact` 속성으로 상댓값을 정의하고, 그렇지 않은 경우 `op`와 `val`로 고정값을 설정하게 됩니다. 위 내용을 풀어 설명하면 다음과 같습니다.
1. `refFor`와 `refForName`이 생략되어 제약조건이 정의된 레이아웃 노드를 참조하게 되므로, `diagram` 노드의 너비로 `node`라는 이름을 가진 자식 노드의 너비를 제한합니다.
1. `node`라는 이름을 가진 자식 노드의 너비로 `node`라는 이름을 가진 자식 노드의 높이를 제한합니다.
1. `node`라는 이름을 가진 자식 노드 너비의 1/10 크기로 `sibTrans`라는 이름을 가진 자식 노드의 너비를 제한합니다.
1. `sibTrans`라는 이름을 가진 자식 노드의 너비로 `diagram` 노드의 여백을 제한합니다.
1. `node`라는 이름을 가진 자식 노드의 폰트 크기를 65pt와 같게 제한합니다.

1번에 의해 도형의 너비가 다이어그램 너비와 동일해지고 2번에 의해 도형의 높이가 너비와 동일하게 정해지면서, 너비와 높이 모두 다이어그램 너비와 같은 가로세로 1:1 비율의 커다란 도형이 정의되었습니다. 3번과 4번에 의해 형제 도형 간 전환부와 줄바꿈 여백이 도형 크기에 비례하여 정의되었고, 5번에 의해 도형의 폰트 크기가 정의되었습니다. 이렇게 정의된 커다란 도형들이 스네이크 알고리즘에 의해 다이어그램 영역을 넘지 않게 정렬되는 것입니다.

![제약조건과 알고리즘의 적용 과정]({{site.assets}}/2022/2022-01-24-constraint-algorithm-step.png)
*제약조건과 알고리즘의 적용 과정*{: .caption }

도형들은 상댓값으로 크기를 제한하고 알고리즘에 의해 크기를 줄였지만, 폰트 크기는 고정값인 65pt와 같게 제한하고 있어서 문제가 발생합니다. 도형은 작아졌는데 폰트 크기는 계속해서 65pt라면, 글자가 너무 커서 아래 그림과 같이 내용이 많아졌을 때 읽을 수가 없기 때문입니다.

![폰트 최솟값 규칙 미적용 예시]({{site.assets}}/2022/2022-01-24-constraint-algorithm-but-no-rule.png)
*폰트 최솟값 규칙 미적용 예시*{: .caption }

이를 해결하기 위해서는 아래와 같이 폰트 크기에 최솟값 규칙을 적용해야 합니다.

```xml
<ruleLst>
  <rule type="primFontSz" val="5" fact="NaN" max="NaN"/>
</ruleLst>
```

이 규칙은 `tx` 알고리즘 즉, 텍스트 입력용 `<layoutNode>` 하위에 정의하며, 폰트 크기가 5pt가 될 때까지 도형 크기에 맞춰 적당하게 폰트 크기를 조절하는 규칙입니다.

이제 위 제약조건과 규칙이 적용되는 `<layoutNode>`만 정의하면 됩니다. `node`라는 이름을 가진 반복되는 레이아웃 노드를 정의하기 위해 앞서 설명했던 `<forEach>`를 사용합니다.

```xml
<forEach name="forEach1" axis="ch" ptType="node">
  <layoutNode name="node">
    <varLst>
      <bulletEnabled val="1"/>
    </varLst>
    <alg type="tx"/>
    <shape type="roundRect"/>
    <presOf axis="desOrSelf" ptType="node"/>
    <constrLst>
      <constr type="lMarg" refType="primFontSz" fact="0.3"/>
      <constr type="rMarg" refType="primFontSz" fact="0.3"/>
      <constr type="tMarg" refType="primFontSz" fact="0.3"/>
      <constr type="bMarg" refType="primFontSz" fact="0.3"/>
    </constrLst>
    <ruleLst>
      <rule type="primFontSz" val="5" fact="NaN" max="NaN"/>
    </ruleLst>
  </layoutNode>
  ...
</forEach>
```

`<forEach>`와 `<presOf>`는 레이아웃 노드를 데이터 모델에 매핑하는 방법 정의합니다. 위에서 정의한 `<forEach>` 요소를 통해 자식 축 데이터 모델 중 `node` 타입 항목들과 하위의 레이아웃 노드 정의가 매핑됩니다. 또한 `<presOf>`의 축을 `desOrSelf`로 설정하여 자식 항목 자신과 그의 자손 항목들까지 이 레이아웃 노드에 매핑되도록 했습니다.

- 한컴오피스
    - 한글 2022
        - 개방형 문서 포맷
        - 고대비 모드
        - 메모 #태그

위와 같은 데이터 모델에 적용했을 때,
1. 축을 `self`로 설정한다면 왼쪽 그림처럼 `<forEach>`에서 설정한 `ch` 자신까지만 레이아웃 노드에 적용될 것이고,
1. 축을 `desOfSelf`로 설정한다면 오른쪽 그림처럼 자식부터 자손까지 같은 레이아웃 노드를 사용하여 표현될 것입니다.

![축에 따른 레이아웃 노드와 데이터 모델 간 매핑]({{site.assets}}/2022/2022-01-24-self-diff-des-or-self.png){: width="640px"}
*축에 따른 레이아웃 노드와 데이터 모델 간 매핑*{: .caption }

도형의 종류는 `roundRect`로 설정하여 모서리가 둥근 사각형으로 정의했습니다. 그리고 앞서 설명한 폰트 크기 최솟값 규칙도 `tx` 알고리즘을 사용하고 이름이 `node`인 이 레이아웃 노드 하위에 위치합니다.

마지막으로 형제 전환만 정의하면 됩니다. `<forEach>`를 통해 형제 전환 데이터 모델과 하위 레이아웃 노드를 매핑하기 위해, 현재 항목 이후 형제 항목 중 `sibTrans` 타입의 항목 하나로만 조건을 주었습니다.

```xml
<forEach name="forEach1" axis="ch" ptType="node">
  <layoutNode name="node">
    ...
  </layoutNode>
  <forEach name="forEach2" axis="followSib" ptType="sibTrans" cnt="1">
    <layoutNode name="sibTrans">
      <alg type="sp"/>
      <shape type="none"/>
      <presOf/>
      <constrLst/>
      <ruleLst/>
    </layoutNode>
  </forEach>
```

이 레이아웃의 경우 형제 전환이 단순 여백이므로 `sp` 알고리즘을 사용하고 도형 종류를 `none`으로 정의했습니다. 이렇게 해서 `sibTrans`라는 이름을 가진 형제 전환 항목용 레이아웃 노드까지 모두 정의가 되어 유효한 레이아웃이 정의되었습니다.

## 맺음말

이 포스팅은 작성하기에 정말 어려웠고 글을 마무리 짓는 지금도 만족스럽지가 않습니다. 자세히 설명하려면 글이 자꾸만 길어지고, 내용을 줄이려면 설명이 점점 불친절해졌기 때문입니다. 최대한 타협해서 이 정도로 글을 마무리 짓고 있지만, 쓰는 이의 입장에서도 이 포스팅만으로는 레이아웃 작성법이 쉽게 이해되지는 않을 거라 생각하고 있습니다. 댓글로 자유롭게 질문 남겨주시면 최대한 이해를 돕도록 노력하겠습니다.

그럼에도 불구하고 여기에서 설명한 내용은 레이아웃 정의 작성법의 극히 일부입니다. 하지만 기본적인 개념과 흐름을 익히는 데는 충분히 도움이 될 만한 내용입니다. 이 포스팅의 내용과 머리말에서도 링크한 '모서리가 둥근 블록 목록형'의 <[레이아웃 정의 XML 문서]({{site.assets}}/2022/2022-01-24-rounded-block-list.xml)>와 <[OOXML 문서](https://www.ecma-international.org/publications-and-standards/standards/ecma-376/)> 내 Diagrams 파트를 함께 참고한다면 다양한 응용이 가능할 것입니다.

다음 포스팅에서는 한컴오피스의 다이어그램엔진을 이용한 다이어그램 레이아웃 뷰어를 공개할 예정입니다. 한컴오피스 2022에 포함된 다이어그램 타입들의 레이아웃 정의 XML을 바탕으로 자신만의 레이아웃 타입을 정의하고 확인해볼 수 있는 프로그램입니다. 자신만의 다이어그램을 만들어서 혼자서 사용하고 싶은 분들에게도, 공유해서 함께 사용하고 싶은 분들에게도 조금이나마 도움이 되길 바라는 마음으로 준비하겠습니다. 많은 관심과 피드백, 레이아웃 공유를 미리 부탁드립니다. 그럼 그 때 다시 뵙겠습니다. 안녕히 계세요!

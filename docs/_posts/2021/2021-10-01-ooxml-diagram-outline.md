---
title: "한컴오피스에서의 다이어그램 - 1. 기능 개요"
author:
  name: 마형주
  uri: https://github.com/hnc-hjma
tags:
  - 한컴오피스
  - 다이어그램
  - Hancom Office
  - Diagram
  - OOXML
excerpt: 한컴오피스 내 다이어그램 개체의 문서 모델과 기본 동작 방식을 소개합니다.
---

## 머리말

한컴오피스는 OOXML(Office Open XML)에 정의된 기능들을 다수 제공하고 있습니다. 한컴오피스에서의 다이어그램은 OOXML의 DrawingML - Components Reference Material에 정의된 Diagrams를 위한 기능입니다. 다이어그램 기능을 사용하면 간단한 데이터 모델을 입력하고 레이아웃을 선택하는 것만으로도 아래 예제와 같은 형태의 다이어그램을 손쉽게 표현할 수 있습니다.

#### 데이터 모델 예제
- 개발자센터
    - 기술블로그
- 한컴오피스
    - 다이어그램
        - 데이터모델
        - 레이아웃정의
        - 컬러정의
        - 스타일정의

#### 레이아웃 선택 예제
![모서리가 둥근 블록 목록형 예제]({{site.assets}}/2021/2021-10-01-diagram-example1.png){: width="390px"}
*모서리가 둥근 블록 목록형*{: .caption }
![세로 설명 목록형 예제]({{site.assets}}/2021/2021-10-01-diagram-example2.png){: width="390px"}
*세로 설명 목록형*{: .caption }
![원형 순환형 예제]({{site.assets}}/2021/2021-10-01-diagram-example3.png){: width="390px"}
*원형 순환형*{: .caption }
![세로 조직도형 예제]({{site.assets}}/2021/2021-10-01-diagram-example4.png){: width="390px"}
*세로 조직도형*{: .caption }

이 포스팅에서는 한컴오피스에서의 다이어그램이 어떠한 형태의 모델로 문서에 포함되는지 알아보고, 해당 요소들이 어떻게 해석되어 다이어그램 개체를 구성하고 동작하게 되는지 소개합니다.

<br>

## OOXML의 다이어그램 문서 모델

OOXML을 추진한 마이크로소프트사의 office.com에 의하면 다이어그램은 다음과 같은 키워드로 요약할 수 있습니다.

1. 정보의 시각적 표현
1. 쉽고 빠른 생성
1. 다양한 형태의 레이아웃
1. 효과적인 아이디어 전달

이러한 기능을 수행하기 위해 다이어그램은 다음과 같은 형태로 문서 모델이 구성됩니다.
```xml
<!--document.xml-->
...
<a:graphic>
  <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/diagram">
    <dgm:relIds r:dm="rId5" r:lo="rId4" r:qs="rId3" r:cs="rId2"/>
  </a:graphicData>
</a:graphic>
...
```
```xml
<!--document.xml.rels-->
...
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId2" Target="../diagrams/colors1.xml" Type="http://.../diagramColors"/>
  <Relationship Id="rId3" Target="../diagrams/quickStyle1.xml" Type="http://.../diagramQuickStyle"/>
  <Relationship Id="rId4" Target="../diagrams/layout1.xml" Type="http://.../diagramLayout"/>
  <Relationship Id="rId5" Target="../diagrams/data1.xml" Type="http://.../diagramData"/>
</Relationships>
...
```
참조 형식으로 문서에 포함되는 이유는 각각의 다이어그램 개체 스스로가 레이아웃과 컬러, 스타일의 정의부터 사용자가 작성한 데이터 모델까지 모두를 포함해야 하기 때문입니다.

<br>

## 다이어그램 개체의 동작 방식

다이어그램 개체의 데이터 모델은 `r:dm` 속성의 `Relationship`이 가리키는 파일에 저장되어 있습니다. 파일을 열어보면 다음과 같은 형태를 띄고 있습니다.
```xml
<!--data1.xml-->
<dgm:dataModel ...>
  <dgm:ptLst>
    <dgm:pt modelId="{GUID-DOC}" type="doc">...</pt>
    <dgm:pt modelId="{GUID-NODE1}">...</pt> <!--type="node"-->
    <dgm:pt modelId="{GUID-PART1}" type="parTrans" cxnId="{GUID-CXN1}">...</pt>
    <dgm:pt modelId="{GUID-SIBT1}" type="sibTrans" cxnId="{GUID-CXN1}">...</pt>
    ...
    <dgm:pt modelId="{GUID-PRES1}" type="pres">...</pt>
    <dgm:pt modelId="{GUID-PRES2}" type="pres">...</pt>
    ...
  </dgm:ptLst>
  <dgm:cxnLst>
    <dgm:cxn modelId="{GUID-CXN1}" srcId="{GUID-DOC}" destId="{GUID-NODE1}" ...
             parTransId="{GUID-PART1}" sibTransId="{GUID-SIBT1}"/> <!--type="parOf"-->
    <dgm:cxn modelId="{GUID-CXN2}" type="presParOf" srdId="{GUID-PRES1}" destId="{GUID-PRES2}" .../>
    <dgm:cxn modelId="{GUID-CXN3}" type="presOf" srcId="{GUID-DOC}" destId="{GUID-PRES1}" .../>
    <dgm:cxn modelId="{GUID-CXN4}" type="presOf" srcId="{GUID-NODE1}" destId="{GUID-PRES2}" .../>
    ...
  </dgm:cxnLst>
  <dgm:bg>...</dgm:bg> <!--채우기 등 배경 서식-->
  <dgm:whole>...</dgm:whole> <!--외곽선 등 배경 서식-->
  <dgm:extLst>...</dgm:extLst> <!--dataModel 확장 drawing 정보 참조 relId-->
</dgm:dataModel>
```
최대한 간추리고 요약했는데도 여전히 조금은 복잡한 느낌입니다만, 다이어그램의 데이터 모델을 이해하기 쉬운 단어들을 사용하여 한 문장으로 설명한다면 모델과 뷰모델의 연결에 의한 트리구조라고 할 수 있습니다. XML 요소 자체가 트리구조로 되어있지는 않지만 `dgm:cxn`이 각 `dgm:pt`들을 연결해서 트리구조가 완성됩니다. `dgm:pt type="pres"`인 뷰모델은 제외하고 모델만 가져와서 문서의 개요 형태로 표현한다면 다음 예제와 같이 익숙한 모양이 나옵니다.

- 개발자센터
    - 기술블로그
- 한컴오피스
    - 다이어그램
        - 데이터모델
        - 레이아웃정의
        - 컬러정의
        - 스타일정의

이런 단순한 텍스트 모델이 시각화된 다이어그램으로 표현되려면, 도형이 배치되는 레이아웃에 대한 정의부터 배치되는 도형들의 컬러와 스타일에 대한 정의가 필요합니다. 해당 정의들 역시 `Relationship`으로 연결된 파일들에 저장되어 있습니다. 따라서 다른 앱에서 만들었거나 사용자가 직접 정의해서 만든 다이어그램 개체일지라도, 레이아웃/컬러/스타일 정의가 문서에 포함되어 있기 때문에 해당 정의들을 해석하여 시각화된 다이어그램으로 표현할 수 있습니다.

| 레이아웃 정의                                         | 컬러 정의                                             | 스타일 정의                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `r:lo` 속성의 `Relationship`이 가리키는 파일에 저장   | `r:cs` 속성의 `Relationship`이 가리키는 파일에 저장   | `r:qs` 속성의 `Relationship`이 가리키는 파일에 저장   |
| `<dgm:layoutDef>...</dgm:layoutDef>` 내부에 정의      | `<dgm:colorsDef>...</dgm:colorsDef>` 내부에 정의      | `<dgm:styleDef>...</dgm:styleDef>` 내부에 정의        |

조금 설명을 덧붙이자면 컬러 정의와 스타일 정의는 각 `styleLbl`에 해당하는 컬러와 스타일을 정의하면 동작하는 방식이고, 레이아웃 정의는 트리 형태의 `layoutNode`들이 데이터 모델의 상태에 따라 레이아웃을 결정하게 되는 일종의 인터프리터 언어와 같은 방식입니다.

이렇게 세 정의들과 데이터 모델까지 총 네 가지 요소들에 의해 화면에 표시될 다이어그램의 모양이 결정되는 방식이다 보니, 아무래도 복잡한 면이 있습니다. 더 복잡해지기 전에, 이번 포스팅은 다이어그램 기능에 대한 개요 정도로 이 쯤에서 마무리 짓고 다음 내용을 구상해 봐야겠습니다.

<br>

## 맺음말

사실 이 포스팅의 시작은 한컴오피스의 다이어그램 레이아웃 타입들에 대한 레이아웃 정의 XML 소스를 공개하는 데 있었습니다. 하지만 누구도 관심을 가지지 않을 내용이라면 의미가 없기에 기본적인 정보를 먼저 제공하기로 했습니다.

쉽게 풀어서 소개하고 있긴 하지만 다이어그램은 생각보다 상당히 복잡합니다. 그러다 보니 한컴오피스의 다이어그램엔진도 아직 완전하지는 못합니다. 그럼에도 불구하고 한컴오피스 다이어그램엔진을 사용한 다이어그램 레이아웃 뷰어를 개발해서 레이아웃 정의 XML 소스들과 함께 공개할 계획을 가지고 있습니다. 자신만의 다이어그램을 직접 만들어서 사용하고 싶은 사용자들에게 도움이 될 수 있겠다는 생각 때문입니다. 내심, 제작된 레이아웃의 공유부터 프로그램의 기능 개선 요구나 버그 리포팅도 조금은 기대하고 있습니다. :)

다음 포스팅에서는 레이아웃 정의의 기본 문법을 소개하고, 간단한 예시를 통한 레이아웃 작성법을 공유할 예정입니다. 그럼 그 때 다시 뵙겠습니다. 안녕히 계세요!

---
title: "한컴오피스에서 clipboard 에 저장되는 데이터 포맷"
author: 
  name: 정민옥
  uri: https://github.com/hnc-mojung
tag:
- 한컴오피스
- 클립보드
- Hancom Office
- Clipboard

excerpt: 오피스에서 제공되는 특별한 Clipboard Format 들에 대해 알아본다.
---

## "한컴오피스 Clipboard 포맷"

- - -
<br>

### 개요

클립보드는 특정 프로그램에서 데이터를 다른 프로그램으로 전달이 가능하도록 임시로 데이터를 저장할 수 있는 일종의 저장소다.

보통 [복사하기] 나 [Copy] 액션을 이용하면 각 App 에서 제공하는 데이터가 클립보드에 보관되며, 클립보드에 보관된 데이터를 다른 프로그램에서 [붙여넣기] 나 [Paste] 액션을 실행하면 클립보드에 있는 데이터를 넘겨 받아 사용이 가능하다.

클립보드에는 문자, 그림 등의 기본적인 포맷 뿐 아니라 OLE 를 이용한 다양한 형태의 데이터를 클립보드로 저장하고 저장된 데이터를 클립보드에서 얻을 수 있다.

원래는 Windows 에서만 제공하던 클립보드 기술이 이제는 다른 OS 에서도 활용되고 있으며, 현재는 Cloud 서비스와 연동하여 별도의 다른 기기나 플랫폼에 구애 받지 않는 클립보드 기술도 활용되고 있다. (ex. 한컴오피스의 클라우드 클립보드)

본 포스팅에서는 한컴오피스에서 제공하는 많은 클립보드 포맷 중 한컴오피스에서 제공되는 특별한 포맷들을 소개하고 이를 다른 App 에서 활용 가능하도록 정보를 제공하고자 한다.

<br>

### 한컴오피스가 제공하는 클립보드 포맷들

한컴오피스에는 많은 클립보드 포맷들을 제공한다. 대체적으로 가장 많이 사용되는 HTML, 이미지 (메타파일 포함), Text 뿐 아니라 매우 다양한 포맷들이 제공되고 있다. 아래의 그림은 한컴오피스 한셀에서 Micorosoft Excel 에 [골라 붙이기] 를 할 경우 지원가능한 데이터들이다.

> ![한컴오피스 Clipboad 포맷]({{site.assets}}/2021/2021-08-17-hancell-to-excel.png) <br>
> 그림 1. 한셀에서 복사된 데이터를 Micorosoft Excel 에서 붙여넣기 할 경우 가능한 포맷들

<br>

아래 그림은 한셀에서 복사하기 시도시 클립보드의 상태를 보여준다. (Clipspy 를 사용하면 확인 가능하다.)

> ![한컴오피스 Clipboad 포맷]({{site.assets}}/2021/2021-08-17-hancell-to-clipspy.png) <br>
> 그림 2. 한셀에서 복사를 시도하였을 경우 Clipboard 의 상태

<br>

위 그림에서 확인해보면 한컴오피스에서 복사한 데이터가 어떠한 포맷으로 제공되는지 확인이 가능하다. 이중 보통 다른 App 에서는 제공되지 않는 포맷이 존재한다. [한컴오피스 한셀 문서 개체], [Microsoft Office 그리기 개체] 가 그것이다. 해당 데이터는 무엇을 의미하며, 저장되는 포맷의 형식은 어떻게 되는지 알아보도록 하자.

<br>

### OLE 개체 [한컴오피스 문서 개체]

한컴오피스 (or MS Office) 에서 데이터를 복사하면, 아래의 표와 같은 형식의 데이터가 클립보드에 저장된다. 이 데이터들은 OLE 를 표현하며, 이 데이터를 이용하면 OLE 형태의 데이터를 붙여 넣을 수 있다. 

| Format Name            | Data Type                                                    | Description                                             |
| ---------------------- | :----------------------------------------------------------- | ------------------------------------------------------- |
| Link                   | ANSI text list                                               | OLE 1.0 link                                            |
| Native                 | Binary                                                       | OLE 1.0 data                                            |
| ObjectLink             | ANSI text list                                               | OLE 1.0 link                                            |
| OwnerLink              | ANSI text list                                               | OLE 1.0 link                                            |
| Data Object            | Binary                                                       | OLE 2.0 data                                            |
| Embedded Object        | Binary                                                       | OLE 2.0 data                                            |
| Object Descriptor      | [OBJECTDESCRIPTOR](https://msdn.microsoft.com/en-us/library/ms683735.aspx) | OLE 2.0 User interface information                      |
| Link Source Descriptor | [OBJECTDESCRIPTOR](https://msdn.microsoft.com/en-us/library/ms683735.aspx) | OLE 2.0 User interface information                      |
| Link Source            | [IMoniker](https://msdn.microsoft.com/en-us/library/ms679705.aspx) | OLE 2.0. Followed by document class ID                  |
| Hyperlink              | [IHlink](https://msdn.microsoft.com/en-us/library/aa767974.aspx) | Methods to enable a hyperlink to navigate to its target |

> ![한컴오피스 Clipboad 포맷]({{site.assets}}/2021/2021-08-17-hancell-ole-paste.png) <br>
> 그림 3. 한셀 내용을 복사하여 워드패드에 OLE 로 붙여 넣은 모습 (편집 가능한 모습)

<br>

위 데이터를 포맷 및 생성 방법 (IPersistStorage) 에 대해서는 현 포스트에서는 중요하지 않으므로 생략한다 (추후, 필요하다면 포스팅하도록 하겠다). 이 데이터를 활용하여 App 에 OLE 로 데이터를 넣고 싶다면 아래와 같은 코드를 이용하면 OLE 로 붙여넣기가 가능하다. 물론, App 에서는 OLE Embedding 이 가능해야 한다.

```c++
SCODE sc = ::OleQueryCreateFromData(pSrc); // pSrc => IDataObject (클립보드 데이터)
 
if (sc == S_OK || sc == OLE_S_STATIC)
    return TRUE;
 
if (::OleQueryLinkFromData(pSrc) == S_OK)
    return TRUE;
```

<br>

OLE 붙여넣기가 좀 더 유연하게 처리되려면, 필요에 따라 클립보드에 EMF, WMF 포맷도 제공되어야 한다 (한컴오피스에서는 제공하고 있다). 한컴오피스는 In-Place Active 형태의 OLE 도 제공하고 있으므로 App 에서 In-Place Active OLE 처리가 가능하다면, OLE 편집시 같은 Frame 안에서 OLE 편집이 가능하다.

<br>

### GVML [Micorosoft 그리기 개체]

GVML 은 MS Office 에서 각 제품간의 데이터 이동시 손실 없이 편집가능한 형태로 복사/붙여넣기에 사용되는 클립보드 포맷이다. 주로,  오피스 그래픽 개체를 복사/붙여넣기 하는데 사용되며 해당 포맷을 이용하여 도형, 차트, 표, 수식, 텍스트 등을 편집 가능한 형태로 복사할 수 있다.

<br>

해당 포맷이 무엇인지 확인 하기 위해 한셀에서 도형을 하나 복사한 후, C# 으로 다음과 같이 저장해보자.

```c#
Dim gvmlFile As FileStream = File.Create("c:\GVMLData.zip")
Dim data As Object = Clipboard.GetData("Art::GVML Clipformat")
Dim stream As MemoryStream = CType(data, MemoryStream)
Dim byteData() As Byte = stream.ToArray()

gvmlFile.Write(byteData, 0, byteData.Length)

gvmlFile.Close()
```

<br>

해당 파일을 열어보면 파일이 아래와 같이 구성되어 있으며, 그중 drawing1.xml 을 확인해보면 DrawingML 형태로 개체가 저장되어 있음을 확인할 수 있다.

> ![한컴오피스 Clipboad 포맷]({{site.assets}}/2021/2021-08-17-gvml-data.png)<br>
> 그림 4. GVML 의 데이터 형태

<br>

이 데이터를 활용하려면 OpenXML 에 대한 전반적인 지식이 필요하다. 해당 스펙은 아래의 링크를 참고하자.

> [TC45 - Ecma International (ecma-international.org)](https://www.ecma-international.org/technical-committees/tc45/)

<br>

위 링크에서 Published Standards 텝에 있는 5개의 PDF 문서를 완벽히 파악하셨다면 오피스 구조 전체를 파악했다고 생각하셔도 된다. 위 문서를 완벽히 숙지하셨다면 지금 당장 한글과컴퓨터 개발자로 지원 부탁드린다!!

OOXML 데이터를 분석하여 활용할 수 있다면 좋겠지만 OOXML 스펙을 숙지하기란 상당한 노력이 필요하다. 그렇다고 실망하지 말자!  MSForms library 를 활용한다면 위 스펙을 모르더라도 사용이 가능하다.

아래의 코드는 MSForms library 를 이용하여 클립보드의 데이터를 로드하는 방법이다.

```c#
Dim datobj as MSForms.DataObject
Set datobj = new MSForms.DataObject
datobj.GetFromClipboard
    
// load 된 데이터를 활용 (ex. Selection.InsertXML datobj.GetText)
    
set datobj = Nothing
```

<br>

위와 같이 GVML 데이터를 활용하면, 오피스 개체를 복사하여 손실 없이 편집가능한 형태로 붙여 넣을 수 있다. 한셀에서 차트/수식를 복사하여 App 에 붙여 넣은 후 편집이 가능하게 구현이 가능하며, 표/그림/도형 등 사용에 따라 편리하게 데이터를 활용 가능하도록 만들 수 있다.

<br>

### 마치며

보통 클립보드에 복사된 데이터를 App 에 붙여넣기를 하면 App 에서 클립보드에서 제공되는 데이터 중 미리 정해둔 우선순위에 따라 데이터가 선택된다 (보통은 Natvie Format, HTML, Text 순으로 붙여넣기가 실행된다). [골라 붙이기] 기능을 제공하는 App 에서는 클립보드의 데이터 중 해당 App 에서 활용이 가능한 데이터 중 하나를 선택하여 App 에 붙여넣을 수도 있다.

당신이 App 을 구현할 때 클립보드에 위와 같은 데이터도 처리 가능한 필터를 만들어 제공한다면, 한컴오피스를 OLE 개체로 붙여넣을 수도 있고, 개체를 손실 없이 편집가능하도록 붙여넣을 수도 있을 것이다.

앞서 설명한 데이터는 한컴오피스 한셀을 기준으로 설명되었다. 다른 오피스 제품에도 당신이 모르는 그렇지만 당신이 만든 App 에서 필요로 하는 특별한 데이터를 클립보드를 통해 제공할 수도 있다.

따라서, 한컴오피스에 제공하는 클립보드 데이터를 활용하여 당신의 App 이 특별한 데이터를 호환할 수 있다면 사용성은 극대화 될 것이며 유저들에게도 활용성이 높은 제품으로 기억될 것이다.

다음 포스팅에는 한컴오피스를 통해 활용 가능한 다른 요소 기술을 찾아보도록 하겠다.


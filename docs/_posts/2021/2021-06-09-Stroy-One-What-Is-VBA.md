---
title: VBA와 오피스 자동화(Automation)
author: 박광용
author_id: hnc-kypark
tag: 
- VBA 
- Automation 
- HancomOffice 
- HCell
excerpt: VBA의 개요와 한셀을 이용한 자동화 기본 예제
---
# Visual Basic for Application
- - -
<br>
  VBA는 1993년 MS Excel 5.0 에서 처음 공개된 언어로 **Visual Basic for Application** 이란 이름 그대로 특정 Application을 위한 
 Visual Basic이다. 프로그래밍 언어인 VBA 코드를 작성하여 Application의 특정 기능을 실행시킬 수 있다.

```VB
' Hello World! 메시지 박스를 출력하는 예제
Sub WelcomeToVBA()
    MsgBox "Hello World!"
End Sub
```

# 자동화(Automation)
- - -
<br>
**자동화(Automation)**란 *Application*이 자신의 기능을 외부로 노출하여 다른 *Application*에서도 사용할 수 있게 하는 기술이다. VBA에서는 이렇게 노출된 자동화 객체를 이용하여 *Application*의 기능을 실행시킨다.
<br><br>
예를 들어 아래와 같이 한셀에서 A1 셀에 "HI"라는 텍스트값을 입력하는 동작을 보자.


> ![A1 셀에 "HI" 입력]({{ site.assets }}/2021/2021-06-09-inputDataIntoCell.gif)
>
> 그림 1. 한셀에서 셀A1에 HI를 입력하는 모습

이는 VBA를 통하여 이렇게 나타낼 수 있다.

```VB
' A1 셀에 "HI" 를 입력하는 예제
Sub InputDataIntoA1Cell()
    Cells(1, 1) = "HI"
End Sub
```

이 코드를 실행하면 A1 셀에 "HI" 가 입력된다. 여기서는 한셀에서 표현된 `Cells` 자동화 객체를 사용하였다.

이렇게 VBA를 이용하여 한컴오피스 내에 동작을 자동화 할 수 있으며 오피스 앱별 객체 모델의 이해가 필요하다.

# 활용
- - -
<br>
자동화 객체를 활용하는 방법은 매우 다양하다. 여기서는 한셀의 자동화 객체 모델에 대하여 간단하게 알아보고 이를 이용한 예제를 살펴보자.

## 한셀 객체 모델
- - -
<br>
> ![한셀 객체 모델]({{ site.assets }}/2021/2021-06-09-HCellObjectModel.png)
>그림 2. 대표적인 한셀 객체 모델

한셀 객체 모델의 대표적인 객체들을 보자면 다음과 같다.
### Application
 제일 상위 객체로 한셀 프로그램 그 자체를 나타낸다. 
 > ![한셀 Application]({{ site.assets }}/2021/2021-06-09-hcellApplication.png)
 >
 > 그림 3. 한셀 Application

```VB
'Application 객체의 ScreenUpdating 속성 테스트
Sub ApplicationScreenUpdatingPropertyTest()
    Appication.ScreenUpdating = false

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    Appication.ScreenUpdating = true
End Sub
```

VBA 코드를 이용하여 문서 편집에 대해 자동화를 구현하는 경우 셀에 값을 수정하고 그림을 그리는 내용 등의 동작이 연속적으로 발생하여 불편함을 느끼는 경우도 있다. 이럴 땐 위의 코드와 같이 `Application` 객체의 `ScreenUpdating` 속성값을 `false`로 설정하여 실제 데이터들이 수정되는 동안 화면 갱신이 발생하지 않도록 수정한 뒤 문서를 편집하는 동작이 모두 종료가 되면 `ScreenUpdating` 속성값을 `true`로 설정하여 수정내역을 한 번에 확인할 수 있다.

### Workbooks
`Workbook`의 집합을 나타내는 객체로 `Workbook` 객체를 관리할 수 있다.

```VB
'현재 문서와 같은 경로에 있는 "test.xlsm" 문서를 여는 동작
Sub WorkbooksOpenTest()
    Appication.ScreenUpdating = false

    Dim workbookName As String
    workbookName = "test.xlsm"
    Workbooks.Open ThisWorkbook.Path & "\" & workbookName

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    Workbooks(workbookName).Close
    
    Appication.ScreenUpdating = true
End Sub
```

여러 개의 문서에서 특정 데이터들을 취합해야 하는가? 그럴 땐 위와 같이 VBA 코드를 이용하여 문서를 여닫는 동작을 자동화해보자. 위에서는 `Workbooks` 객체의 `Open` 함수와 `Workbook` 객체의 `Path` 속성을 이용하여 현재 문서와 같은 경로에 있는 문서의 이름을 받아 문서를 열고 원하는 작업을 수행한 뒤 열었던 문서를 닫는 동작을 보여준다. 이를 응용하여 반복문으로 위와 같은 동작을 실행한다면 여러 개의 문서 편집 또는 데이터 추출을 자동화 할 수 있다.

### Workbook
스프레드시트 문서를 나타내는 객체이다. 

```VB
'문서을 열고 수정, 저장 후 닫기
Sub WorkbooksOpenTest()
    Appication.ScreenUpdating = false

    Dim workbookName As String
    workbookName = "test.xlsm"
    Workbooks.Open ThisWorkbook.Path & "\" & workbookName

    Dim testWorkbook as Workbook
    set testWorkbook = Workbooks(workbookName)

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    testWorkbook.Save
    testWorkbook.Close

    Appication.ScreenUpdating = true
End Sub
```

문서를 열고 수정하고 저장하고 닫는 작업을 반복하여서 한다면 위의 코드를 응용하는 것도 좋다. `Workbooks` 객체의 `Open` 메소드를 통하여 특정 이름의 문서를 연 뒤 수정 후 `Workbook` 객체의 `Save` 함수를 통하여 문서를 저장하고 `Close` 함수를 통하여 문서를 닫는다.

### Worksheets
`Worksheet`의 집합을 나타내는 객체로 `Worksheet`를 관리할 수 있다.

```VB
'문서에서 원하는 시트에 접근
Sub WorkbooksOpenTest()
    Appication.ScreenUpdating = false

    Dim workbookName As String
    workbookName = "test.xlsm"
    Workbooks.Open ThisWorkbook.Path & "\" & workbookName

    Dim testWorkbook as Workbook
    set testWorkbook = Workbooks(workbookName)

    Dim dataSheetName as String
    dataSheetName = "Data"

    Dim dataSheet as Worksheet
    set dataSheet = testWorkbook.Worksheets(dataSheetName)

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    testWorkbook.Save
    testWorkbook.Close

    Appication.ScreenUpdating = true
End Sub
```

이 예제에서는 문서에서 특정 시트에 접근하기 위해 `Wroksheets` 객체를 이용하여 원하는 `Worksheet` 객체를 얻었다. 


### Worksheet 
시트를 나타내는 객체이다.
 > ![Worksheet]({{ site.assets }}/2021/2021-06-09-worksheet.png)
 > 그림 4. Worksheet

```VB
'특정 시트를 숨기기
Sub WorkbooksOpenTest()
    Appication.ScreenUpdating = false

    Dim workbookName As String
    workbookName = "test.xlsm"
    Workbooks.Open ThisWorkbook.Path & "\" & workbookName

    Dim testWorkbook as Workbook
    set testWorkbook = Workbooks(workbookName)

    Dim dataSheetName as String
    dataSheetName = "Data"

    Dim dataSheet as Worksheet
    set dataSheet = testWorkbook.Worksheets(dataSheetName)
    dataSheet.Visible = xlSheetVeryHidden

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    testWorkbook.Save
    testWorkbook.Close

    Appication.ScreenUpdating = true
End Sub
```

문서를 다루다 보면 특정 시트는 문서를 보는 다른 사용자들에게서 숨기고 싶은 경우가 있다. 데이터값을 기록하기 위한 시트나 수정되면 안 되는 정보를 저장하는 시트인 경우가 그렇다. 이 경우 위의 예제처럼 `Worksheet` 객체의 `Visible` 속성을 이용하여 시트가 보이지 않도록 감출 수 있다.

### Range
시트 내에 셀들의 영역을 관리할 수 있는 객체이다. 셀의 특정 범위에 대한 데이터를 다룰 수 있다.
 > ![Range]({{ site.assets }}/2021/2021-06-09-range.png)
 > 그림 5. Range
  
```VB
'특정 범위의 값 데이터 얻기
Sub WorkbooksOpenTest()
    Appication.ScreenUpdating = false

    Dim workbookName As String
    workbookName = "test.xlsm"
    Workbooks.Open ThisWorkbook.Path & "\" & workbookName

    Dim testWorkbook as Workbook
    set testWorkbook = Workbooks(workbookName)

    Dim dataSheetName as String
    dataSheetName = "Data"

    Dim dataSheet as Worksheet
    set dataSheet = testWorkbook.Worksheets(dataSheetName)
    dataSheet.Visible = xlSheetVeryHidden

    dataSheet.Range("A1:B10").Copy Workbooks("Collection.xlsx").Worksheets("result").Range("A1")

    ''''''''''''''''''''''''''''
    ''' 문서를 편집 하는 내용 '''
    ''''''''''''''''''''''''''''

    testWorkbook.Save
    testWorkbook.Close

    Appication.ScreenUpdating = true
End Sub
```

이 예제에서는 위에 있는 모든 예제가 사용되었다. *test.xlsm* 문서를 연 뒤 *data* 시트의 *A1:B10* 범위의 값을 복사하여 *Collection.xlsx* 문서에 *result* 시트의 *A1* 셀에 붙여넣었다.  

# 정리 
- - -
위에서 VBA의 간단한 개요와 오피스 자동화에 대해 살펴보았다. 이를 활용하기 위한 한셀의 대표적인 객체 모델과 함께 예제 코드를 통하여 활용 방안을 제시했다. 

이처럼 VBA와 오피스 자동화는 매우 밀접한 관계가 있다.

오피스 자동화는 한셀에만 국한된 것이 아니라 한글, 한쇼, 한워드 자동화도 가능하다. 이를 활용하여 업무의 효율을 극대화하길 바란다.


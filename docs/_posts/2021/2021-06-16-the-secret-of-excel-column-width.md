---
title: 엑셀 "열 너비"의 비밀
author: 박종서
author_id: hnc-pjs
date: 2021-06-16 12:34:56 +0900
tags: Excel column-width algorithm secret 엑셀 열너비 알고리즘 비밀
excerpt: 계산 알고리즘의 숨겨진 인자를 찾아서..
---

## 계산 알고리즘의 숨겨진 인자를 찾아서..
<br />


## 들어가기
---
<br />

Excel의 `열 너비`(`column width`)는 지금까지 베일에 싸여있었다. 폰트마다 달라지고, 같은 폰트라도 크기에 따라서 또 달라진다. 사용자가 입력한 값과 다르게 세팅되기도 하며, 단위도 알 듯 모를 듯하다.

많은 엑셀 파일을 다루는 프로그램에서 실험 값에 의한 매직넘버에 의존해 `열 너비`를 계산해 왔다. 마침내 엑셀의 파일포맷이 공개되었을 때, `열 너비`에 대한 공식도 공개되어 매직넘버가 아닌 계산 알고리즘을 통해 `열 너비`를 얻어낼 수 있게 되었다. 그러나 아무리 공식을 이리저리 대입해 보아도 실제 값과는 너무나도 큰 괴리가 존재했다.

공식에 대한 연구와 실험 결과.. 미공개 factor가 존재함을 확신하게 되었고, 폰트의 구조 및 관련된 단위계에 대한 리서치부터 시작하여, 공식 문서에는 없는 미공개 factor를 찾기 위해 수 십가지 키워드 조합으로 수많은 리서치를 수행하여 `column width`와 관련된 아주 작은 정보까지 샅샅이 수집하였다. 또한 여러 폰트들과 `열 너비` 사이의 무모할 정도로 많은 조합에 대해 수 백가지 실험 값을 만들고 비교하기에 이르렀다.

이하는 그렇게 발견한 미공개 factor를 공개 알고리즘과 조합하여 정확한 `열 너비`를 얻어내는 여졍에 대한  이야기이다.
<br />
<br />
<br />


## 단위 및 용어
---
<br />
계산 알고리즘에 대한 이야기이니 이해에 필요한 단위와 용어에 대해 먼저 알아보고 출발하자.

#### - `pt` (point)
1/72 inch를 말하며, 폰트 크기를 나타내는 기본 단위로 쓰인다.

#### - `dpi` (dot per inch)
그래픽 단위인 `ppi`(pixel per inch)와 같은 뜻으로 쓰이며, 1 `inch`당 들어갈 수 있는 점(pixel)의 갯수를 말한다.  
윈도우 시스템은 96`dpi`를 사용하고, 애플 시스템은 72`dpi`를 사용한다.

#### - `px` (pixel)
점 단위로, 96`dpi` 하의 모니터에서 1/96 `inch`를 말한다.  
따라서 `pt`와 `px`간 변환 시에는 현재 그래픽 설정의 `dpi`를 가져와서 계산해야 한다.

#### - `twip`
1/20 `pt`를 말한다. 1/1440 `inch`와도 같다.

#### - `ch`
하나의 글자를 말한다. 1 `ch`의 폭은 `MDW`와 같다.

#### - `MDW` (Maximum digit width)
특정 폰트의 특정 크기, 보통 스타일 일 때 '0'에서 '9'까지 숫자 폭 중 가장 큰 것을 말한다.  
대부분의 숫자 폭은 일정하지만 되도록 모든 숫자의 폭을 조사하여 가져오는 게 좋다.  
단위는 `px`이다.

#### - `col width` (Column width)
단위는 `ch`인데, `MDW`를 폭으로 하는 글자가 최대 몇 자까지 표시될 수 있는 지를 나타낸다.  
특이한 것은 엑셀의 `cell` 안에는 좌/우 여백이 있는데, 이 부분에도 글자를 표시할 수 있는 것으로 너비를 계산한다는 것이다.  
그러나 실제로는 이곳에 글자를 표시할 수 **없다!!**  

#### - `char width` (Character width)
단위는 `ch`이며, `cell`에 표시할 수 있는 실제 글자 수를 나타낸다. 즉, `col width`에서 `cell` 안의 좌/우 여백을 뺀 것을 말한다.

#### - `col width px` (Column width in px)
`ch` 단위 인 `col width`를 `px` 단위로 변환한 것.

#### - `def char` (Default character size)
Excel 앱단에서 사용되는 글꼴의 기본 크기를 말한다. 변경 후에는 프로그램 종료 후 다시 시작해 야 적용된다.

#### - `padding` (Margin padding)
단위는 `px`이며, `cell` 안쪽 좌/우의 여백을 말한다. 글자가 표시될 수 없는 영역이다.

#### - `grid line`
1`px` 고정이며, 가이드 라인을 그리기 위한 영역이다.

#### - `margin space` (Total margin space)
좌/우 여백(`padding`)과 `grid line` 폭을 합한 것으로, 단위는 `px`이다.

<br />


## 기본 공식
---
<br />

#### - `pt` to `px` 변환
pt \times \frac{dpi}{72} = px

#### - `px` to `pt` 변환
px \times \frac{72}{dpi} = pt

#### - `twip` to `pt` 변환
twip \times \frac{1}{20} = pt
<br />
<br />
<br />


## 공개된 공식
---
<br />

OOXML 공식 스펙 문서(ISO/IEC 29500 part 1)의 18.3.1.13 col(Column Width & Formatting) 절 width 속성 부분의 내용은 아래와 같다.

> Column width measured as the number of characters of the maximum digit width of the numbers 0, 1, 2, ..., 9 as rendered in the normal style's font.
> There are 4 pixels of margin padding (two on each side), plus 1 pixel padding for the gridlines.
> 
> width = Truncate( [ { Number of Characters } * { Maximum Digit Width } + { 5 pixel padding } ] / { Maximum Digit Width } * 256 ) / 256
>
> To translate the value of width in the file into the column width value at runtime (expressed in terms of pixels), use this calculation:
> = Truncate( ( ( 256 * { width } + Truncate( 128 / { Maximum Digit Width } ) ) / 256 ) * { Maximum Digit Width } )
>
> To translate from pixels to character width, use this calculation:
> = Truncate( ( { pixels } - 5 ) / { Maximum Digit Width } * 100 + 0.5 ) / 100
>
> [Note: when wide borders are applied, part of the left/right border must overlap with the 2 pixel padding on each side. Wide borders do not affect the width calculation of the column. end note]
>
> [Note: When the sheet is in the mode to view formulas instead of values, the pixel width of the column is doubled. end note]
>
> _- ISO/IEC 29500 part 1, 18.3.1.13 col(Column Width & Formatting)_

이를 토대로 아래와 같은 계산 공식을 얻어낼 수 있다.

#### - `col width`
\frac{Truncate(frac{characters \times MDW + (2(margin padding) \times + 1(grid line))}{MDW} \times 256)}{256}

#### - `col width px`
Truncate(\frac{256 \times col width + Truncate(\frac{128}{MDW})}{256} \times MDW)

#### - `char width`
\frac{Truncate(\frac{pixels - 5}{MDW} \times 100 + 0.5)}{100}

#### * 그러나, 공개된 공식만으로는 제대로 된 `열 너비`를 구할 수 없더라!!
<br />
<br />


## 미공개 factors
---
<br />

#### - `MDW`
가장 기초적인 요인으로 폰트의 폭을 가져올 때, Win32 API 제공함수를 사용하는데, 이때 `HLOGFONT.lfHeight`에 글꼴 크기에 대한 `pt`를 `px`로 변환하여 음수값으로 설정해주어야 한다. 그래야 세팅한 높이를 기준으로 알맞게 조정된 폰트의 크기를 얻을 수 있다.  
또 하나, 다른 값들은 모두 0으로 세팅해주되, `HLOGFONT.lfCharSet`은 `DEFAULT_CHARSET`으로 설정해주어야 한다. 한글 폰트만 들어있는 경우도 있는데 이때 `ANSI_CHARSET`을 선택하면 설정한 크기가 아닌 기본 폰트의 크기를 가져와 버리기 때문이다.
Win32 API의 `GetTextExtentPoint32()` 함수를 사용하여 '0'부터 '9'까지의 폭을 모두 가져와서 그 중 가장 큰 값을 사용한다.  
특정 폰트의 특정 사이즈에 대해 항상 일정하므로, 한번 가져온 값은 재사용하는 게 좋다.

#### - `Padding`
공개 문서에는 2`px`라고 나오지만, **뻥이다!** 글꼴 크기를 키우면 `padding`도 함께 커지는 것을 확인할 수 있다!  
가능한 많은 조합의 실험 값을 토대로 1/4 `ch`라는 것을 알아냈다. `ch`의 폭은 `MDW`이므로, 1/4 `MDW`가 된다.  
단, 바로 4로 나누면 안된다!  
먼저 2를 나누어 반올림 하고, 다시 2를 나누어 반올림 해주어야 한다!  
즉, **2로 나누어 반올림하기를 2번 반복**해야 한다.  
`MDW`를 기준으로 계산되므로, 폰트나 사이즈에 관계없이, `MDW`가 같은 값이면 `margin padding` 값도 같다. 따라서 특정 `MDW`에 대해 캐싱을 해두면 좋다.

#### - `Px` 보정
`Margin padding`까지 고려해서 얻은 값과 실험 값이 일치할 때도 있고, 다를 때도 있었는데, 8과 관련된 주기가 있어 보였다.  
그러던 중, 스크롤 속도 향상을 위해 픽셀을 8의 배수로 반올림 한다는 내용의 MS 문서를 발견했는데, 그마저 실제로는 반올림이 아니라 올림이었다!  
*(최근에 업데이트된 MS 문서에는 올림으로 수정됨)*  
정확히는 일단 8로 나눈 수를 올림 처리하고 여기에 다시 8을 곱하여 8의 배수로 만들어주는 것이다.  

#### - 계산 프로세스
pixel 보정까지 완료하면, `px` 단위의 `열 너비`는 정확하게 나온다! 이것을 `열 너비`에 세팅해주면 된다.  
그러나 문제는 `ch` 단위의 `열 너비`가 정확하지 않다는 것이다.  
먼저 해당 `px`에 `padding`을 제외하고 실제 표시할 수 있는 폭(`char width`)을 계산해야 한다. 이 것이 `열 너비` 툴팁에 `px` 단위와 함께 표시된다.  
마지막으로 `char width`를 사용하여 `padding`까지 포함한 열 너비(`col width`)를 `ch` 단위로 얻어오면 비로소 모든 과정이 끝난다.
<br />
<br />
<br />


## 미공개 factor를 적용한 공식
---
<br />

빨간 색이 입력 값이며, 각 공식에 대한 간략한 설명도 추가하였다.

#### - `margin space`
Truncate(\frac{Truncate(\frac{MDW}{2} + 0.5)}{2} + 0.5) \times 2 + 1(grid line)  
`MDW`의 1/4 두 개에 1`px`를 더한다.

#### - `col width`
\frac{Truncate(\frac{characters \times MDW + margin space}{MDW} \times 256)}{256}  
주어진 `ch`가 차지하는 `px`에 `margin space`를 더하여 여백을 포함한 총 너비를 `px`로 구한 뒤 `MDW`로 나누어 `ch` 단위로 변환한다.

#### - `col width px`
Truncate(\frac{256 \times col width + Truncate(\frac{128}{MDW})}{256} \times MDW)  
주어진 `ch`를 정수로 반올림 하고, `ch`당 `px`에 해당하는 `MDW`를 곱하여 `px` 단위로 변환한다.

#### - calibrate `col width px`
Ceil(\frac{px}{8}) \times 8  
8의 배수로 올림을 통해 보정한다.

#### - `char width`
\frac{Truncate(\frac{px - margin space}{MDW} \times 100 + 0.5)}{100}  
`px` 단위의 총 너비에서 `margin space`를 제외한 순수 글자표시 영역을 `ch` 단위로 변환하되, 소수점 3째 자리에서 반올림하여 구한다.
<br />
<br />
<br />


## 전체 계산 프로세스
---
<br />

지금까지 완성한 공식을 순서에 따라 엮어보면 아래 그림과 같다.  
시스템에서 DPI를 가져오고, 원하는 폰트의 이름과 크기 및 default character size를 넣어주면,  
최종적으로 `Column Width`가 출력된다.

<br />


## Caching Mapping
---
<br />

아래의 Key-Value 매핑을 캐시해서 재사용할 수 있다.

Key(s) | Value(s)
------------ | -------------
`Font Name` + `Size` | { `MDW` }
`MDW` | { `padding`, `margin space` }
`Def Char` + `MDW` | { `col width px`, `char width` }

<br />


## 마치며
---
<br />

단순해 보이는 `열 너비`에서도 엑셀의 고민과 철학을 느낄 수 있었다.
철학이라 함은 엑셀은 모든 것이 **"숫자"**에 맞춰져 있다는 것이다. 숫자를 표시하는 데 좀 더 보기 좋게, 좀 더 빠르게 해보자는 것이다. ~~그리고 이것들을 비공개로 하자는..~~

공식으로 도출되지 않고, 예외사항을 두었을 것이란 생각은 버려야 한다. 공식을 찾아볼 시도도 못하게 되기 때문이다. 오히려 예외사항 조차도 공식에 넣을 수 있도록 노력해야 한다.

아직도 미처 발견하지 못한 또 다른 미공개 factor가 있을 수 있다. 필요가 발생하게 되면 다시 한 번 연구해 볼 것이지만.. 당분간은 안해도 될 것 같다. ㅎㅎ
<br />
<br />

#### 그런데, 짜증나는 것은.. "행 높이"는 또 다른 세계라는 것이다..
<br />
<br />
<br />


---
* 본 블로그는 2011년 한컴오피스 한셀 개발팀에서 고군분투하며 연구/개발한 내용을 바탕으로 작성되었습니다.
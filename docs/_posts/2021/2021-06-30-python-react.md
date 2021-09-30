---
title: 파이썬과 리액트를 활용하여 간단한 웹 애플리케이션 만들기 - 1
author: 
  name: 최준성
  uri: https://github.com/hnc-cjs
tag: 
- flask
- react
- python
excerpt: 웹 개발 입문자의 걸음마 프로젝트
---

# 들어가기 전에
---
본 블로그 내용은 웹 애플리케이션 동작원리 이해와 리액트 개발 능력 향상을 위한 공부용 개인 프로젝트입니다.
<br>
참고로 저는 웹 애플리케이션 개발 처음입니다.^^
<br>
부족한 부분이 많지만 여러분과 함께 소통하며 성장하면 좋겠습니다.
<br>

### 주제 선정
웹 애플리케이션을 막상 만들려니 어떤 주제가 좋을지 고민이 많았습니다.
<br>
이왕 해보는 거 재미없는 거 말고 사람들 어그로를 최대한 끌 수 있는 것이면 좋겠다는 생각이 들었습니다.
<br>
따라서 요즘 핫한 **주식 관련 데이터를 활용한 웹앱**을 만드는 것으로 주제를 정했습니다.
<br>
그중에서도 전세계 1위 시가총액 'APPLE'을 샘플로 타겟하여 나만의 차트 그리기를 진행하겠습니다.

### 언어 선정
개인적으로 리액트 활용능력 향상이 처음 목표였기 때문에 **프론트엔드는 리액트**로 정했습니다.
<br>
처음엔 리액트 만으로 웹앱을 개발하려 하였으나 크게 두 가지 문제가 있었습니다.
1. 주식 데이터를 얻을 수 있는 다양한 증권사 및 사이트의 API 활용이 어려움.
2. 데이터를 얻어와도 방대한 양의 데이터를 원하는 대로 쉽고 빠르게 가공하기 어려움.

따라서 프론트에서는 이미 백엔드에서 가공된 데이터를 예쁘게 Display 하는 역할만 하고,
<br>
**백엔드 서버를 통해 데이터 수집 및 가공, 저장**하는 것으로 정했습니다.

**백엔드는 파이썬 플라스크 프레임워크**를 사용할 것입니다.
<br>
파이썬 언어는 다양한 증권사 및 사이트의 데이터 수집 API를 쉽게 이용이 가능하며, 
이미 널리 활용중이라 검색만으로도 저같은 입문자가 쉽게 사용할 수 있기 때문입니다.

파이썬 웹 개발 프레임워크는 크게 두가지 선택지가 있었습니다.
<br>
플라스크(Flask)와 장고(Django)입니다.

> ![flask]({{ site.assets }}/2021/2021-06-30-flask1.png){: width="400px" }
> ![django]({{ site.assets }}/2021/2021-06-30-django1.png){: width="400px" }


<br>
그 중에 **플라스크를 선택한 이유**는 다음과 같습니다.
1. 장고는 입문자가 쓰기에는 너무 거대하고 복잡해서 뭐가 어떻게 도는지 파악하기 어려울 것 같은 느낌
2. 플라스크는 필요한 기능만 가져다 쓸 수 있기 때문에 컨트롤하기 쉬울 것 같은 느낌

<br>
장고는 나중에 기초가 쌓이고 실력이 갖춰지면 써보는 걸로..

<br>
### 구현순서
구현하게 될 순서입니다.
오늘은 1번을 진행하도록 하겠습니다.
1. **데이터 수집 & 데이터 가공 (python)**
2. 가공된 데이터 관리 (DB)
3. 가공된 데이터를 제공하는 API 구현 (flask)
4. 프론트에서 데이터를 받아 출력 (react)

<br>
<br>
# 구현
---
### 데이터 수집
데이터 수집은 Yahoo Fianace API를 이용하였습니다.
파이썬에서는 <code>pip install yfinance</code>로 API를 이용할 수 있습니다.
```py
import yfinance as yf

def get_data(name):
    company = yf.Ticker(name)
    hist = company.history(period="max")
    print(hist)

if __name__ == '__main__':
    get_data("AAPL")
```
#### 결과
> ![res]({{ site.assets }}/2021/2021-06-30-res1.png){: width="600px" }

위와 같이 yfinance API를 이용해 쉽게 과거 데이터를 수집하고 이용할 수 있습니다.
<br>
### 데이터 가공
위에서 수집한 Close(종가)값을 이용하여 추세선 데이터를 뽑아내는 함수를 작성해보았습니다.<br>
<code>numpy.polyfit()</code>를 이용하여 데이터 추세에 맞는 다항식을 얻고,<br>
다항식 x에 Close 값을 넣은 결과값을 배열형태로 리턴하는 함수입니다.

```py
import numpy as np

def getTrendLine(target, x, y, degree):
    fit = np.polyfit(target.loc[:, x].values, target.loc[:, y].values, degree)
    trendline = []
    for i in target[x]:
        k = degree
        temp = 0
        for j in fit:
            temp = temp + j*math.pow(i, k)
            k = k - 1
        trendline.append(temp)
    return trendline
    
if __name__ == '__main__':
    res = get_data("AAPL")
    res['TrendLineWithClose'] = getTrendLine(res, 'Id', 'Close', 4)
```
<br>
### 차트로 출력
출력은 프론트엔드에서 하기로했지만 연재 마지막날에 프론트를 구현할 예정이라 오늘은 임시로 데이터를 출력해봤습니다.<br>
다음과 같이 <code>matplotlib.pyplot</code> 패키지를 이용하여 **가공된 추세선 데이터를 출력**합니다.<br>
추후 프론트 생기면 없어질 코드니 불편하시더라도 양해바랍니다.

```py
def drawChart(res, date, x, y=""):
    timelimit = res['Date'] > '2000-01-01'
    plt.plot(res.loc[timelimit, date].values, res.loc[timelimit, x].values)
    if y!="":
        plt.plot(res.loc[timelimit, date].values, res.loc[timelimit, y].values)
    plt.show()

if __name__ == '__main__':
    res = get_data("AAPL")
    res['TrendLineWithClose'] = getTrendLine(res, 'Id', 'Close', 4)
    drawChart(res, 'Date', 'Close', 'TrendLineWithClose')
```

#### 결과(애플차트)
> ![chart]({{ site.assets }}/2021/2021-06-30-chart1.png){: width="600px" }

   ~~이렇게 보니 고평가..~~
<br>
<br>
# 마치며
---
전체 소스코드는 아래 github에서 clone 받아 보시면 됩니다.<br>
> [https://github.com/hnc-cjs/MyStock](https://github.com/hnc-cjs/MyStock)

<br>
2탄은 가공된 데이터를 DB로 관리입니다. 주말에 열심히 공부해서 다시 돌아오겠습니다.^^<br>
긴 글 읽어주셔서 감사합니다.

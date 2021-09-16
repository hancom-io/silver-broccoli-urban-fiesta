---
title: 파이썬과 Playwright를 활용하여 웹크롤링하기 - 1
author: 
  name: 김현수
  uri: https://github.com/hnc-hyunsu00
tag:
  - python
  - playwright
excerpt: 웹크롤링에 대하여 알아보자
---

이번 포스트에서는 한컴통합문서뷰어에서 웹페이지를 이미지나 PDF로 변환시
사용된 Playwright에 대해서 알아보고자 합니다.

# 🎭 [Playwright](https://playwright.dev)

- [웹크롤링(crawling)](https://namu.wiki/w/%ED%81%AC%EB%A1%A4%EB%A7%81), 브라우저 자동화에 주로 사용되며 [다양한 언어의 지원](https://playwright.dev/python/docs/languages/) 및 Chrome, Edge, Safari, Firefox등 현존하는 모든 브라우저를 지원하는 오픈소스 라이브러리입니다.

## 시작하기

- Playwright는 다양한 언어(JavaScript and TypeScript, Python, Java, .NET)를 지원하며 여기서는 Python언어를 사용하여 기본적인 사용법을 설명하겠습니다.

## 요구사항

- Python 3.7 이상
- Windows, macOS, Linux

## 설치

- pip를 이용한 설치

```bash
pip install playwright
playwright install
```

## 기본 사용법

- screenshot

```python
from playwright.sync_api import sync_playwright

def HtmlToImage(htmlURL, resultFilePath, imageType):
    with sync_playwright() as playwright:
        try:
            chromium = playwright.chromium
            browser = chromium.launch()
            page = browser.new_page()
            page.goto(htmlURL)
            page.screenshot(path=resultFilePath, type=imageType, full_page=True)
            page.close()
        except Exception as e:
            print('htmlToImageFail : %s' % (e))

if __name__ == "__main__":
    # HtmlToImage
    HtmlToImage("https://www.google.com/", "google.png", "png")
```

- pdf 로 저장

```python
from playwright.sync_api import sync_playwright

def HtmlToPdf(htmlURL, resultFilePath):
    with sync_playwright() as playwright:
        try:
            chromium = playwright.chromium
            browser = chromium.launch()
            page = browser.new_page()
            page.goto(htmlURL)
            page.pdf(path=resultFilePath)
            page.close()
        except Exception as e:
            print('htmlToPdfFail : %s' % (e))

if __name__ == "__main__":
    # HtmlToPdf
    HtmlToPdf("https://www.google.com/", "google.pdf")
```

- 스크립트 레코딩

```bash
playwright codegen wikipedia.org
```

## 마치며

---

다음 포스트에는 playwright의 **핵심 개념** 및 본격적인 웹 **크롤러**(crawler) 만들기 포스트를 해보겠습니다.

### Reference

- [Documentation](https://playwright.dev/python/docs/intro)
- [API Reference](https://playwright.dev/python/docs/api/class-playwright)
- [github](https://github.com/microsoft/playwright-python)

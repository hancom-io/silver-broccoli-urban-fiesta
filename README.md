# 한컴 Tech 블로그

한글과컴퓨터 기술 블로그의 저장소입니다. GitHub Pages를 이용한 정적(static) 블로그 사이트를 생성합니다.<br>
사이트 주소는 <https://hancom-io.github.io/silver-broccoli-urban-fiesta/> 입니다.

## 로컬 개발 환경 설정

GitHub Pages 서비스는 Jekyll을 이용해 사이트를 구축합니다. 로컬 PC에 Jekyll을 설치하면 사이트 결과물을 미리 확인할 수 있습니다. Jekyll 구동을 위해서는 [Ruby 개발 환경](https://www.ruby-lang.org/ko/downloads/)이 필요합니다.

### 사전 준비

```bash
# ruby 환경 확인
$ ruby --version
$ gem --version

$ gem install bundler
$ gem install jekyll

# jekyll 설치 확인
$ jekyll --version
$ bundle --version
```

또는, Jekyll 환경이 갖추어진 Docker container 안에서 작업할 수도 있겠습니다.

### 실행 결과 확인

```bash
$ git clone https://github.com/hancom-io/silver-broccoli-urban-fiesta.git
$ cd silver-broccoli-urban-fiesta/docs
$ bundle exec jekyll serve

# 로컬 실행 확인:
# http://localhost:4000/silver-broccoli-urban-fiesta
```

## 콘텐츠 추가 및 기능 개선

### 글 작성

새 블로그 글을 작성할 때는 `docs/_posts/YYYY/` 폴더에 markdown 형식으로 `.md` 파일을 만듭니다.<br>
글에 들어갈 이미지 등의 파일은 `docs/assets/YYYY/` 폴더에 넣습니다. 편의상 `_posts` 폴더의 `.md` 파일과 동일한 파일명 컨벤션을 갖도록 합니다.

### js 코드 수정

브라우저 쪽에서의 동작을 위해 수행되는 JavaScript 코드는 `docs/js` 아래에 들어있고, `docs/_includes` 아래의 html 파일에도 일부 들어있습니다.<br>
`docs/js` 아래의 코드를 수정하게 되면, 그 코드가 `docs/assets/js` 폴더에 번들로 포함되어 사이트 빌드 시에 잘 반영될 수 있도록 *js 빌드*를 한번 해주어야 합니다. [`yarn`](https://classic.yarnpkg.com/en/docs/install)이 미리 설치되어 있어야 합니다.

```bash
# docs 폴더에서
$ yarn build
```

이렇게 해서 `docs/assets/js` 폴더에 만들어지는 `*.bundle.js` 파일들은, Jekyll/GitHub Pages 빌드 시에 `docs/_site` 폴더로 옮겨져 실제 서비스에 사용되게 됩니다.

### 실제 서비스(GitHub Pages)에 반영

수정된 파일들을 모아 로컬 커밋을 만들고, git push하고 PR 작성하여 main 브랜치에 머지되고 나면, 잠시 뒤에 GitHub Pages 빌드가 수행되고 블로그 사이트가 업데이트됩니다.

## 라이선스

이 프로젝트는 Apache-2.0 라이선스를 따릅니다. 자세한 내용은 [LICENSE.txt](LICENSE.txt) 파일을 참고하세요.

## 참고

- GitHub Pages
  - <https://docs.github.com/en/pages>
  - <https://jekyllrb-ko.github.io/docs/github-pages/>
- Jekyll
  - <https://jekyllrb-ko.github.io/>

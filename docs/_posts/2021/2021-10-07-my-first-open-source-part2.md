---
title: 나의 얼렁뚱땅 오픈소스 참여기 - part 2
author: 
  name: 어니(Ernie)
  uri: https://github.com/hnc-jihoon
date: 2021-10-07 18:37:00 +0900
tags:
  - open source
  - xterm.js
  - VS Code
excerpt: 나는 어찌하여 xterm 걱정을 그만두고 다시 VS Code를 사랑하게 되었는가
---

*(이전 글: [나의 얼렁뚱땅 오픈소스 참여기 - part 1]({{ '/2021/09/27/my-first-open-source-part1.html' | relative_url }}) )*{: .right }

\
사실 이럴 생각까지는 아니었다. 이게 뭐 대단한 얘기라고 글을 두 편이나 나눠 쓰나? 일필휘지로 한달음에 갈겨 쓸 생각이었다. 그런데, 쓰다 보니 흐름상 이쯤에서 한번 끊어줘야겠다는 느낌이 들었다. 실제로도 xterm.js 에 PR 올린 후에 시간적인 단절이 있기도 했고.

이슈와 PR을 등록한 다음은 기다림의 시간이었다. 내 맘 같아서야 금방이라도 누가 보고 “오케이, 잘 했어!” 하고 승인해주면 좋겠지만, 여긴 황야의 오픈소스 월드. 길 떠난 프로젝트 주인이 언제 돌아와 내 작은 메모 쪽지를 보아줄지 모르는 상황이었다. 앞서 등록된 다른 이슈와 PR들도 쌓여있는 것들이 많았다. “뭐야, 누가 이런 하찮은 걸 올렸어!” 하는 신경질적인 대답과 함께 빠꾸(?)를 먹을지도 모를 일이었다. 더 나쁜 건, 아무도 관심 주지 않아서 그냥 시간이 지나면서 묻혀버리는 것이었다. 내 github 계정의 프로파일 이미지라도 좀 그럴듯한 걸로 올려놓을 걸 그랬나. ‘사진도 없는 웬 듣보잡이 이상한 걸 올리고 그래..?’ 하고서는 휙 지나쳐버리면 어떡하나.

그러던 어느 날.

일주일 정도 지났을까. 아니, 열흘 정도였을까. 낯선 이메일이 날아왔다. 깃헙 불라불라 뭐라고 써있는데, 평소에 가끔 날아오던 스팸 메일과 좀 다른 모양의 스팸이었다. 앗, 그거다! 누가 내 거에다가 댓글을 달았나보다!

![xterm-issue-comment]({{ site.assets }}/2021/2021-10-07-xterm-issue-comment-by-T.png){: .center }
*(나의 해석: "여기 말고 xterm을 갖다 쓰는 데서 구현하도록 하자꾸나.")*{: .caption }

T로 시작하는 아이디를 쓰는 사람이었다. 이 사람이 PR 쪽에도 코멘트를 달았나보다. 가보자.

![xterm-pr-comment]({{ site.assets }}/2021/2021-10-07-xterm-pr-comment-by-T.png){: .center }
*(나의 해석: "있잖아, 이 단축키를 쓰는 데는 macOS 터미널밖에 없어.\
그러니까 이 키가 필요하다면 VS Code 쪽에서 커스텀 키로 넣는 게 좋겠어.\
우리는 xterm을 가능한 한 작게, 논란거리 없도록 만들고 싶거든.\
내가 VS Code 쪽에 이슈를 만들어놨으니, 네가 거기서 해결해보렴. 아니면 주말에 내가 할 거란다. ㅋ")*{: .caption }

황야의 xterm 프로젝트의 주인이 돌아온 것이었다! 하지만 일단은 거절. 쳇, 그냥 넣어 주지. 여기에 이게 들어가면 다른 여러 응용 프로젝트들에서는 신경 안 써도 되는 일인데… 하지만 코어 쪽은 최대한 가볍게 유지하고 싶다는 T의 의견도 이해는 갔다. 좋아, 그럼 다시 VS Code 쪽으로 가보자.

![vscode-issue]({{ site.assets }}/2021/2021-10-07-vscode-issue-by-T.png){: .center }
*VS Code 쪽에 T가 생성한 이슈*{: .caption .center }

오잉, 설명은 그냥  링크로 때우고 코드 일부를 갖다 붙여놓았네? 오호, 이 부분을 고치면 된다는 뜻인가보군! 가만있자… 그 아래에 또 다른 사람 K가 댓글을 달았네.

> K: 이봐, 이거 지금 작업중이니? 아니라면 내가 가져갈게.\
> T: jihoon-ernesto( = 나 )가 해결할지도 모르니 며칠 기다려보는 게 어떻겠니?

음, 이런 만만한 이슈에는 먹잇감을 노리는 하이에나들이 달려드는구나. 내가 얼른 처리해야겠어. 마침 T가 어떤 파일에 있는 어떤 코드를 고치면 되는지까지 알려줬으니 땡큐다. 먼저 xterm 쪽 PR에 대한 T의 코멘트에 대해 답을 해줘야겠다. 

> 나: 알려줘서 고마워. 그렇다면 내가 거기에다가 PR을 만들게.

부랴부랴 작업을 시작했다. 머뭇거리는 사이에 하이에나 K에게 내 업적(?)을 빼앗기면 안 될 일이었다. 

T가 알려준 좌표는 <code>terminal.contribution.ts</code> 파일. 여기에다가 뭔가 해야 하는 것이었군. 처음에 VS Code 들여다볼 때에는 딴 데만 기웃거리고 있었으니 삽질만 한 것이었다. 그 파일에는 ctrl-A, ctrl-E 등의 키에 해당하는 별도의 키를 추가로 등록하는 코드가 들어 있었고, 나도 비슷한 형식으로 집어넣으면 될 것 같았다. 전반적인 흐름이나 모듈 구성 등을 이해하지는 못했지만, 뭐 내가 하려는 일은 아주 작고 명확한 것이니까, 이것만 제대로 동작하면 될 것이었다. 어찌어찌 또 약간의 삽질 끝에 Code-OSS 실행하여 내장 터미널 창에서 커맨드 쩜의 동작을 확인할 수 있었다. 휴~

문득, 혹시 PR을 올릴 때 unit test 코드도 항상 같이 포함시켜야 하나, 싶었다. 좀 귀찮기도 해서 안 하고 싶은 생각이 들었는데… 다행이군 ㅋ. 다른 사람들의 PR들을 보니 그냥 올린 것들도 많았다. 꼭 해야 하는 건 아니구나.

자, 이제 다시 VS Code에 PR을 올리자. VS Code를 내 계정으로 fork 하고, 그걸 origin 삼아서 local 에 clone하고, <code>cmd-dot-in-terminal</code> 이라는 이름으로 작업 브랜치 만들고, 코드 수정하여 커밋을 만들었다. 이걸 <code>git push</code> 하고, github 웹페이지에 가서 PR 생성하였다. from 브랜치는 <code>jihoon-ernesto:cmd-dot-in-terminal</code> 이고, to 브랜치는 <code>microsoft:main</code> 이다. PR 제목은 T가 이슈 생성한 제목 그대로 썼다. 이 사람이 쓴 표현이 나보다 더 정확하겠지. 화살표 기호 하나만 살짝 바꾸었다.

![vscode-pr]({{ site.assets }}/2021/2021-10-07-vscode-pr-by-me.png){: .center }
*VS Code 쪽에 올린 PR*{: .caption .center }

휴, 벌써 시간이 이렇게 되었잖아? 별로 큰 일 한 것도 아닌데 새벽이 되었네.

다음 날.
밤에 올린 PR에 댓글이 달려 있었다. 

> T: 괜찮네. 땡스.

그리고는 T가 그 PR을 머지했다는 로그가 찍혀 있었다. 엥? 😳\
T는 xterm의 프로젝트 주인 아니었어? VS Code에 커밋 권한까지 있는 사람이었어??

여기서 잠시 생각해보면, 내 커밋이 머지되기까지는 운이 좋았다. T가 손수 이슈를 등록해주면서 어느 위치를 고치면 되는지까지 알려주었고, xterm의 주인인 줄로만 알았던 이 사람이 알고 보니 VS Code 프로젝트의 커미터였으니. 그렇게 해서 엉겁결에 올린 PR이 VS Code의 메인 브랜치에 들어가게 되었다.

그리고 다시 기다림의 시간.

메인 브랜치의 코드는 적당한 때가 되어야 실제 제품에 포함되는 법. 드디어 1.60 버전에 이 커밋이 반영되었다.

![vscode-release-note]({{ site.assets }}/2021/2021-10-07-vscode-release-note-1.60.png){: .center width="848px"}
*VS Code 1.60의 release note 중에서*{: .caption .center }

얘들아, 이거 봐! VS Code의 공식 릴리스 노트에 내 아이디가 들어갔어! 이제 우리가 한여름 땡볕 아래에서 에어컨을 켤 때마다 발명자 캐리어 님을 찬양하는 것처럼, VS Code 내장 터미널에서 커맨드 쩜을 누를 때마다 온 세상이 내 이름을 기억하게 될 거야. *영원히! Para siempre! Until the end of time! ~~(아님)~~*

> \
> \
> \
> *여기 대충 Mad Max ‘날 기억해 줘!’ 짤*{: .center }
> \
> \
> *(저작권 관계로 생략 ㅋ)*{: .caption .center }

\
\
\
여기까지다. 어느 작고 귀여운 오픈소스 기여에 대한 장황한 이야기는. 또 모르지. 언젠가 다른 구석에서 누군가의 다른 이야기가 또 생겨날른지.

\
\
*The End*{: .right }

### Links
- [xterm.js issue #3400 - Need to handle 'cmd + .' on macOS](https://github.com/xtermjs/xterm.js/issues/3400)
- [xterm.js PR #3401 - Handle 'cmd + .' on macOS](https://github.com/xtermjs/xterm.js/pull/3401)
- [VS Code issue #130990 - Add terminal keybinding for cmd+. -> ctrl+c to match Terminal.app](https://github.com/microsoft/vscode/issues/130990)
- [VS Code PR #131025 - Add terminal keybinding for cmd+. → ctrl+c to match macOS Terminal](https://github.com/microsoft/vscode/pull/131025)
- [VS Code v1.60 Release Note](https://code.visualstudio.com/updates/v1_60)
- [Google search: "매드맥스 기억해 줘"](https://www.google.com/search?q=%EB%A7%A4%EB%93%9C%EB%A7%A5%EC%8A%A4+%EA%B8%B0%EC%96%B5%ED%95%B4+%EC%A4%98)

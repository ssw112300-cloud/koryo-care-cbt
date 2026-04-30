# 요양보호사 자격시험 CBT 연습

요양보호사 자격시험을 실전과 동일한 CBT 환경에서 연습할 수 있는 단일 페이지 웹 앱.

## 구성
- **18회차 × 80문제 = 1,440문제** (32회~41회 기출)
- 보기별 ①②③④⑤ 상세 해설 + 헷갈리기 쉬운 포인트
- 실전 시험 환경: 타이머(90분), 답안지, 체크 문제, 필터
- 채점 후 복습 모드: 맞음(파랑)/틀림(빨강)/미응답(회색)/해결됨(보라)
- localStorage 기반 기록 자동 저장 — 최근 3회 회차별 보관
- 기관/기수/이름/생년월일 로그인, 자동 로그인 지원

## 기술
- 단일 HTML (1.7MB) — 외부 의존성 없음(xlsx CDN만)
- 정적 호스팅만 있으면 동작 (GitHub Pages / Netlify / Cloudflare Pages)

## 배포 (GitHub Pages)
1. 이 폴더를 GitHub 리포지토리에 push
2. Settings → Pages → Source: "Deploy from a branch" / Branch: `main` / Folder: `/ (root)`
3. 수 분 후 `https://<username>.github.io/<repo-name>/` 로 접속 가능

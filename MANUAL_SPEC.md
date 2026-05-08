# Watame Song Player — 인터랙티브 매뉴얼 스펙

본 문서는 기존 `index.html`(또는 메인 페이지)에 **헬프 모드 오버레이**를 추가하기 위한 결과물 스펙이다. 별도 페이지를 만들지 않고, 현재 화면 위에 매뉴얼을 오버레이로 띄운다.

---

## 1. UX 동작 정의

### 1.1 진입 방법

- 페이지 우측 상단(또는 기존 `Manual Video [KR/JP]` 옆)에 **`?` 또는 `Help` 버튼** 추가
- 클릭 시 헬프 모드 ON
- `Esc` 키 또는 같은 버튼 재클릭 시 헬프 모드 OFF
- 헬프 모드 진입 시 URL 해시(`#help`) 반영 → 새로고침해도 유지, 공유 가능

### 1.2 헬프 모드 ON 상태

화면 위에 다음이 동시에 표시된다:

1. **반투명 오버레이** (`rgba(0,0,0,0.4)` 정도) — 단, 설명 대상 영역은 **하이라이트(spotlight)**되어 평소처럼 보임
2. **영역별 번호 마커** (`①②③...`) — 각 영역 좌상단에 부착
3. **현재 단계 말풍선** — 마커 옆에 짧은 한 줄 설명 + `자세히 / 다음 / 이전 / 닫기` 버튼
4. **언어 토글** (`KR / JP`) — 말풍선 우상단 또는 헬프 패널 헤더에 위치
5. **건너뛰기**(`Skip Tour`) 버튼 — 첫 진입 시에만 노출

### 1.3 두 가지 사용 흐름

헬프 모드 안에서 사용자는 두 방식을 자유롭게 섞어 쓸 수 있어야 한다:

- **투어 모드**: `다음` 버튼으로 단계를 따라 이동 (입문자용)
- **자유 탐색 모드**: 화면의 아무 마커나 클릭하면 해당 영역 설명으로 점프 (참고서 모드)

### 1.4 상세 팝오버

말풍선의 `자세히` 버튼 클릭 시:

- 모달이 아닌 **사이드 패널**이 우측에서 슬라이드 인
- 해당 영역의 상세 설명, 사용 예시, 관련 단축키 표시
- 패널 안에서 "관련 항목" 링크로 다른 섹션으로 점프 가능
- 패널은 헬프 모드를 끄지 않고 닫을 수 있음 (`X` 버튼 또는 `Esc`)

---

## 2. 매뉴얼 콘텐츠 구조

영역은 화면 레이아웃 순서대로 번호를 매긴다. 각 영역은 아래 스키마를 따른다:

```yaml
sections:
  - id: <고유 ID, 예: "topbar-data-toggles">
    selector: <CSS 셀렉터, 예: "header .data-toggles">
    order: <정수, 투어 순서>
    title:
      kr: <한국어 제목>
      jp: <일본어 제목>
    short:           # 말풍선용 한 줄 설명
      kr: <...>
      jp: <...>
    detail:          # 사이드 패널용 상세 설명 (Markdown)
      kr: |
        <마크다운 본문>
      jp: |
        <마크다운 본문>
    related:         # 다른 섹션 ID 목록
      - <id>
```

### 2.1 다뤄야 할 영역 (현재 UI 기준)

화면 스크린샷을 기반으로 최소 다음 영역을 커버해야 한다. **실제 소스코드 분석 후 누락 영역이 발견되면 추가한다.**

1. **상단 데이터 토글 바** — `Library / PlayList / ClipSpreadSheets / TestClipTime` 체크박스, `Manual Video KR/JP` 링크, `Export / Import` 버튼
2. **테이블 조작 버튼 바** — `ScrollTo, Select All, Clear All, Play, Open, Delete, Delete All, Move to front/back, Move up/down, Batch Edit, Shuffle, PlayAll`
3. **검색 바** — `Search`, `CaseInsensitive`
4. **현재 경로 표시줄** — `[MyList / ]` 같은 트리 위치 표시
5. **테이블 헤더 (컬럼별 의미)** — `Order, Type, Date, Track Name, Original Artist, Covered By, Category, ShufflePriority, Ordinal` 각 컬럼의 의미와 정렬/필터 동작
6. **테이블 본문 (행 상호작용)** — 더블클릭, 우클릭, 폴더 진입, 다중 선택 등
7. **재생 진행 슬라이더**
8. **재생 컨트롤** — 이전/재생/다음/셔플/반복 버튼
9. **볼륨 컨트롤** — `Volume`, `Individual` 슬라이더
10. **유튜브 임베드 영역**

### 2.2 개념 설명 섹션 (별도)

화면에 1:1 대응되지 않지만 반드시 필요한 **개념적 설명**도 매뉴얼에 포함되어야 한다. 사이드 패널에서만 접근 가능한 별도 섹션으로 둔다:

- **Library / PlayList / ClipSpreadSheets / TestClipTime의 차이** (가장 중요)
- **데이터 입출력 흐름** (Import → 편집 → Export 사이클)
- **ShufflePriority의 동작 원리**
- **클립 시간 형식과 TestClipTime의 용도**

### 2.3 콘텐츠 톤 가이드

- 한국어/일본어 모두 **존댓말**
- 한 문장은 짧게 (말풍선은 30자 이내, 상세 설명도 한 문단 4~5줄 이내)
- 버튼/메뉴 이름은 **원문 영문 그대로** + 옆에 의미 병기 (예: `Move to front (맨 앞으로)`)
- "이럴 때 씁니다" 형태의 **목적 기반 예시**를 최소 1개씩 포함

---

## 3. 기술 구현 요구사항

### 3.1 라이브러리 선정

**driver.js** 사용을 권장 (이유):

- Shepherd.js 대비 가볍고(약 10KB gzipped) 의존성이 적음
- Spotlight + 팝오버 + 키보드 네비게이션을 기본 제공
- CDN 1줄로 사용 가능: `https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.js.iife.js`
- 다국어 콘텐츠를 코드에서 동적으로 주입하기 쉬움

다만 driver.js의 기본 단계 진행 UX와 본 스펙의 "자유 탐색 + 사이드 패널 상세" 요구가 일부 충돌할 수 있다. 충돌 시 **driver.js는 spotlight + 마커 표시까지만 사용**하고, 말풍선과 사이드 패널은 자체 구현한다.

### 3.2 파일 구조

기존 소스가 HTML + JS 파일 분리 구조이므로 다음 신규 파일을 추가한다:

```
help/
  help-mode.js          # 헬프 모드 진입/종료, 상태 관리, 마커 렌더링
  help-content.js       # 섹션 데이터 (위 2.1, 2.2의 YAML을 JS 객체로)
  help-panel.js         # 사이드 패널 컴포넌트
  help-mode.css         # 오버레이/마커/패널 스타일
```

기존 `index.html`에는 다음만 추가:

```html
<link rel="stylesheet" href="help/help-mode.css">
<script src="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.js.iife.js"></script>
<script src="help/help-content.js" defer></script>
<script src="help/help-panel.js" defer></script>
<script src="help/help-mode.js" defer></script>
```

### 3.3 콘텐츠 데이터 분리

`help-content.js`는 **순수 데이터만** 담는다. 향후 비개발자도 매뉴얼 텍스트를 수정할 수 있도록:

```javascript
window.HELP_CONTENT = {
  sections: [
    {
      id: "topbar-data-toggles",
      selector: "header .data-toggles",
      order: 1,
      title: { kr: "데이터 보기 토글", jp: "データ表示の切り替え" },
      short: {
        kr: "어떤 종류의 데이터를 화면에 보여줄지 선택합니다.",
        jp: "..."
      },
      detail: {
        kr: "...(마크다운)...",
        jp: "...(마크다운)..."
      },
      related: ["concept-data-types"]
    },
    // ...
  ],
  concepts: [
    {
      id: "concept-data-types",
      title: { kr: "Library와 PlayList의 차이", jp: "..." },
      detail: { kr: "...", jp: "..." }
    }
  ]
};
```

### 3.4 셀렉터 안정성

각 섹션의 `selector`는 **현재 소스의 실제 DOM 구조**를 기반으로 작성한다. 단:

- ID 또는 `data-help` 속성이 있으면 우선 사용
- 없으면 클래스 + 구조 기반 셀렉터 사용
- **셀렉터를 안정화하기 위해 필요하면 원본 HTML에 `data-help="<id>"` 속성을 추가**해도 된다 (기능 영향 없음)

### 3.5 반응형 / 화면 크기

- 마커는 대상 요소가 뷰포트 밖에 있으면 자동으로 스크롤
- 화면이 좁을 때(모바일 등) 사이드 패널은 전체 폭 사용

### 3.6 접근성

- 모든 인터랙션은 키보드만으로 가능 (`Tab`, `Enter`, `Esc`, `←/→`)
- 마커와 말풍선에 적절한 `aria-label`, `role` 부여
- 헬프 모드 진입 시 포커스를 첫 마커로 이동, 종료 시 원래 위치로 복원

### 3.7 기존 기능 비침해

- 헬프 모드는 **기존 코드 한 줄도 수정하지 않는 것을 원칙**으로 한다
- 단, 위 3.4의 `data-help` 속성 추가는 예외 (안정성 확보 목적)
- 글로벌 변수 충돌을 막기 위해 모든 코드는 `WatameHelp` 네임스페이스 안에 둔다

---

## 4. 수락 기준 (Definition of Done)

- [ ] `?` 버튼 클릭으로 헬프 모드 진입/종료가 정상 동작
- [ ] 위 2.1의 10개 영역 모두 마커가 표시되고 설명이 노출됨
- [ ] 2.2의 개념 섹션 4개가 사이드 패널에서 접근 가능
- [ ] KR/JP 토글이 모든 텍스트에 적용됨
- [ ] `Esc` 키, 키보드 네비게이션 동작
- [ ] 헬프 모드 OFF 시 기존 기능에 어떤 부작용도 없음
- [ ] `#help` URL 해시로 진입 가능
- [ ] driver.js CDN이 차단된 환경에서도 폴백으로 최소 동작 (선택)

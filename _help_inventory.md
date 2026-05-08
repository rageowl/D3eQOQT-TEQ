# Source Inventory

## HTML
- `index.html` — 메인 페이지, 336줄. 모든 UI DOM 정의 + 스크립트 로드 순서 관리

## JS (로드 순서대로)
- `js/globals.js` — 전역 변수/상수 선언, 모바일 감지 유틸, `playState` 객체
- `js/utils.js` — 순수 유틸 함수 (시간 변환, base64, shuffle 등)
- `js/ui-base.js` — `DivBase`, `PopupMenu`, `PopupMenuItem` 클래스
- `js/multicolumn.js` — `MultiColumnList` 클래스 (정렬/필터/드래그앤드롭 지원 테이블 컴포넌트)
- `js/data-loader.js` — `readData()`, `settings_AddURL()`, Google Sheets 로딩 로직
- `js/playlist-data.js` — 재생목록 CRUD, localStorage 저장/로드 (`playList_save`, `volume_save` 등)
- `js/play-context.js` — 재생 컨텍스트 및 재생 순서 관리 (`playContext_get`, shuffle 로직)
- `js/playlist-playback.js` — YouTube IFrame 재생 제어, 플레이어 이벤트 핸들러
- `js/playlist-ui.js` — 동적 패널 생성/관리, 다이얼로그, 컨트롤 패널 갱신 (`refreshControlPanel`)
- `js/controls.js` — 재생 버튼, 볼륨, 검색 이벤트 핸들러
- `js/export-import.js` — `exportList()`, `importList()`, `TestClipTime_*` 함수
- `js/app-init.js` — `init()` 진입점, 테이블 헤더 정의, 컨텍스트 메뉴 초기화

## CSS
- `styles.css` — 전체 스타일 (테이블, 컨텍스트 메뉴 등)

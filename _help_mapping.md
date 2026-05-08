# UI ↔ Source Mapping

## 스펙 §2.1 — 10개 영역

| Section ID | UI 위치 (HTML) | 동작 구현 (JS) | 비고 |
|---|---|---|---|
| `topbar-controls` | `index.html` L23–31 (`<div style="flex:none">` 최상단) | `exportList()` / `importList()` in `export-import.js`; `updateDivVisible()` in `playlist-ui.js` | Export·Import 버튼 + 4개 체크박스 + Manual Video KR/JP 링크 |
| `tracklist-buttons` | `index.html` L98–122 (`#divPlaylistItemsControls`) | `trackListTable_*` in `controls.js`·`playlist-ui.js`; `playList_saveCheckboxes()` in `controls.js` | TrackList 조작 버튼 바: ScrollTo, Select All, Clear All, Play, Open, Delete, Delete All, Move to front/back, Move up/down, Batch Edit, Shuffle 체크박스, PlayAll 체크박스 |
| `search-bar` | Library: `index.html` L47–51; PlayList: L86–92; TrackList: L115–121 | `library_Search()`, `playListTable_Search()`, `trackListTable_Search()` in `controls.js`; `searchTotallist_onKeyUp()` 등 | 각 패널마다 별도 검색 인풋 + CaseInsensitive 체크박스; Enter 키로도 검색 실행 |
| `play-path` | `index.html` L126 (`<div id="divPlayPath">`) | `refreshControlPanel()` in `playlist-ui.js` L485–540 | 재생 중인 컨텍스트 스택을 `->` 구분자로 나열; 각 항목은 클릭 가능한 링크로 해당 뎁스로 점프; 선택한 재생목록은 반투명 이탤릭으로 끝에 표시 |
| `table-headers` | 헤더 정의: `app-init.js` L43–55 (Library), L85–104 (PlayList); `playlist-ui.js` L22–53 (TrackList/동적패널) | `MultiColumnList.setHeader()` in `multicolumn.js` | Library 컬럼: Ordinal, Date, Track Name, Original Artist, Covered By, Category, Start, End, Used, ID, Link, IndividualVolume / TrackList 컬럼: (재생표시), Order, Type, Date, Track Name, Original Artist, Covered By, Category, ShufflePriority, Ordinal |
| `table-body` | `#library` div (L64), `#playList` div (L95), `#dynamicPanelsRow` (L123) | Library: `ondblclick`→`library_playVideo()`, `oncontextmenu`→libraryContextMenu in `app-init.js`; PlayList: `ondblclick`→`playList_open()` in `app-init.js`; TrackList: `ondblclick`→`trackListTable_playOrOpen()` in `playlist-ui.js` | 더블클릭: 재생(Library) / 열기(PlayList·TrackList 폴더) / 재생(TrackList 클립); 우클릭: 컨텍스트 메뉴; Ctrl+드래그: 복사 이동; Delete 키: 삭제 |
| `progress-slider` | `index.html` L127 (`<input type="range" id="videoControl">`) | `videoControl_oninput()`, `videoControl_onchange()` in `controls.js`; 100ms 인터벌로 현재 재생 위치 갱신 in `playlist-playback.js` | 드래그로 재생 위치 이동; 재생 중 자동 갱신 |
| `playback-controls` | `index.html` L130–134 (`#prevButton`, `#playButton`, `#nextButton`, `#suffleButton`, `#modeButton`) | `prevButton_onClick()`, `playButton_onClick()`, `nextButton_onClick()`, `suffleButton_onClick()`, `modeButton_onClick()` in `controls.js` | 셔플: 현재 컨텍스트의 재생 순서를 섞음; 반복 모드 3단계: 반복없음(🔁흐림) → 전체반복(🔁불투명) → 한곡반복(🔂) |
| `volume-controls` | `index.html` L136–151 (`#volumeControl`, `#individualVolumeControl`, `#individualVolume` 체크박스) | `volumeControl_oninput/onchange/onWheel()`, `individualVolumeControl_*()`, `individualVolume_onClick()` in `controls.js` | 마우스 휠로도 볼륨 조절 가능; Individual 체크 시 현재 클립에 개별 볼륨 오프셋 적용; 개별 볼륨은 `individualVolumeMap`(Map)에 저장 → localStorage |
| `youtube-embed` | `index.html` L171–173 (`#divPlayer`, `#player`) | `onYouTubeIframeAPIReady()`, `playVideo()`, `onPlayerStateChange()` in `playlist-playback.js` | 일부 영상은 임베드 불가(`restricted`) → 팝업 창으로 대체 재생; `onError` (101·150·153)로 자동 감지 |

---

## 추가 발견 영역 (스펙 §2.1 외)

아래 영역은 스펙에 명시되지 않았으나 별도 설명이 필요합니다. **사용자 승인 후 추가 여부를 결정합니다.**

| 제안 Section ID | UI 위치 | 설명 |
|---|---|---|
| `library-panel` | `index.html` L41–66 (`#divLibrary`) | Library 전용 버튼 바: Play, Select All, Clear All, Batch Edit, Add selected clips to TrackList, Make PlayList, Make Grouped PlayList. Library 체크박스를 켜야만 표시됨 |
| `playlist-panel` | `index.html` L67–97 (`#divPlaylistPanel`) | PlayList 테이블 + 전용 버튼 바: Open, Select All, Clear All, New, Edit, Clone, Batch Edit, Delete, Delete All, Move to front/back/up/down, Add selected to TrackList. PlayList 체크박스를 켜야 표시됨 |
| `dynamic-panels` | `index.html` L123 (`#dynamicPanelsRow`) | 재생목록을 열면 생기는 동적 패널. 여러 패널을 나란히 열 수 있음; 활성 패널은 파란 테두리; 패널 타이틀 바에 현재 뎁스 경로 표시; ✕ 버튼으로 닫기 |
| `spreadsheet-settings` | `index.html` L32–39 (`#divClipSpreadSheet`) | Google Sheets URL 입력란: Save&Refresh로 데이터 다시 로드, New로 URL 추가, OpenSheet로 브라우저에서 열기, Delete로 URL 제거. ClipSpreadSheets 체크박스를 켜야 표시됨 |
| `current-song-display` | `index.html` L152–156 (`#currentSong`, `#currentOrder`) | 현재 재생 중인 트랙명 / 아티스트 + 재생 순서 `(n / total)` 표시. `refreshControlPanel()` in `playlist-ui.js` |
| `context-menus` | 런타임 생성, `app-init.js` | Library·PlayList·TrackList 각각 우클릭 컨텍스트 메뉴. 서브메뉴 포함(Playlist Task, PlayOrder Task). 특히 TrackList는 PlayOrder Task(Shuffle/Reorder Selection, Move to front/back) 제공 |

---

## 단축키 / 숨겨진 기능 발견 목록

| 기능 | 트리거 | 구현 위치 |
|---|---|---|
| Enter 키 — Library에서 TrackList에 추가 | Library에 포커스 + Enter | `app-init.js` L67 (`onkeydown`) |
| Enter 키 — PlayList 선택 항목을 TrackList에 추가 | PlayList에 포커스 + Enter | `app-init.js` L122 |
| Delete 키 — PlayList/TrackList 선택 삭제 | 해당 테이블 포커스 + Delete | `app-init.js` L119; `playlist-ui.js` L59 |
| Ctrl+C — 선택 행을 클립보드에 복사 | 테이블 포커스 + Ctrl+C | `app-init.js` L70, L123 |
| 마우스 휠 — 볼륨 조절 | 볼륨 슬라이더 위 휠 | `controls.js` L413, L443 |
| 드래그앤드롭 — Library→PlayList/TrackList | 클립 드래그 | `app-init.js`, `playlist-ui.js` |
| CopyToClipboard 다이얼로그 | 우클릭 메뉴 → CopyToClipboard | `playlist-ui.js` L586 |
| PlayOrder Task — 선택 항목만 셔플/재정렬 | TrackList 우클릭 → PlayOrder Task | `app-init.js` L436–603 |
| 임베드 불가 영상 자동 팝업 재생 | 재생 오류(101/150/153) 자동 감지 | `playlist-playback.js` L325 |

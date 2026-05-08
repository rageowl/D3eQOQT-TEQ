# data-help 속성 추가 목록

롤백 시 아래 속성을 index.html에서 제거하면 됩니다.

| 속성값 | 추가된 요소 원래 HTML | 라인(참고) |
|---|---|---|
| `topbar-controls` | `<div style="flex:none">` | ~23 |
| `search-bar` | `<div style="flex:none;display:flex">` (Library 검색 영역) | ~43 |
| `playback-controls` | `<div style="display:flex;">` (재생 버튼 row) | ~129 |
| `volume-controls` | `<div style="padding-left: 4px;display: flex;">` (볼륨 row) | ~136 |
| `current-song-display` | `<div>` (currentSong, currentOrder 포함) | ~152 |

## 동적 셀렉터 (data-help 불필요, CSS 클래스 사용)

| Section ID | 셀렉터 | 비고 |
|---|---|---|
| `table-headers` | `#library .userTblHead` | MultiColumnList가 init() 후 생성 |
| `table-body` | `#library .userTbl` | MultiColumnList가 init() 후 생성 |
| `context-menus` | `#divPlaylistItemsControls` | 우클릭 메뉴는 런타임 생성, 대표 영역 사용 |

## 기존 ID 사용 (추가 없음)

`#divClipSpreadSheet`, `#divLibrary`, `#divPlaylistPanel`, `#dynamicPanelsRow`,
`#divPlaylistItemsControls`, `#divPlayPath`, `#videoControl`, `#divPlayer`

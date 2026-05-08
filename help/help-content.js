// help-content.js — 인터랙티브 매뉴얼 콘텐츠 데이터
// 비개발자도 이 파일의 텍스트를 수정할 수 있습니다.
// selector 값은 _help_data_attrs.md 참고.

window.HELP_CONTENT = {

  sections: [

    // ──────────────────────────────────────────────────────────────
    // 1. 상단 컨트롤 바
    // ──────────────────────────────────────────────────────────────
    {
      id: 'topbar-controls',
      selector: '[data-help="topbar-controls"]',
      order: 1,
      title: {
        kr: '상단 컨트롤 바',
        jp: 'トップコントロールバー',
      },
      short: {
        kr: 'Export·Import와 화면 표시 패널을 설정합니다.',
        jp: 'Export·Importと表示パネルを設定します。',
      },
      detail: {
        kr: `### 무엇인가요
화면 최상단 바입니다. 데이터를 내보내거나 가져오고, 어떤 패널을 화면에 표시할지 선택합니다.

### 어떻게 쓰나요
- **Export** — 현재 재생목록·볼륨·설정을 압축하여 텍스트로 내보냅니다. 나타나는 텍스트를 복사해 백업하세요.
- **Import** — Export로 저장한 텍스트를 붙여넣으면 데이터를 복원합니다.
- **Library** 체크박스 — Library(곡 목록) 패널 표시 여부를 전환합니다.
- **PlayList** 체크박스 — PlayList(재생목록) 패널 표시 여부를 전환합니다.
- **ClipSpreadSheets** 체크박스 — Google Sheets URL 설정 패널을 표시합니다.
- **TestClipTime** 체크박스 — 클립 구간(시작·끝) 테스트 패널을 표시합니다.
- **Manual Video KR / JP** — 공식 사용법 동영상을 새 탭에서 엽니다.

### 이럴 때 씁니다
- 다른 기기로 재생목록을 옮기고 싶을 때: Export → 텍스트 복사 → 새 기기에서 Import
- 화면이 복잡할 때: 필요한 패널만 체크박스로 켜고 나머지는 끕니다.

### 함께 보기
- spreadsheet-settings (ClipSpreadSheets 설정)
- concept-data-flow (데이터 입출력 흐름)`,

        jp: `### 何ですか
画面最上部のバーです。データのエクスポート・インポートと、表示するパネルの切り替えができます。

### 使い方
- **Export** — 現在の再生リスト・ボリューム・設定を圧縮してテキスト出力します。テキストをコピーしてバックアップしてください。
- **Import** — Exportで保存したテキストを貼り付けるとデータを復元します。
- **Library** チェックボックス — Library（曲一覧）パネルの表示を切り替えます。
- **PlayList** チェックボックス — PlayList（再生リスト）パネルの表示を切り替えます。
- **ClipSpreadSheets** チェックボックス — Google SheetsのURL設定パネルを表示します。
- **TestClipTime** チェックボックス — クリップ区間（開始・終了）のテストパネルを表示します。
- **Manual Video KR / JP** — 公式操作動画を新しいタブで開きます。

### こんな時に使います
- 別のデバイスに再生リストを移したい時：Export → テキストをコピー → 新しいデバイスでImport
- 画面が複雑な時：必要なパネルだけチェックし、他はオフにします。

### 関連項目
- spreadsheet-settings（ClipSpreadSheets設定）
- concept-data-flow（データ入出力フロー）`,
      },
      related: ['spreadsheet-settings', 'concept-data-flow'],
    },

    // ──────────────────────────────────────────────────────────────
    // 2. ClipSpreadSheets 설정
    // ──────────────────────────────────────────────────────────────
    {
      id: 'spreadsheet-settings',
      selector: '#divClipSpreadSheet',
      order: 2,
      title: {
        kr: 'ClipSpreadSheets 설정',
        jp: 'ClipSpreadSheets 設定',
      },
      short: {
        kr: '곡 데이터 소스인 Google Sheets URL을 관리합니다.',
        jp: '曲データのGoogle SheetsのURLを管理します。',
      },
      detail: {
        kr: `### 무엇인가요
Library에 표시되는 곡 목록은 Google Sheets에서 불러옵니다. 이 패널에서 어떤 스프레드시트를 사용할지 URL로 지정합니다.

### 어떻게 쓰나요
1. **ClipSpreadSheets** 체크박스를 켜서 패널을 엽니다.
2. 텍스트 입력란에 Google Sheets의 **스프레드시트 ID** (URL 중 \`/d/\` 뒤 부분)를 입력합니다.
3. **Save&Refresh** 버튼을 누르면 설정이 저장되고 곡 목록이 다시 불러와집니다.
4. **New** 버튼으로 여러 스프레드시트를 추가할 수 있습니다 (여러 시트의 곡을 합칩니다).
5. **OpenSheet** 버튼으로 해당 스프레드시트를 브라우저에서 바로 열 수 있습니다.
6. **Delete** 버튼으로 URL 입력란을 제거합니다.

### 이럴 때 씁니다
- 기본 제공된 스프레드시트 외에 직접 만든 곡 목록 시트를 추가하고 싶을 때

### 함께 보기
- topbar-controls (상단 컨트롤 바)
- concept-data-types (데이터 종류 개념 설명)`,

        jp: `### 何ですか
Libraryに表示される曲一覧はGoogle Sheetsから読み込みます。このパネルで使用するスプレッドシートをURLで指定します。

### 使い方
1. **ClipSpreadSheets**チェックボックスをオンにしてパネルを開きます。
2. テキスト入力欄にGoogle Sheetsの**スプレッドシートID**（URLの\`/d/\`以降の部分）を入力します。
3. **Save&Refresh**ボタンを押すと設定が保存され、曲一覧が再読み込みされます。
4. **New**ボタンで複数のスプレッドシートを追加できます（複数シートの曲を統合します）。
5. **OpenSheet**ボタンでそのスプレッドシートをブラウザで直接開けます。
6. **Delete**ボタンでURL入力欄を削除します。

### こんな時に使います
- デフォルト以外に自分で作った曲一覧シートを追加したい時

### 関連項目
- topbar-controls（トップコントロールバー）
- concept-data-types（データ種類の概念説明）`,
      },
      related: ['topbar-controls', 'concept-data-types'],
    },

    // ──────────────────────────────────────────────────────────────
    // 3. Library 패널
    // ──────────────────────────────────────────────────────────────
    {
      id: 'library-panel',
      selector: '#divLibrary',
      order: 3,
      title: {
        kr: 'Library 패널',
        jp: 'Libraryパネル',
      },
      short: {
        kr: 'Google Sheets에서 불러온 전체 곡 목록입니다.',
        jp: 'Google Sheetsから読み込んだ全曲一覧です。',
      },
      detail: {
        kr: `### 무엇인가요
Google Sheets에서 불러온 읽기 전용 곡(클립) 목록입니다. Library 체크박스를 켜야 표시됩니다.

### 버튼 설명
- **Play** — 선택한 클립을 바로 재생합니다.
- **Select All / Clear All** — 전체 선택 또는 선택 해제합니다.
- **Batch Edit** — 선택한 클립들의 Individual Volume(개별 볼륨 오프셋)을 일괄 설정합니다.
- **Add selected clips to TrackList** — 선택한 클립을 현재 열린 TrackList에 추가합니다.
- **Make PlayList with selected clips** — 선택한 클립으로 새 PlayList를 만듭니다.
- **Make Grouped PlayList with selected clips** — 선택한 클립을 카테고리·날짜·곡명 등 기준으로 자동 분류하여 여러 PlayList를 한꺼번에 만듭니다.

### 이럴 때 씁니다
- 원하는 곡을 검색한 뒤 TrackList에 추가해 재생 대기열을 구성할 때
- 아티스트별·카테고리별로 자동 분류된 PlayList를 빠르게 만들 때

### 함께 보기
- search-bar (검색 바)
- playlist-panel (PlayList 패널)
- concept-data-types (Library와 PlayList의 차이)`,

        jp: `### 何ですか
Google Sheetsから読み込んだ読み取り専用の曲（クリップ）一覧です。Libraryチェックボックスをオンにすると表示されます。

### ボタン説明
- **Play** — 選択したクリップをすぐに再生します。
- **Select All / Clear All** — 全選択または選択解除します。
- **Batch Edit** — 選択したクリップのIndividual Volume（個別ボリュームオフセット）を一括設定します。
- **Add selected clips to TrackList** — 選択したクリップを現在開いているTrackListに追加します。
- **Make PlayList with selected clips** — 選択したクリップで新しいPlayListを作成します。
- **Make Grouped PlayList with selected clips** — 選択したクリップをカテゴリ・日付・曲名などで自動分類し、複数のPlayListをまとめて作成します。

### こんな時に使います
- 曲を検索してTrackListに追加し、再生キューを組む時
- アーティスト別・カテゴリ別に自動分類されたPlayListを素早く作りたい時

### 関連項目
- search-bar（検索バー）
- playlist-panel（PlayListパネル）
- concept-data-types（LibraryとPlayListの違い）`,
      },
      related: ['search-bar', 'playlist-panel', 'concept-data-types'],
    },

    // ──────────────────────────────────────────────────────────────
    // 4. 검색 바
    // ──────────────────────────────────────────────────────────────
    {
      id: 'search-bar',
      selector: '[data-help="search-bar"]',
      order: 4,
      title: {
        kr: '검색 바',
        jp: '検索バー',
      },
      short: {
        kr: '각 패널에서 곡이나 재생목록을 검색합니다.',
        jp: '各パネルで曲や再生リストを検索します。',
      },
      detail: {
        kr: `### 무엇인가요
Library·PlayList·TrackList 각 패널에는 전용 검색 바가 있습니다. 입력한 텍스트로 표시 행을 실시간으로 필터링합니다.

### 어떻게 쓰나요
1. 검색 입력창에 키워드를 입력합니다.
2. **Search** 버튼을 클릭하거나 **Enter** 키를 누릅니다.
3. **CaseInsensitive** 체크박스가 켜져 있으면 대소문자를 무시하고 검색합니다 (기본 켜짐).
4. 검색어를 지우고 Search를 다시 누르면 필터가 해제됩니다.

### 검색 대상 컬럼
Library: Category, Date, Track Name, Original Artist, Covered By
PlayList: Category, Date, Track Name, Original Artist, Covered By
TrackList: 포함된 항목의 동일 컬럼들

### 이럴 때 씁니다
- 특정 아티스트의 곡만 보고 싶을 때
- 곡명의 일부만 기억날 때

### 함께 보기
- library-panel (Library 패널)
- table-body (테이블 본문 상호작용)`,

        jp: `### 何ですか
Library・PlayList・TrackList各パネルに専用の検索バーがあります。入力したテキストで表示行をリアルタイムにフィルタリングします。

### 使い方
1. 検索入力欄にキーワードを入力します。
2. **Search**ボタンをクリックするか**Enter**キーを押します。
3. **CaseInsensitive**チェックボックスがオンなら大文字小文字を無視して検索します（デフォルトでオン）。
4. 検索語を消してSearchをもう一度押すとフィルターが解除されます。

### 検索対象カラム
Library: Category, Date, Track Name, Original Artist, Covered By
PlayList: Category, Date, Track Name, Original Artist, Covered By
TrackList: 含まれる項目の同じカラム

### こんな時に使います
- 特定アーティストの曲だけ表示したい時
- 曲名の一部しか覚えていない時

### 関連項目
- library-panel（Libraryパネル）
- table-body（テーブル本文の操作）`,
      },
      related: ['library-panel', 'table-body'],
    },

    // ──────────────────────────────────────────────────────────────
    // 5. 테이블 헤더
    // ──────────────────────────────────────────────────────────────
    {
      id: 'table-headers',
      selector: '#library .userTblHead',
      order: 5,
      title: {
        kr: '테이블 헤더 (컬럼 의미)',
        jp: 'テーブルヘッダー（カラムの意味）',
      },
      short: {
        kr: '헤더 클릭으로 정렬, 우클릭으로 필터를 사용합니다.',
        jp: 'ヘッダークリックで並び替え、右クリックでフィルター。',
      },
      detail: {
        kr: `### 컬럼 의미 — Library
| 컬럼 | 의미 |
|---|---|
| Ordinal | Google Sheets에서의 원래 순번 |
| Date | 방송 날짜 |
| Track Name | 곡명 |
| Original Artist | 원곡 가수 |
| Covered By | 커버 가수 |
| Category | 카테고리 (방송 제목 등) |
| Start / End | 유튜브 영상 내 클립 구간 (HH:MM:SS) |
| Used | 이 클립이 포함된 PlayList 수 |
| ID | YouTube 영상 ID |
| Link | YouTube 링크 |
| IndividualVolume | 이 클립의 개별 볼륨 오프셋 |

### 컬럼 의미 — TrackList (동적 패널)
| 컬럼 | 의미 |
|---|---|
| (▶ 표시) | 현재 재생 중인 항목 표시 |
| Order | 현재 재생 순서 (섞인 경우 바뀜) |
| Type | 🎶 = 클립, 📁 = 하위 재생목록 |
| Date / Track Name 등 | Library와 동일 |
| ShufflePriority | 셔플 시 우선순위 (높을수록 앞에 배치) |
| Ordinal | 포함된 첫 번째 클립의 순번 |

### 헤더 조작
- **클릭** — 해당 컬럼 기준으로 오름차순/내림차순 정렬
- **우클릭** — 해당 컬럼에 필터 값 입력 (특정 값만 표시)

### 이럴 때 씁니다
- 날짜 순으로 정렬해 최신 방송 곡을 먼저 보고 싶을 때
- 특정 카테고리의 곡만 필터링하고 싶을 때`,

        jp: `### カラムの意味 — Library
| カラム | 意味 |
|---|---|
| Ordinal | Google Sheetsでの元の通し番号 |
| Date | 配信日 |
| Track Name | 曲名 |
| Original Artist | 原曲アーティスト |
| Covered By | カバーアーティスト |
| Category | カテゴリ（配信タイトルなど） |
| Start / End | YouTube動画内のクリップ区間（HH:MM:SS） |
| Used | このクリップが含まれるPlayList数 |
| ID | YouTube動画ID |
| Link | YouTubeリンク |
| IndividualVolume | このクリップの個別ボリュームオフセット |

### カラムの意味 — TrackList（動的パネル）
| カラム | 意味 |
|---|---|
| （▶表示） | 現在再生中の項目を示す |
| Order | 現在の再生順序（シャッフル時は変わる） |
| Type | 🎶 = クリップ、📁 = サブ再生リスト |
| Date / Track Name など | Libraryと同じ |
| ShufflePriority | シャッフル時の優先度（高いほど前に配置） |
| Ordinal | 含まれる最初のクリップの通し番号 |

### ヘッダー操作
- **クリック** — そのカラムで昇順/降順ソート
- **右クリック** — そのカラムにフィルター値を入力（特定値のみ表示）

### こんな時に使います
- 日付順にソートして最新配信の曲を先に見たい時
- 特定カテゴリの曲だけフィルタリングしたい時`,
      },
      related: ['table-body', 'concept-shuffle-priority'],
    },

    // ──────────────────────────────────────────────────────────────
    // 6. 테이블 본문 상호작용
    // ──────────────────────────────────────────────────────────────
    {
      id: 'table-body',
      selector: '#library .userTbl',
      order: 6,
      title: {
        kr: '테이블 본문 상호작용',
        jp: 'テーブル本文の操作',
      },
      short: {
        kr: '더블클릭·우클릭·드래그로 곡을 조작합니다.',
        jp: 'ダブルクリック・右クリック・ドラッグで曲を操作。',
      },
      detail: {
        kr: `### 클릭 조작
- **클릭** — 행 선택
- **더블클릭 (Library)** — 해당 클립 바로 재생
- **더블클릭 (PlayList)** — 해당 PlayList를 TrackList로 열기
- **더블클릭 (TrackList - 클립 🎶)** — 해당 클립 재생
- **더블클릭 (TrackList - 폴더 📁)** — 하위 PlayList로 진입

### 키보드 조작
| 단축키 | 동작 |
|---|---|
| Enter (Library 포커스) | 선택 클립을 TrackList에 추가 |
| Enter (PlayList 포커스) | 선택 항목을 TrackList에 추가 |
| Delete (PlayList/TrackList) | 선택 항목 삭제 |
| Ctrl+C | 선택 행 데이터를 클립보드에 복사 |

### 드래그앤드롭
- **Library → TrackList** — 클립 추가
- **Library → PlayList** — 클립 추가
- **TrackList 내부** — 순서 재정렬
- **TrackList → 다른 동적 패널** — 클립 복사 추가
- **PlayList 항목 → PlayList** — 순서 재정렬

### 이럴 때 씁니다
- Library에서 원하는 곡을 TrackList로 드래그해 즉석 재생 대기열을 만들 때
- TrackList에서 드래그로 재생 순서를 바꿀 때`,

        jp: `### クリック操作
- **クリック** — 行を選択
- **ダブルクリック（Library）** — そのクリップをすぐに再生
- **ダブルクリック（PlayList）** — そのPlayListをTrackListとして開く
- **ダブルクリック（TrackList - クリップ🎶）** — そのクリップを再生
- **ダブルクリック（TrackList - フォルダ📁）** — サブPlayListに入る

### キーボード操作
| ショートカット | 動作 |
|---|---|
| Enter（Libraryフォーカス） | 選択クリップをTrackListに追加 |
| Enter（PlayListフォーカス） | 選択項目をTrackListに追加 |
| Delete（PlayList/TrackList） | 選択項目を削除 |
| Ctrl+C | 選択行データをクリップボードにコピー |

### ドラッグ＆ドロップ
- **Library → TrackList** — クリップを追加
- **Library → PlayList** — クリップを追加
- **TrackList内** — 順序を並び替え
- **TrackList → 別の動的パネル** — クリップをコピー追加
- **PlayList項目 → PlayList** — 順序を並び替え

### こんな時に使います
- Libraryから曲をTrackListにドラッグして即席の再生キューを作る時
- TrackListでドラッグして再生順序を変える時`,
      },
      related: ['table-headers', 'context-menus', 'tracklist-buttons'],
    },

    // ──────────────────────────────────────────────────────────────
    // 7. PlayList 패널
    // ──────────────────────────────────────────────────────────────
    {
      id: 'playlist-panel',
      selector: '#divPlaylistPanel',
      order: 7,
      title: {
        kr: 'PlayList 패널',
        jp: 'PlayListパネル',
      },
      short: {
        kr: '사용자가 만든 재생목록을 관리합니다.',
        jp: 'ユーザーが作成した再生リストを管理します。',
      },
      detail: {
        kr: `### 무엇인가요
사용자가 직접 만들고 편집할 수 있는 재생목록(PlayList) 목록입니다. PlayList 체크박스를 켜야 표시됩니다.

### 버튼 설명
- **Open** — 선택한 PlayList를 TrackList(동적 패널)로 엽니다.
- **Select All / Clear All** — 전체 선택 또는 선택 해제합니다.
- **New** — 새 빈 PlayList를 만듭니다. 이름·날짜·카테고리 등을 입력하는 다이얼로그가 열립니다.
- **Edit** — 선택한 PlayList의 속성을 수정합니다.
- **Clone** — 선택한 PlayList를 복제하여 새 PlayList를 만듭니다.
- **Batch Edit** — 선택한 여러 PlayList의 Shuffle·PlayAll 설정을 일괄 변경합니다.
- **Delete / Delete All** — 선택 항목 또는 전체를 삭제합니다.
- **Move to front/back/up/down** — 목록 내 순서를 이동합니다.
- **Add selected to TrackList** — 선택한 PlayList를 현재 TrackList에 폴더 항목으로 추가합니다.

### 이럴 때 씁니다
- 테마별·날짜별 재생목록을 직접 구성하고 관리할 때
- 기존 PlayList를 복제해 비슷한 목록을 빠르게 만들 때

### 함께 보기
- dynamic-panels (동적 패널)
- tracklist-buttons (TrackList 버튼 바)
- concept-data-types (Library와 PlayList의 차이)`,

        jp: `### 何ですか
ユーザーが自分で作成・編集できる再生リスト（PlayList）の一覧です。PlayListチェックボックスをオンにすると表示されます。

### ボタン説明
- **Open** — 選択したPlayListをTrackList（動的パネル）として開きます。
- **Select All / Clear All** — 全選択または選択解除します。
- **New** — 新しい空のPlayListを作成します。名前・日付・カテゴリなどを入力するダイアログが開きます。
- **Edit** — 選択したPlayListのプロパティを編集します。
- **Clone** — 選択したPlayListを複製して新しいPlayListを作成します。
- **Batch Edit** — 選択した複数のPlayListのShuffle・PlayAll設定を一括変更します。
- **Delete / Delete All** — 選択項目または全件を削除します。
- **Move to front/back/up/down** — 一覧内の順序を移動します。
- **Add selected to TrackList** — 選択したPlayListを現在のTrackListにフォルダ項目として追加します。

### こんな時に使います
- テーマ別・日付別の再生リストを自分で構成・管理する時
- 既存のPlayListを複製して似たリストを素早く作りたい時

### 関連項目
- dynamic-panels（動的パネル）
- tracklist-buttons（TrackListボタンバー）
- concept-data-types（LibraryとPlayListの違い）`,
      },
      related: ['dynamic-panels', 'tracklist-buttons', 'concept-data-types'],
    },

    // ──────────────────────────────────────────────────────────────
    // 8. 동적 패널 (TrackList 패널)
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dynamic-panels',
      selector: '#dynamicPanelsRow',
      order: 8,
      title: {
        kr: '동적 패널 (TrackList)',
        jp: '動的パネル（TrackList）',
      },
      short: {
        kr: '열린 재생목록의 내용을 나란히 보여주는 패널입니다.',
        jp: '開いた再生リストの内容を並べて表示するパネルです。',
      },
      detail: {
        kr: `### 무엇인가요
PlayList를 열면 그 내용을 보여주는 패널이 이 영역에 생성됩니다. 여러 패널을 동시에 열어 나란히 볼 수 있습니다.

### 패널 구성
- **타이틀 바** — 현재 보고 있는 경로가 \`[목록명 / 아티스트]\` 형식으로 표시됩니다. 링크를 클릭하면 해당 뎁스로 이동합니다.
- **✕ 버튼** — 해당 패널을 닫습니다.
- **활성 패널** — 파란 테두리로 표시됩니다. 클릭하면 활성 패널이 전환됩니다.

### 폴더 진입 (중첩 재생목록)
TrackList 안에 📁 폴더(하위 PlayList)가 있으면 더블클릭으로 들어갈 수 있습니다. 경로 표시가 깊어지며 뒤로 가려면 타이틀 바의 상위 링크를 클릭합니다.

### 다중 패널
- PlayList에서 우클릭 → **Open in New Panel** 로 새 패널을 추가합니다.
- 각 패널은 독립적인 뷰를 가집니다.

### 이럴 때 씁니다
- 두 개의 PlayList를 비교하거나 한쪽에서 다른 쪽으로 항목을 드래그할 때

### 함께 보기
- playlist-panel (PlayList 패널)
- tracklist-buttons (TrackList 버튼 바)
- play-path (재생 경로 표시)`,

        jp: `### 何ですか
PlayListを開くと、その内容を表示するパネルがこの領域に生成されます。複数のパネルを同時に開いて並べて表示できます。

### パネルの構成
- **タイトルバー** — 現在表示しているパスが\`[リスト名 / アーティスト]\`形式で表示されます。リンクをクリックするとそのレベルに移動します。
- **✕ボタン** — そのパネルを閉じます。
- **アクティブパネル** — 青い枠線で表示されます。クリックするとアクティブパネルが切り替わります。

### フォルダに入る（ネスト再生リスト）
TrackList内に📁フォルダ（サブPlayList）がある場合、ダブルクリックで入れます。パスが深くなり、戻るにはタイトルバーの上位リンクをクリックします。

### 複数パネル
- PlayListを右クリック → **Open in New Panel** で新しいパネルを追加します。
- 各パネルは独立したビューを持ちます。

### こんな時に使います
- 2つのPlayListを比較したり、一方から他方へ項目をドラッグする時

### 関連項目
- playlist-panel（PlayListパネル）
- tracklist-buttons（TrackListボタンバー）
- play-path（再生パス表示）`,
      },
      related: ['playlist-panel', 'tracklist-buttons', 'play-path'],
    },

    // ──────────────────────────────────────────────────────────────
    // 9. TrackList 버튼 바
    // ──────────────────────────────────────────────────────────────
    {
      id: 'tracklist-buttons',
      selector: '#divPlaylistItemsControls',
      order: 9,
      title: {
        kr: 'TrackList 버튼 바',
        jp: 'TrackListボタンバー',
      },
      short: {
        kr: '현재 열린 TrackList의 항목을 조작하는 버튼들입니다.',
        jp: '現在開いているTrackListの項目を操作するボタンです。',
      },
      detail: {
        kr: `### 무엇인가요
동적 패널에서 열린 TrackList(재생 목록 내용)를 조작하는 버튼 바입니다.

### 버튼 설명
- **ScrollTo** — 현재 재생 중인 항목으로 자동 스크롤합니다.
- **Select All / Clear All** — 전체 선택 또는 선택 해제합니다.
- **Play** — 선택한 항목부터 재생을 시작합니다.
- **Open** — 선택한 항목이 폴더(📁)면 열고, 클립(🎶)이면 선택 상태만 유지합니다.
- **Delete** — 선택한 항목을 TrackList에서 제거합니다 (PlayList 원본은 유지).
- **Delete All** — TrackList의 모든 항목을 제거합니다.
- **Move to front / Move to back** — 선택한 항목을 목록 맨 앞 또는 맨 뒤로 이동합니다.
- **Move up / Move down** — 선택한 항목을 한 칸 위 또는 아래로 이동합니다.
- **Batch Edit** — 선택한 항목의 **ShufflePriority**(셔플 우선순위)를 일괄 설정합니다.
- **Shuffle** 체크박스 — 현재 TrackList의 재생 순서를 섞습니다. 해제하면 원래 순서로 돌아옵니다.
- **PlayAll** 체크박스 — 켜면 폴더(📁) 항목도 연속으로 재생합니다. 끄면 폴더를 건너뜁니다.

### 이럴 때 씁니다
- 재생 중 현재 곡이 어디 있는지 보고 싶을 때: ScrollTo
- 셔플로 들으려면: Shuffle 체크박스를 켭니다.

### 함께 보기
- dynamic-panels (동적 패널)
- concept-shuffle-priority (ShufflePriority 동작 원리)`,

        jp: `### 何ですか
動的パネルで開いたTrackList（再生リストの内容）を操作するボタンバーです。

### ボタン説明
- **ScrollTo** — 現在再生中の項目へ自動スクロールします。
- **Select All / Clear All** — 全選択または選択解除します。
- **Play** — 選択した項目から再生を開始します。
- **Open** — 選択項目がフォルダ（📁）なら開き、クリップ（🎶）なら選択状態のままにします。
- **Delete** — 選択した項目をTrackListから削除します（PlayList本体は維持）。
- **Delete All** — TrackListの全項目を削除します。
- **Move to front / Move to back** — 選択した項目を一覧の先頭または末尾に移動します。
- **Move up / Move down** — 選択した項目を1つ上または下に移動します。
- **Batch Edit** — 選択した項目の**ShufflePriority**（シャッフル優先度）を一括設定します。
- **Shuffle**チェックボックス — 現在のTrackListの再生順序をシャッフルします。解除すると元の順序に戻ります。
- **PlayAll**チェックボックス — オンにするとフォルダ（📁）項目も連続再生します。オフにするとフォルダをスキップします。

### こんな時に使います
- 再生中に現在の曲がどこにあるか確認したい時：ScrollTo
- シャッフル再生したい時：Shuffleチェックボックスをオンにします。

### 関連項目
- dynamic-panels（動的パネル）
- concept-shuffle-priority（ShufflePriorityの動作原理）`,
      },
      related: ['dynamic-panels', 'concept-shuffle-priority'],
    },

    // ──────────────────────────────────────────────────────────────
    // 10. 재생 경로 표시줄
    // ──────────────────────────────────────────────────────────────
    {
      id: 'play-path',
      selector: '#divPlayPath',
      order: 10,
      title: {
        kr: '재생 경로 표시줄',
        jp: '再生パス表示バー',
      },
      short: {
        kr: '현재 재생 중인 재생목록의 경로를 보여줍니다.',
        jp: '現在再生中の再生リストのパスを表示します。',
      },
      detail: {
        kr: `### 무엇인가요
현재 재생 중인 재생목록의 계층 경로를 \`[목록명 / 아티스트] -> [하위목록명 / 아티스트]\` 형식으로 표시합니다.

### 동작 설명
- 경로의 각 항목은 **클릭 가능한 링크**입니다. 클릭하면 해당 재생목록의 뷰로 돌아갑니다.
- **반투명 이탤릭체**로 표시된 항목은 현재 선택(보고 있는)한 재생목록으로, 아직 재생 중이 아닙니다. 클릭하면 해당 목록을 TrackList로 엽니다.
- 중첩 재생목록 안에서 재생 중일 때 경로가 여러 단계로 표시됩니다.

### 이럴 때 씁니다
- 중첩된 PlayList 안에서 재생 중일 때 어느 위치에 있는지 확인할 때
- 클릭으로 상위 목록 뷰로 빠르게 이동할 때

### 함께 보기
- dynamic-panels (동적 패널)
- playback-controls (재생 컨트롤)`,

        jp: `### 何ですか
現在再生中の再生リストの階層パスを\`[リスト名 / アーティスト] -> [サブリスト名 / アーティスト]\`形式で表示します。

### 動作説明
- パスの各項目は**クリック可能なリンク**です。クリックするとその再生リストのビューに戻ります。
- **半透明のイタリック体**で表示された項目は現在選択（表示）中の再生リストで、まだ再生中ではありません。クリックするとそのリストをTrackListとして開きます。
- ネストされた再生リスト内で再生中の場合、パスが複数段階で表示されます。

### こんな時に使います
- ネストされたPlayList内で再生中にどこにいるか確認する時
- クリックで上位リストのビューに素早く移動する時

### 関連項目
- dynamic-panels（動的パネル）
- playback-controls（再生コントロール）`,
      },
      related: ['dynamic-panels', 'playback-controls'],
    },

    // ──────────────────────────────────────────────────────────────
    // 11. 우클릭 컨텍스트 메뉴
    // ──────────────────────────────────────────────────────────────
    {
      id: 'context-menus',
      selector: '#divPlaylistItemsControls',
      order: 11,
      title: {
        kr: '우클릭 컨텍스트 메뉴',
        jp: '右クリックコンテキストメニュー',
      },
      short: {
        kr: '각 테이블에서 우클릭하면 추가 기능 메뉴가 나옵니다.',
        jp: '各テーブルを右クリックすると追加機能メニューが出ます。',
      },
      detail: {
        kr: `### 무엇인가요
Library·PlayList·TrackList 테이블에서 행을 우클릭하면 해당 항목에 적용할 수 있는 기능 목록이 나타납니다.

### Library 우클릭 메뉴
- **Play** — 해당 클립 재생
- **Search for Playlists Containing Item** — 이 클립을 포함한 PlayList만 필터링하여 표시
- **CopyToClipboard** — 선택한 열을 선택해 클립보드로 복사

### PlayList 우클릭 메뉴
- **Select** — 해당 PlayList를 TrackList로 열기
- **Open in New Panel** — 새 동적 패널로 열기
- **Search for Playlists Containing Item** — 이 PlayList를 포함한 상위 목록 필터링
- **Edit / Clone / Delete** — 편집·복제·삭제
- **Move to front / Move to back** — 순서 이동
- **Playlist Task** (서브메뉴) — 선택한 여러 PlayList에 shuffle·PlayAll 일괄 적용
- **CopyToClipboard** — 클립보드 복사

### TrackList 우클릭 메뉴
- **Play / Open / Open in New Panel** — 재생·열기·새 패널로 열기
- **Search Playlists** — 이 항목이 속한 PlayList 검색
- **Search for Playlists Containing Item** — 이 항목을 포함한 PlayList 필터링
- **Select** — Library 또는 PlayList 패널에서 이 항목으로 스크롤·선택
- **Delete / Move to front / Move to back** — 삭제·순서 이동
- **PlayOrder Task** (서브메뉴) — 선택한 항목의 재생 순서만 Shuffle·Reorder·앞/뒤 이동
- **Playlist Task** (서브메뉴) — 폴더 항목에 shuffle·PlayAll 일괄 적용
- **CopyToClipboard** — 클립보드 복사

### 이럴 때 씁니다
- 특정 클립이 어느 PlayList에 들어있는지 확인할 때: Search for Playlists Containing Item
- 선택한 곡들만 부분 셔플하고 싶을 때: PlayOrder Task → Shuffle Selection`,

        jp: `### 何ですか
Library・PlayList・TrackListのテーブルで行を右クリックすると、その項目に適用できる機能の一覧が表示されます。

### Library右クリックメニュー
- **Play** — そのクリップを再生
- **Search for Playlists Containing Item** — このクリップを含むPlayListだけをフィルター表示
- **CopyToClipboard** — 選択した列を選んでクリップボードにコピー

### PlayList右クリックメニュー
- **Select** — そのPlayListをTrackListとして開く
- **Open in New Panel** — 新しい動的パネルとして開く
- **Search for Playlists Containing Item** — このPlayListを含む上位リストをフィルター
- **Edit / Clone / Delete** — 編集・複製・削除
- **Move to front / Move to back** — 順序を移動
- **Playlist Task**（サブメニュー） — 選択した複数のPlayListにshuffle・PlayAllを一括適用
- **CopyToClipboard** — クリップボードにコピー

### TrackList右クリックメニュー
- **Play / Open / Open in New Panel** — 再生・開く・新パネルで開く
- **Search Playlists** — この項目が属するPlayListを検索
- **Search for Playlists Containing Item** — この項目を含むPlayListをフィルター
- **Select** — LibraryまたはPlayListパネルでこの項目へスクロール・選択
- **Delete / Move to front / Move to back** — 削除・順序移動
- **PlayOrder Task**（サブメニュー） — 選択項目の再生順序だけをShuffle・Reorder・前後移動
- **Playlist Task**（サブメニュー） — フォルダ項目にshuffle・PlayAllを一括適用
- **CopyToClipboard** — クリップボードにコピー

### こんな時に使います
- 特定クリップがどのPlayListに入っているか確認する時：Search for Playlists Containing Item
- 選択した曲だけ部分的にシャッフルしたい時：PlayOrder Task → Shuffle Selection`,
      },
      related: ['table-body', 'tracklist-buttons', 'concept-shuffle-priority'],
    },

    // ──────────────────────────────────────────────────────────────
    // 12. 재생 진행 슬라이더
    // ──────────────────────────────────────────────────────────────
    {
      id: 'progress-slider',
      selector: '#videoControl',
      order: 12,
      title: {
        kr: '재생 진행 슬라이더',
        jp: '再生進行スライダー',
      },
      short: {
        kr: '재생 위치를 표시하고 드래그로 이동합니다.',
        jp: '再生位置を表示し、ドラッグで移動できます。',
      },
      detail: {
        kr: `### 무엇인가요
현재 재생 중인 클립의 진행 상황을 보여주는 슬라이더입니다.

### 동작 설명
- 재생 중 **100ms마다 자동 갱신**됩니다.
- 슬라이더를 드래그하면 원하는 위치로 이동합니다.
- 슬라이더 범위는 클립의 Start~End 구간으로 설정됩니다.
- 임베드 불가 영상을 팝업으로 재생할 때도 경과 시간이 근사치로 표시됩니다.

### 이럴 때 씁니다
- 클립의 특정 구간으로 빠르게 이동하고 싶을 때
- TestClipTime과 함께 클립 구간을 확인할 때

### 함께 보기
- playback-controls (재생 컨트롤)
- concept-clip-time (클립 시간 형식)`,

        jp: `### 何ですか
現在再生中のクリップの進行状況を表示するスライダーです。

### 動作説明
- 再生中は**100msごとに自動更新**されます。
- スライダーをドラッグすると任意の位置に移動できます。
- スライダーの範囲はクリップのStart〜End区間に設定されます。
- 埋め込み不可の動画をポップアップで再生する際も経過時間が近似値で表示されます。

### こんな時に使います
- クリップの特定区間に素早く移動したい時
- TestClipTimeと合わせてクリップ区間を確認する時

### 関連項目
- playback-controls（再生コントロール）
- concept-clip-time（クリップ時間形式）`,
      },
      related: ['playback-controls', 'concept-clip-time'],
    },

    // ──────────────────────────────────────────────────────────────
    // 13. 재생 컨트롤
    // ──────────────────────────────────────────────────────────────
    {
      id: 'playback-controls',
      selector: '[data-help="playback-controls"]',
      order: 13,
      title: {
        kr: '재생 컨트롤',
        jp: '再生コントロール',
      },
      short: {
        kr: '이전·재생·다음·셔플·반복 모드를 조작합니다.',
        jp: '前へ・再生・次へ・シャッフル・リピートを操作します。',
      },
      detail: {
        kr: `### 버튼 설명
- **⏮ Previous** — 이전 트랙으로 이동합니다. 재생 순서 기준으로 이전 곡입니다.
- **▶ / ⏸ Play / Pause** — 재생 중이면 일시정지, 정지 상태면 재생을 시작합니다.
- **⏭ Next** — 다음 트랙으로 이동합니다.
- **🔀 Shuffle** — 현재 TrackList의 재생 순서를 섞습니다. 불투명하면 셔플 활성 상태입니다. TrackList 버튼 바의 Shuffle 체크박스와 연동됩니다.
- **🔁 / 🔂 Mode** — 반복 모드를 순환합니다:
  - 🔁 (흐림) — 반복 없음: 마지막 곡이 끝나면 재생 종료
  - 🔁 (불투명) — 전체 반복: 마지막 곡이 끝나면 처음으로 돌아가 재생
  - 🔂 (불투명) — 한 곡 반복: 현재 곡을 계속 반복

### 이럴 때 씁니다
- 좋아하는 한 곡을 계속 들으려면: Mode를 🔂(한 곡 반복)으로 설정
- 셔플로 들으려면: Shuffle 버튼을 켜고 재생

### 함께 보기
- tracklist-buttons (TrackList 버튼 바)
- volume-controls (볼륨 컨트롤)`,

        jp: `### ボタン説明
- **⏮ Previous** — 前のトラックに移動します。再生順序基準で前の曲です。
- **▶ / ⏸ Play / Pause** — 再生中なら一時停止、停止中なら再生を開始します。
- **⏭ Next** — 次のトラックに移動します。
- **🔀 Shuffle** — 現在のTrackListの再生順序をシャッフルします。不透明な状態がシャッフル有効です。TrackListボタンバーのShuffleチェックボックスと連動します。
- **🔁 / 🔂 Mode** — リピートモードを循環します：
  - 🔁（薄い） — リピートなし：最後の曲が終わると再生終了
  - 🔁（濃い） — 全体リピート：最後の曲が終わると最初に戻って再生
  - 🔂（濃い） — 1曲リピート：現在の曲を繰り返し再生

### こんな時に使います
- お気に入りの1曲をずっと聴きたい時：Modeを🔂（1曲リピート）に設定
- シャッフル再生したい時：Shuffleボタンをオンにして再生

### 関連項目
- tracklist-buttons（TrackListボタンバー）
- volume-controls（ボリュームコントロール）`,
      },
      related: ['tracklist-buttons', 'volume-controls'],
    },

    // ──────────────────────────────────────────────────────────────
    // 14. 볼륨 컨트롤
    // ──────────────────────────────────────────────────────────────
    {
      id: 'volume-controls',
      selector: '[data-help="volume-controls"]',
      order: 14,
      title: {
        kr: '볼륨 컨트롤',
        jp: 'ボリュームコントロール',
      },
      short: {
        kr: '전체 볼륨과 클립별 개별 볼륨을 설정합니다.',
        jp: '全体ボリュームとクリップ別の個別ボリュームを設定します。',
      },
      detail: {
        kr: `### 무엇인가요
두 개의 슬라이더로 볼륨을 세밀하게 조절합니다.

### Volume 슬라이더 (위쪽)
- 기본 볼륨을 0~100%로 설정합니다.
- 슬라이더 위에서 **마우스 휠**을 돌리면 5% 단위로 조절됩니다.

### Individual 볼륨 (아래쪽)
- **Individual** 체크박스를 켜면 현재 재생 중인 클립에 **개별 볼륨 오프셋**을 설정합니다.
- 개별 볼륨 슬라이더는 기본 볼륨 + 오프셋의 결과값을 보여줍니다.
- 오프셋은 localStorage에 저장되어 다음에도 적용됩니다.
- 체크박스를 끄면 해당 클립의 개별 볼륨이 삭제됩니다.
- Library 패널의 **Batch Edit**으로 여러 클립의 개별 볼륨을 일괄 설정할 수 있습니다.

### 이럴 때 씁니다
- 특정 클립이 유독 작거나 클 때 해당 클립만 볼륨을 조정하고 싶을 때

### 함께 보기
- playback-controls (재생 컨트롤)
- library-panel (Library 패널 Batch Edit)`,

        jp: `### 何ですか
2つのスライダーでボリュームを細かく調節します。

### Volumeスライダー（上）
- 基本ボリュームを0〜100%で設定します。
- スライダーの上で**マウスホイール**を回すと5%単位で調節できます。

### Individualボリューム（下）
- **Individual**チェックボックスをオンにすると、現在再生中のクリップに**個別ボリュームオフセット**を設定します。
- 個別ボリュームスライダーは基本ボリューム＋オフセットの結果値を表示します。
- オフセットはlocalStorageに保存され、次回も適用されます。
- チェックボックスをオフにするとそのクリップの個別ボリュームが削除されます。
- Libraryパネルの**Batch Edit**で複数クリップの個別ボリュームを一括設定できます。

### こんな時に使います
- 特定クリップだけ音が小さい・大きい時に、そのクリップのボリュームだけ調整したい時

### 関連項目
- playback-controls（再生コントロール）
- library-panel（LibraryパネルのBatch Edit）`,
      },
      related: ['playback-controls', 'library-panel'],
    },

    // ──────────────────────────────────────────────────────────────
    // 15. 현재 재생 트랙 표시
    // ──────────────────────────────────────────────────────────────
    {
      id: 'current-song-display',
      selector: '[data-help="current-song-display"]',
      order: 15,
      title: {
        kr: '현재 재생 트랙 표시',
        jp: '現在再生トラック表示',
      },
      short: {
        kr: '현재 재생 중인 곡명과 재생 순서를 표시합니다.',
        jp: '現在再生中の曲名と再生順序を表示します。',
      },
      detail: {
        kr: `### 무엇인가요
현재 재생 중인 클립의 정보를 보여주는 영역입니다.

### 표시 내용
- **굵은 글씨** — 현재 재생 중인 곡의 \`Track Name / Original Artist\` 형식으로 표시됩니다.
- **(n / total)** — 현재 재생 순서 / 전체 재생 목록 수. 섞인 경우 재생 순서 기준입니다.

### 이럴 때 씁니다
- 어떤 곡이 재생 중인지 한눈에 확인할 때

### 함께 보기
- playback-controls (재생 컨트롤)
- play-path (재생 경로 표시)`,

        jp: `### 何ですか
現在再生中のクリップの情報を表示する領域です。

### 表示内容
- **太字** — 現在再生中の曲の\`Track Name / Original Artist\`形式で表示されます。
- **（n / total）** — 現在の再生順序 / 全再生リスト数。シャッフル時は再生順序基準です。

### こんな時に使います
- どの曲が再生中か一目で確認する時

### 関連項目
- playback-controls（再生コントロール）
- play-path（再生パス表示）`,
      },
      related: ['playback-controls', 'play-path'],
    },

    // ──────────────────────────────────────────────────────────────
    // 16. 유튜브 임베드 영역
    // ──────────────────────────────────────────────────────────────
    {
      id: 'youtube-embed',
      selector: '#divPlayer',
      order: 16,
      title: {
        kr: '유튜브 임베드 영역',
        jp: 'YouTube埋め込み領域',
      },
      short: {
        kr: 'YouTube 영상이 재생되는 영역입니다.',
        jp: 'YouTube動画が再生される領域です。',
      },
      detail: {
        kr: `### 무엇인가요
YouTube IFrame API를 통해 영상을 재생하는 플레이어 영역입니다.

### 동작 설명
- 클립의 Start~End 구간만 재생됩니다.
- 일부 영상은 저작권 등의 이유로 임베드가 불가합니다. 이 경우 자동으로 **팝업 창**을 열어 재생합니다.
  - 팝업이 차단될 경우 다음 곡으로 자동으로 넘어갑니다.
  - 팝업 창을 닫으면 다음 곡으로 이동합니다.
- 오류 코드 101·150·153이 발생하면 자동으로 팝업 모드로 전환됩니다.

### 이럴 때 씁니다
- 영상을 직접 보면서 재생하고 싶을 때

### 함께 보기
- progress-slider (재생 진행 슬라이더)
- concept-clip-time (클립 시간 형식)`,

        jp: `### 何ですか
YouTube IFrame APIを通じて動画を再生するプレーヤー領域です。

### 動作説明
- クリップのStart〜End区間のみ再生されます。
- 一部の動画は著作権などの理由で埋め込みができません。この場合、自動的に**ポップアップウィンドウ**を開いて再生します。
  - ポップアップがブロックされた場合、次の曲に自動的に進みます。
  - ポップアップウィンドウを閉じると次の曲に移動します。
- エラーコード101・150・153が発生すると自動的にポップアップモードに切り替わります。

### こんな時に使います
- 動画を見ながら再生したい時

### 関連項目
- progress-slider（再生進行スライダー）
- concept-clip-time（クリップ時間形式）`,
      },
      related: ['progress-slider', 'concept-clip-time'],
    },

  ], // end sections

  // ──────────────────────────────────────────────────────────────
  // 개념 섹션 (화면 영역에 1:1 대응되지 않는 개념 설명)
  // ──────────────────────────────────────────────────────────────
  concepts: [

    {
      id: 'concept-data-types',
      title: {
        kr: 'Library / PlayList / ClipSpreadSheets / TestClipTime의 차이',
        jp: 'Library / PlayList / ClipSpreadSheets / TestClipTimeの違い',
      },
      detail: {
        kr: `### 데이터 종류 한눈에 보기

\`\`\`
[Google Sheets] ──읽기 전용──▶ Library (곡 목록)
                                    │
                              선택해서 추가
                                    │
                                    ▼
                              PlayList (재생목록)
                              └─ 클립(🎶) 또는
                                 다른 PlayList(📁) 포함 가능
\`\`\`

### Library
- Google Sheets에서 자동으로 불러오는 **읽기 전용** 전체 곡 목록입니다.
- 직접 수정할 수 없습니다. 변경하려면 Google Sheets 원본을 수정하고 Save&Refresh를 눌러야 합니다.
- 클립 데이터: ID(YouTube), Track Name, Original Artist, Covered By, Category, Date, Start/End 구간

### PlayList
- 사용자가 직접 만들고 편집하는 재생목록입니다. localStorage에 저장됩니다.
- 클립(🎶)뿐만 아니라 **다른 PlayList(📁)도 항목으로 포함**할 수 있습니다 (중첩 구조).
- 각 PlayList는 Shuffle(셔플 여부)·PlayAll(폴더 연속 재생 여부) 설정을 갖습니다.

### ClipSpreadSheets
- Library 데이터를 어디서 가져올지 지정하는 **설정** 항목입니다.
- Google Sheets 스프레드시트 ID를 등록합니다.
- 여러 시트를 등록하면 합쳐서 Library를 구성합니다.

### TestClipTime
- 클립의 Start/End 시간을 실제로 **테스트하고 조정**하는 도구입니다.
- Google Sheets 원본의 Start/End 값을 정확히 맞출 때 사용합니다.`,

        jp: `### データ種類の一覧

\`\`\`
[Google Sheets] ──読み取り専用──▶ Library（曲一覧）
                                       │
                                   選択して追加
                                       │
                                       ▼
                                 PlayList（再生リスト）
                                 └─ クリップ(🎶)または
                                    別のPlayList(📁)を含められる
\`\`\`

### Library
- Google Sheetsから自動で読み込む**読み取り専用**の全曲一覧です。
- 直接修正はできません。変更にはGoogle Sheetsの原本を編集してSave&Refreshを押す必要があります。
- クリップデータ：ID(YouTube)、Track Name、Original Artist、Covered By、Category、Date、Start/End区間

### PlayList
- ユーザーが自分で作成・編集する再生リストです。localStorageに保存されます。
- クリップ(🎶)だけでなく**別のPlayList(📁)も項目として含める**ことができます（ネスト構造）。
- 各PlayListはShuffle（シャッフルするか）・PlayAll（フォルダを連続再生するか）の設定を持ちます。

### ClipSpreadSheets
- Libraryのデータをどこから取得するか指定する**設定**項目です。
- Google SheetsのスプレッドシートIDを登録します。
- 複数のシートを登録すると統合してLibraryを構成します。

### TestClipTime
- クリップのStart/End時間を実際に**テスト・調整**するツールです。
- Google Sheetsの原本のStart/End値を正確に合わせる時に使います。`,
      },
    },

    {
      id: 'concept-data-flow',
      title: {
        kr: '데이터 입출력 흐름 (Import → 편집 → Export)',
        jp: 'データ入出力フロー（Import → 編集 → Export）',
      },
      detail: {
        kr: `### 데이터가 저장되는 곳
이 앱의 모든 사용자 데이터는 **브라우저의 localStorage**에 저장됩니다. 서버가 없으므로 다른 기기나 브라우저로 옮기려면 Export/Import를 사용해야 합니다.

저장 키:
- \`watamePlayer_PlayList\` — 재생목록 전체
- \`watamePlayer_Volumes\` — 클립별 개별 볼륨
- \`watamePlayer_settings\` — Google Sheets URL 설정

### Export 흐름
1. 상단 **Export** 버튼 클릭
2. 현재 데이터를 JSON으로 직렬화 → JSZip으로 압축 → Base64 인코딩
3. 나타나는 텍스트를 복사해서 보관합니다.

### Import 흐름
1. 상단 **Import** 버튼 클릭
2. 다이얼로그에 Export 텍스트를 붙여넣고 OK
3. localStorage에 덮어쓴 뒤 자동으로 readData()를 호출해 화면을 갱신합니다.
4. **기존 데이터는 삭제되고 Import 데이터로 대체됩니다.**

### 이럴 때 씁니다
- 재생목록을 다른 기기에서 쓰고 싶을 때: Export → 텍스트 전달 → Import
- 브라우저를 초기화하기 전에 백업할 때: Export`,

        jp: `### データが保存される場所
このアプリの全ユーザーデータは**ブラウザのlocalStorage**に保存されます。サーバーがないため、別のデバイスやブラウザに移すにはExport/Importを使う必要があります。

保存キー：
- \`watamePlayer_PlayList\` — 再生リスト全体
- \`watamePlayer_Volumes\` — クリップ別個別ボリューム
- \`watamePlayer_settings\` — Google SheetsのURL設定

### Exportの流れ
1. 上部の**Export**ボタンをクリック
2. 現在のデータをJSONでシリアライズ → JSZipで圧縮 → Base64エンコード
3. 表示されたテキストをコピーして保管します。

### Importの流れ
1. 上部の**Import**ボタンをクリック
2. ダイアログにExportテキストを貼り付けてOK
3. localStorageに上書きした後、自動的にreadData()を呼び出して画面を更新します。
4. **既存データは削除されImportデータに置き換わります。**

### こんな時に使います
- 再生リストを別のデバイスで使いたい時：Export → テキストを共有 → Import
- ブラウザをリセットする前にバックアップする時：Export`,
      },
    },

    {
      id: 'concept-shuffle-priority',
      title: {
        kr: 'ShufflePriority의 동작 원리',
        jp: 'ShufflePriorityの動作原理',
      },
      detail: {
        kr: `### ShufflePriority란
TrackList의 각 항목에 설정하는 **셔플 우선순위** 값입니다. 기본값은 \`0\`입니다.

### 셔플 시 동작 방식
1. 셔플이 적용되면 항목들을 ShufflePriority 기준으로 **내림차순 정렬** 먼저 합니다.
2. **같은 우선순위 내에서만** 무작위로 섞습니다.
3. 즉, 높은 우선순위 항목이 항상 낮은 우선순위 항목보다 앞에 배치됩니다.

### 예시
| 곡 | ShufflePriority |
|---|---|
| 곡 A | 2 |
| 곡 B | 2 |
| 곡 C | 1 |
| 곡 D | 0 |
| 곡 E | 0 |

→ 셔플 결과: [A, B 중 랜덤] → [C] → [D, E 중 랜덤]

### 설정 방법
- TrackList에서 항목 선택 후 **Batch Edit** 버튼
- 또는 TrackList 우클릭 → **Playlist Task** (PlayList 유형 항목에 적용)

### 이럴 때 씁니다
- 특정 곡을 셔플해도 항상 앞에서 재생되도록 하고 싶을 때`,

        jp: `### ShufflePriorityとは
TrackListの各項目に設定する**シャッフル優先度**の値です。デフォルト値は\`0\`です。

### シャッフル時の動作
1. シャッフルが適用されると、項目をShufflePriority基準で**降順ソート**します。
2. **同じ優先度内だけ**ランダムに並び替えます。
3. つまり、高い優先度の項目は常に低い優先度の項目より前に配置されます。

### 例
| 曲 | ShufflePriority |
|---|---|
| 曲A | 2 |
| 曲B | 2 |
| 曲C | 1 |
| 曲D | 0 |
| 曲E | 0 |

→ シャッフル結果：[A, Bのどちらか] → [C] → [D, Eのどちらか]

### 設定方法
- TrackListで項目を選択して**Batch Edit**ボタン
- またはTrackListを右クリック → **Playlist Task**（PlayListタイプの項目に適用）

### こんな時に使います
- 特定の曲をシャッフルしても必ず先に再生されるようにしたい時`,
      },
    },

    {
      id: 'concept-clip-time',
      title: {
        kr: '클립 시간 형식과 TestClipTime의 용도',
        jp: 'クリップ時間形式とTestClipTimeの用途',
      },
      detail: {
        kr: `### 클립 시간 형식
Google Sheets의 Start·End 컬럼에 입력하는 시간 형식입니다.

지원 형식:
- \`HH:MM:SS\` — 예: \`01:23:45\`
- \`MM:SS\` — 예: \`03:45\`
- 빈 값 — Start가 비어있으면 영상 처음부터, End가 비어있으면 영상 끝까지 재생

### TestClipTime 패널
TestClipTime 체크박스를 켜면 패널이 표시됩니다.

- **Start 입력창** — 테스트할 시작 시간을 입력합니다.
- **Test (Start)** 버튼 — 입력한 시간으로 이동 후 재생을 시작합니다.
- **End 입력창** — 테스트할 종료 시간을 입력합니다. 입력창에 포커스하면 현재 재생 시간이 자동으로 채워집니다.
- **Test (End)** 버튼 — 종료 시간 5초 전으로 이동하고, 종료 시간에 도달하면 자동으로 정지합니다.

### 이럴 때 씁니다
- Google Sheets에 새 클립 구간을 입력하기 전에 정확한 시작/종료 시간을 확인할 때
- End 입력창 포커스 시 현재 시간이 자동 채워지므로, 재생하다가 원하는 위치에서 End 입력창을 클릭하면 쉽게 시간을 확인할 수 있습니다.

### 함께 보기
- youtube-embed (유튜브 임베드 영역)
- progress-slider (재생 진행 슬라이더)`,

        jp: `### クリップ時間形式
Google SheetsのStart・Endカラムに入力する時間形式です。

サポート形式：
- \`HH:MM:SS\` — 例：\`01:23:45\`
- \`MM:SS\` — 例：\`03:45\`
- 空白 — Startが空なら動画の最初から、Endが空なら動画の最後まで再生

### TestClipTimeパネル
TestClipTimeチェックボックスをオンにするとパネルが表示されます。

- **Start入力欄** — テストする開始時間を入力します。
- **Test (Start)ボタン** — 入力した時間に移動して再生を開始します。
- **End入力欄** — テストする終了時間を入力します。入力欄にフォーカスすると現在の再生時間が自動入力されます。
- **Test (End)ボタン** — 終了時間の5秒前に移動し、終了時間に達すると自動停止します。

### こんな時に使います
- Google Sheetsに新しいクリップ区間を入力する前に正確な開始/終了時間を確認する時
- End入力欄フォーカス時に現在時間が自動入力されるので、再生しながら希望の位置でEnd入力欄をクリックすると簡単に時間を確認できます。

### 関連項目
- youtube-embed（YouTube埋め込み領域）
- progress-slider（再生進行スライダー）`,
      },
    },

  ], // end concepts

}; // end HELP_CONTENT

// help-mode.js — 헬프 모드 진입/종료, 마커·툴팁·키보드 관리
// driver.js를 사용하지 않고 전체 자체 구현.
// 이유: driver.js의 내장 popover와 자체 사이드 패널이 충돌하며,
//       spotlight만 추출하기 위한 override 비용이 직접 구현보다 큼.

(function () {
  'use strict';

  if (!window.WatameHelp) window.WatameHelp = {};
  const WH = window.WatameHelp;

  // ── 상태 ─────────────────────────────────────────────────────
  const st = {
    active: false,
    lang: 'kr',
    currentIdx: 0,
    sections: [],        // order 순 정렬된 섹션 배열 (el 포함)
    currentContent: null, // 패널에 현재 표시 중인 데이터
    prevFocusEl: null,
    autoOpenedCheckboxId: null, // 도움말이 자동으로 켠 체크박스 ID
  };

  // ── DOM 엘리먼트 ─────────────────────────────────────────────
  let spotlightEl = null;
  let markersEl = null;
  let tooltipEl = null;
  let sentinelEl = null;

  // ── 마커 원문자 ───────────────────────────────────────────────
  const MARKERS = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩',
                   '⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'];

  // ── 섹션 해석 ────────────────────────────────────────────────
  function resolveSections() {
    const content = window.HELP_CONTENT;
    if (!content || !content.sections) return [];
    return content.sections
      .slice()
      .sort(function (a, b) { return a.order - b.order; })
      .map(function (sec) {
        let el = null;
        try { el = document.querySelector(sec.selector); } catch (e) {}
        return Object.assign({}, sec, { el: el });
      });
  }

  function getVisibleRect(el) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return r;
  }

  // ── DOM 생성 ─────────────────────────────────────────────────
  function createSpotlight() {
    spotlightEl = document.createElement('div');
    spotlightEl.id = 'wh-spotlight';
    spotlightEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(spotlightEl);
  }

  function createMarkersContainer() {
    markersEl = document.createElement('div');
    markersEl.id = 'wh-markers';
    markersEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(markersEl);
  }

  function createTooltip() {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'wh-tooltip';
    tooltipEl.setAttribute('role', 'dialog');
    tooltipEl.setAttribute('aria-modal', 'false');
    tooltipEl.setAttribute('aria-label', '도움말');
    tooltipEl.innerHTML =
      '<div id="wh-tooltip-header">' +
        '<span id="wh-tooltip-title"></span>' +
        '<button id="wh-lang-toggle" aria-label="언어 전환">KR</button>' +
      '</div>' +
      '<div id="wh-tooltip-short"></div>' +
      '<div id="wh-tooltip-hidden-hint"></div>' +
      '<div id="wh-tooltip-footer">' +
        '<button class="wh-btn wh-btn-detail" id="wh-btn-detail">자세히</button>' +
        '<button class="wh-btn" id="wh-btn-prev">← 이전</button>' +
        '<button class="wh-btn" id="wh-btn-next">다음 →</button>' +
        '<button class="wh-btn wh-btn-close" id="wh-btn-close" aria-label="헬프 모드 닫기">✕</button>' +
      '</div>' +
      '<div id="wh-step-indicator"></div>';
    document.body.appendChild(tooltipEl);

    document.getElementById('wh-btn-detail').addEventListener('click', function () { WH.showDetail(); });
    document.getElementById('wh-btn-prev').addEventListener('click', function () { WH.prev(); });
    document.getElementById('wh-btn-next').addEventListener('click', function () { WH.next(); });
    document.getElementById('wh-btn-close').addEventListener('click', function () { WH.exit(); });
    document.getElementById('wh-lang-toggle').addEventListener('click', function () { WH.toggleLang(); });
  }

  function createSentinel() {
    sentinelEl = document.createElement('button');
    sentinelEl.id = 'wh-focus-sentinel';
    sentinelEl.setAttribute('aria-hidden', 'true');
    sentinelEl.tabIndex = -1;
    document.body.appendChild(sentinelEl);
  }

  // ── 마커 렌더링 ───────────────────────────────────────────────
  function renderMarkers() {
    markersEl.innerHTML = '';
    st.sections.forEach(function (sec, idx) {
      const rect = getVisibleRect(sec.el);
      if (!rect) return;

      const m = document.createElement('button');
      m.className = 'wh-marker' + (idx === st.currentIdx ? ' active' : '');
      m.textContent = MARKERS[idx] || (idx + 1);
      m.setAttribute('aria-label', '섹션 ' + (idx + 1) + ': ' + (sec.title && sec.title[st.lang] || ''));
      m.setAttribute('tabindex', '0');
      m.dataset.idx = idx;

      m.style.top = (rect.top - 4) + 'px';
      m.style.left = (rect.left - 4) + 'px';

      m.addEventListener('click', function () {
        WH.goTo(parseInt(this.dataset.idx));
      });
      m.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          WH.goTo(parseInt(this.dataset.idx));
        }
      });
      markersEl.appendChild(m);
    });
  }

  function updateMarkerActive() {
    Array.from(markersEl.querySelectorAll('.wh-marker')).forEach(function (m) {
      const idx = parseInt(m.dataset.idx);
      m.classList.toggle('active', idx === st.currentIdx);
    });
  }

  // ── 스포트라이트 위치 ────────────────────────────────────────
  function positionSpotlight(el) {
    const rect = getVisibleRect(el);
    if (!rect) {
      // 요소가 숨겨진 경우: 1x1 중앙점으로 box-shadow가 전체 화면을 덮게 함
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      spotlightEl.style.cssText =
        'display:block;opacity:1;outline:none;' +
        'top:' + cy + 'px;left:' + cx + 'px;width:1px;height:1px;';
      return;
    }
    const pad = 6;
    spotlightEl.style.cssText =
      'display:block;opacity:1;' +
      'outline:2px solid rgba(100,180,255,0.7);' +
      'box-shadow:0 0 0 9999px rgba(0,0,0,0.5);' +
      'border-radius:4px;' +
      'transition:top 0.2s,left 0.2s,width 0.2s,height 0.2s;' +
      'top:' + (rect.top - pad) + 'px;' +
      'left:' + (rect.left - pad) + 'px;' +
      'width:' + (rect.width + pad * 2) + 'px;' +
      'height:' + (rect.height + pad * 2) + 'px;';
  }

  // ── 툴팁 위치 (스포트라이트를 가리지 않도록 4방향 체크) ─────
  function clamp(val, min, max) { return Math.min(max, Math.max(min, val)); }

  function positionTooltip(el) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tw = tooltipEl.offsetWidth || 320;
    const th = tooltipEl.offsetHeight || 170;
    const pad = 14;

    const rect = getVisibleRect(el);
    if (!rect) {
      // 요소 없음(숨김): 우상단 고정
      tooltipEl.style.top = '20px';
      tooltipEl.style.left = clamp(vw - tw - 20, 8, vw - tw - 8) + 'px';
      return;
    }

    // 스포트라이트 패딩 포함 영역
    const sp = 6; // spotlight padding
    const sr = { top: rect.top - sp, bottom: rect.bottom + sp,
                 left: rect.left - sp, right: rect.right + sp };

    const spaceBelow  = vh - sr.bottom - pad;
    const spaceAbove  = sr.top - pad;
    const spaceRight  = vw - sr.right - pad;
    const spaceLeft   = sr.left - pad;

    let top, left;

    if (spaceBelow >= th) {
      // 아래쪽
      top  = sr.bottom + pad;
      left = clamp(rect.left, 8, vw - tw - 8);
    } else if (spaceAbove >= th) {
      // 위쪽
      top  = sr.top - pad - th;
      left = clamp(rect.left, 8, vw - tw - 8);
    } else if (spaceRight >= tw) {
      // 오른쪽
      left = sr.right + pad;
      top  = clamp(rect.top, 8, vh - th - 8);
    } else if (spaceLeft >= tw) {
      // 왼쪽
      left = sr.left - pad - tw;
      top  = clamp(rect.top, 8, vh - th - 8);
    } else {
      // 어디도 여유 없음: 뷰포트 우하단 고정
      top  = vh - th - 8;
      left = vw - tw - 8;
    }

    tooltipEl.style.top  = clamp(top,  8, vh - th - 8) + 'px';
    tooltipEl.style.left = clamp(left, 8, vw - tw - 8) + 'px';
  }

  // ── 툴팁 내용 갱신 ──────────────────────────────────────────
  function updateTooltip() {
    const sec = st.sections[st.currentIdx];
    if (!sec) return;

    const lang = st.lang;
    document.getElementById('wh-tooltip-title').textContent =
      (MARKERS[st.currentIdx] || (st.currentIdx + 1)) + ' ' +
      ((sec.title && sec.title[lang]) || '');
    document.getElementById('wh-tooltip-short').textContent =
      (sec.short && sec.short[lang]) || '';

    // 요소가 숨겨진 패널 안에 있으면 힌트 표시
    var hintEl = document.getElementById('wh-tooltip-hidden-hint');
    var rect = sec.el ? sec.el.getBoundingClientRect() : null;
    var isHidden = !rect || (rect.width === 0 && rect.height === 0);
    if (isHidden) {
      hintEl.textContent = lang === 'kr'
        ? '※ 이 항목은 현재 숨겨진 패널에 있습니다. 상단 체크박스로 해당 패널을 먼저 활성화하세요.'
        : '※ この項目は現在非表示のパネルにあります。上部のチェックボックスでパネルを先に有効にしてください。';
      hintEl.style.display = 'block';
    } else {
      hintEl.style.display = 'none';
    }

    document.getElementById('wh-lang-toggle').textContent =
      lang === 'kr' ? 'KR' : 'JP';
    document.getElementById('wh-step-indicator').textContent =
      (st.currentIdx + 1) + ' / ' + st.sections.length;

    // 이전/다음 버튼 상태
    document.getElementById('wh-btn-prev').disabled = st.currentIdx === 0;
    document.getElementById('wh-btn-next').disabled = st.currentIdx === st.sections.length - 1;

    // 위치 계산
    positionSpotlight(sec.el);
    positionTooltip(sec.el);

    // 뷰포트 밖 요소 스크롤
    if (sec.el) {
      const rect = sec.el.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        sec.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // ── 헬프 버튼 추가 ──────────────────────────────────────────
  function addHelpButton() {
    const topbar = document.querySelector('[data-help="topbar-controls"]');
    if (!topbar || document.getElementById('wh-help-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'wh-help-btn';
    btn.textContent = '?';
    btn.setAttribute('aria-label', '도움말 열기/닫기');
    btn.setAttribute('title', 'Help (도움말)');
    btn.addEventListener('click', function () {
      st.active ? WH.exit() : WH.enter();
    });
    topbar.appendChild(btn);
  }

  // ── 키보드 핸들러 ────────────────────────────────────────────
  function onKeydown(e) {
    if (!st.active) return;

    switch (e.key) {
      case 'Escape':
        if (WH.Panel && WH.Panel.isOpen()) {
          WH.Panel.hide();
        } else {
          WH.exit();
        }
        e.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        WH.next();
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        WH.prev();
        e.preventDefault();
        break;
    }
  }

  // ── 리사이즈 핸들러 ──────────────────────────────────────────
  function onResize() {
    if (!st.active) return;
    renderMarkers();
    updateTooltip();
  }

  // ── 스크롤 핸들러 ────────────────────────────────────────────
  function onScroll() {
    if (!st.active) return;
    renderMarkers();
    positionSpotlight(st.sections[st.currentIdx].el);
  }

  // ── clientWidth 변화 감시 (스크롤바 출현/소멸 대응) ──────────
  let _docResizeObserver = null;
  let _lastClientWidth = 0;
  function startDocResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    _lastClientWidth = document.documentElement.clientWidth;
    _docResizeObserver = new ResizeObserver(function () {
      if (!st.active) return;
      const cw = document.documentElement.clientWidth;
      if (cw !== _lastClientWidth) {
        _lastClientWidth = cw;
        renderMarkers();
        positionSpotlight(st.sections[st.currentIdx] && st.sections[st.currentIdx].el);
      }
    });
    _docResizeObserver.observe(document.documentElement);
  }
  function stopDocResizeObserver() {
    if (_docResizeObserver) { _docResizeObserver.disconnect(); _docResizeObserver = null; }
  }

  // ── 패널 자동 열기/복원 ──────────────────────────────────────
  function applyPanelForSection(sec) {
    if (!sec || !sec.panelCheckbox) return;
    var cb = document.getElementById(sec.panelCheckbox);
    if (!cb || cb.checked) return; // 이미 켜져 있으면 건드리지 않음
    cb.click();
    st.autoOpenedCheckboxId = sec.panelCheckbox;
    // 요소가 이제 visible해졌으므로 el 재resolve
    try { sec.el = document.querySelector(sec.selector); } catch (e) {}
  }

  function restoreAutoPanel() {
    if (!st.autoOpenedCheckboxId) return;
    var cb = document.getElementById(st.autoOpenedCheckboxId);
    if (cb && cb.checked) cb.click();
    st.autoOpenedCheckboxId = null;
    // el 재resolve (다시 숨겨졌으므로)
    var sec = st.sections[st.currentIdx];
    if (sec) {
      try { sec.el = document.querySelector(sec.selector); } catch (e) {}
    }
  }

  // ── Public API ───────────────────────────────────────────────

  WH.enter = function (startIdx) {
    if (st.active) return;
    st.active = true;
    st.sections = resolveSections();
    st.currentIdx = (typeof startIdx === 'number' && startIdx >= 0 && startIdx < st.sections.length)
      ? startIdx : 0;
    st.prevFocusEl = document.activeElement;

    // DOM 생성 (최초 1회)
    if (!spotlightEl) createSpotlight();
    if (!markersEl) createMarkersContainer();
    if (!tooltipEl) createTooltip();
    if (!sentinelEl) createSentinel();

    // Panel 초기화
    if (WH.Panel) WH.Panel.init();

    spotlightEl.style.display = 'block';
    markersEl.style.display = 'block';
    tooltipEl.style.display = 'block';

    // ? 버튼 활성 표시
    const helpBtn = document.getElementById('wh-help-btn');
    if (helpBtn) helpBtn.classList.add('active');

    // URL 해시
    if (window.location.hash !== '#help') {
      history.pushState(null, '', '#help');
    }

    applyPanelForSection(st.sections[st.currentIdx]);
    renderMarkers();
    updateTooltip();

    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    startDocResizeObserver();

    // 첫 마커로 포커스
    const firstMarker = markersEl.querySelector('.wh-marker');
    if (firstMarker) firstMarker.focus();
  };

  WH.exit = function () {
    if (!st.active) return;
    st.active = false;

    restoreAutoPanel();

    if (spotlightEl) spotlightEl.style.display = 'none';
    if (markersEl) markersEl.style.display = 'none';
    if (tooltipEl) tooltipEl.style.display = 'none';
    if (WH.Panel) WH.Panel.hide();

    const helpBtn = document.getElementById('wh-help-btn');
    if (helpBtn) helpBtn.classList.remove('active');

    // URL 해시 제거
    if (window.location.hash === '#help') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }

    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    stopDocResizeObserver();

    // 포커스 복원
    if (st.prevFocusEl && typeof st.prevFocusEl.focus === 'function') {
      try { st.prevFocusEl.focus(); } catch (e) {}
    }
  };

  WH.goTo = function (idx) {
    if (!st.active) return;
    if (idx < 0 || idx >= st.sections.length) return;
    restoreAutoPanel();
    st.currentIdx = idx;
    applyPanelForSection(st.sections[idx]);
    updateMarkerActive();
    updateTooltip();

    // 활성 마커로 포커스
    const activeMarker = markersEl.querySelector('.wh-marker.active');
    if (activeMarker) activeMarker.focus();
  };

  WH.goToById = function (id) {
    const idx = st.sections.findIndex(function (s) { return s.id === id; });
    if (idx >= 0) WH.goTo(idx);
  };

  WH.next = function () {
    if (st.currentIdx < st.sections.length - 1) {
      WH.goTo(st.currentIdx + 1);
    }
  };

  WH.prev = function () {
    if (st.currentIdx > 0) {
      WH.goTo(st.currentIdx - 1);
    }
  };

  WH.toggleLang = function () {
    st.lang = st.lang === 'kr' ? 'jp' : 'kr';
    updateTooltip();
    if (WH.Panel) WH.Panel.updateLang(st.lang);
  };

  WH.getLang = function () { return st.lang; };

  WH.showDetail = function () {
    const sec = st.sections[st.currentIdx];
    if (!sec) return;
    st.currentContent = sec;
    if (WH.Panel) WH.Panel.show(sec, st.lang);
  };

  WH.showConcept = function (id) {
    const content = window.HELP_CONTENT;
    if (!content) return;
    const concept = (content.concepts || []).find(function (c) { return c.id === id; });
    if (!concept) return;
    st.currentContent = concept;
    if (WH.Panel) WH.Panel.show(concept, st.lang);
  };

  WH.getCurrentContent = function () { return st.currentContent; };

  // ── 초기화 (페이지 로드 후) ──────────────────────────────────
  window.addEventListener('load', function () {
    // init() 완료 후 실행되도록 setTimeout(0) 사용
    setTimeout(function () {
      addHelpButton();

      // URL 해시로 직접 진입
      if (window.location.hash === '#help') {
        WH.enter();
      }

      // 브라우저 뒤로가기/앞으로가기로 해시 변경 시
      window.addEventListener('hashchange', function () {
        if (window.location.hash === '#help' && !st.active) {
          WH.enter();
        } else if (window.location.hash !== '#help' && st.active) {
          WH.exit();
        }
      });
    }, 0);
  });
})();

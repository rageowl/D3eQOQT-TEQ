// help-panel.js — 사이드 패널 컴포넌트 (WatameHelp 네임스페이스)
// driver.js 없이 자체 구현. 마크다운을 HTML로 변환해 패널에 표시.

(function () {
  'use strict';

  // ── 마크다운 → HTML 변환 (패널 content용 간이 파서) ─────────
  function mdToHtml(md) {
    if (!md) return '';
    const lines = md.split('\n');
    const out = [];
    let inPre = false;
    let inUl = false;
    let inOl = false;
    let inTable = false;
    let tableHeader = false;

    function closeLists() {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
    }
    function closeTable() {
      if (inTable) { out.push('</table>'); inTable = false; tableHeader = false; }
    }

    function inlineFormat(text) {
      // code blocks: `...`
      text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
      // bold: **...**
      text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      // links: [text](url)
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
      return text;
    }

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const line = raw.trimEnd();

      // 코드 블록 (``` ... ```)
      if (line.startsWith('```')) {
        if (!inPre) {
          closeLists(); closeTable();
          out.push('<pre><code>');
          inPre = true;
        } else {
          out.push('</code></pre>');
          inPre = false;
        }
        continue;
      }
      if (inPre) {
        out.push(escHtml(line));
        continue;
      }

      // 제목 ###
      if (line.startsWith('### ')) {
        closeLists(); closeTable();
        out.push('<h3>' + inlineFormat(escHtml(line.slice(4))) + '</h3>');
        continue;
      }

      // 테이블 | ... |
      if (line.startsWith('|')) {
        if (!inTable) {
          closeLists();
          out.push('<table>');
          inTable = true;
          tableHeader = true;
        }
        const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        // 구분선 (|---|---|)
        if (cells.every(c => /^[\s:-]+$/.test(c))) {
          tableHeader = false;
          continue;
        }
        const tag = tableHeader ? 'th' : 'td';
        out.push('<tr>' + cells.map(c => `<${tag}>${inlineFormat(escHtml(c.trim()))}</${tag}>`).join('') + '</tr>');
        continue;
      } else if (inTable) {
        closeTable();
      }

      // 순서 없는 목록 - ...
      if (/^- /.test(line)) {
        if (inOl) { out.push('</ol>'); inOl = false; }
        if (!inUl) { out.push('<ul>'); inUl = true; }
        out.push('<li>' + inlineFormat(escHtml(line.slice(2))) + '</li>');
        continue;
      }

      // 순서 있는 목록 1. ...
      if (/^\d+\. /.test(line)) {
        if (inUl) { out.push('</ul>'); inUl = false; }
        if (!inOl) { out.push('<ol>'); inOl = true; }
        out.push('<li>' + inlineFormat(escHtml(line.replace(/^\d+\. /, ''))) + '</li>');
        continue;
      }

      closeLists();

      // 빈 줄 → 단락 구분
      if (line.trim() === '') {
        continue;
      }

      out.push('<p>' + inlineFormat(escHtml(line)) + '</p>');
    }

    closeLists();
    closeTable();
    if (inPre) out.push('</code></pre>');

    return out.join('\n');
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── 패널 DOM 생성 ────────────────────────────────────────────
  function createPanelDom() {
    const panel = document.createElement('div');
    panel.id = 'wh-panel';
    panel.setAttribute('role', 'complementary');
    panel.setAttribute('aria-label', '상세 설명 패널');

    panel.innerHTML = `
      <div id="wh-panel-header">
        <span id="wh-panel-title"></span>
        <button id="wh-panel-close" aria-label="패널 닫기" title="닫기 (Esc)">✕</button>
      </div>
      <div id="wh-panel-body"></div>
      <div id="wh-panel-related" style="display:none">
        <span>함께 보기</span>
        <div id="wh-panel-related-links"></div>
      </div>
    `;

    document.body.appendChild(panel);

    document.getElementById('wh-panel-close').addEventListener('click', function () {
      WatameHelp.Panel.hide();
    });

    return panel;
  }

  // ── Public API ────────────────────────────────────────────────
  const Panel = {
    _el: null,

    init: function () {
      if (!this._el) this._el = createPanelDom();
    },

    show: function (data, lang) {
      this.init();
      lang = lang || 'kr';
      const title = (data.title && data.title[lang]) || '';
      const detail = (data.detail && data.detail[lang]) || '';
      const related = data.related || [];

      document.getElementById('wh-panel-title').textContent = title;
      document.getElementById('wh-panel-body').innerHTML = mdToHtml(detail);

      const relEl = document.getElementById('wh-panel-related');
      const linksEl = document.getElementById('wh-panel-related-links');
      if (related.length > 0) {
        linksEl.innerHTML = '';
        const allContent = window.HELP_CONTENT || {};
        const allSections = (allContent.sections || []).concat(allContent.concepts || []);
        related.forEach(function (id) {
          const target = allSections.find(function (s) { return s.id === id; });
          if (!target) return;
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = (target.title && target.title[lang]) || id;
          a.addEventListener('click', function (e) {
            e.preventDefault();
            // 섹션이면 goTo, 개념이면 showConcept
            const secIdx = (allContent.sections || []).findIndex(function (s) { return s.id === id; });
            if (secIdx >= 0) {
              Panel.hide();
              WatameHelp.goToById(id);
            } else {
              Panel.show(target, WatameHelp.getLang());
            }
          });
          linksEl.appendChild(a);
        });
        relEl.style.display = '';
      } else {
        relEl.style.display = 'none';
      }

      this._el.classList.add('open');
      document.getElementById('wh-panel-close').focus();
    },

    showConcept: function (id, lang) {
      const allContent = window.HELP_CONTENT || {};
      const concept = (allContent.concepts || []).find(function (c) { return c.id === id; });
      if (concept) this.show(concept, lang || 'kr');
    },

    hide: function () {
      if (this._el) this._el.classList.remove('open');
    },

    isOpen: function () {
      return this._el && this._el.classList.contains('open');
    },

    updateLang: function (lang) {
      // 패널이 열려 있으면 현재 내용을 새 언어로 다시 렌더링
      // (현재 표시 중인 섹션/개념 정보를 help-mode.js에서 추적)
      if (this._el && this._el.classList.contains('open')) {
        const current = WatameHelp.getCurrentContent();
        if (current) this.show(current, lang);
      }
    },
  };

  // 네임스페이스에 노출
  if (!window.WatameHelp) window.WatameHelp = {};
  window.WatameHelp.Panel = Panel;
  window.WatameHelp._mdToHtml = mdToHtml; // 테스트용
})();

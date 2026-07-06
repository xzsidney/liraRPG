/* =============================================
   LIRARPG — app.js — SPA Logic
   ============================================= */

(function () {
  'use strict';

  // ---- ELEMENTS ----
  const galleryView  = document.getElementById('gallery-view');
  const detailView   = document.getElementById('detail-view');
  const cardGrid     = document.getElementById('card-grid');
  const detailCont   = document.getElementById('detail-container');
  const backBtn      = document.getElementById('back-btn');
  const logoBtn      = document.getElementById('logo-btn');
  const filterBtns   = document.querySelectorAll('.filter-btn');

  let activeFilter = 'all';
  let currentChar  = null;

  // ---- PARTICLES ----
  function initParticles() {
    const container = document.getElementById('particles');
    const count = Math.floor(window.innerWidth / 80);
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        animation-delay: ${Math.random() * 12}s;
        animation-duration: ${8 + Math.random() * 16}s;
        opacity: ${0.2 + Math.random() * 0.4};
      `;
      container.appendChild(p);
    }
  }

  // ---- HELPERS ----
  function getClaConfig(cla) {
    return CLA_CONFIG[cla] || { cor: '#3a3a3a', corTexto: '#aaaaaa', icone: '●', apelido: cla };
  }

  function makeDots(value, max, cls, filled_cls) {
    let html = '';
    for (let i = 1; i <= max; i++) {
      html += `<span class="${cls} ${i <= value ? filled_cls : ''}"></span>`;
    }
    return html;
  }

  function formatKey(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  // ---- GALLERY ----
  function renderGallery() {
    cardGrid.innerHTML = '';
    CHARACTERS.forEach((char, idx) => {
      const cfg = getClaConfig(char.cla);
      const card = document.createElement('article');
      card.className = `char-card card-loading ${char.cla.toLowerCase().replace(' ','-')}`;
      card.dataset.cla = char.cla;
      card.dataset.id  = char.id;
      card.style.animationDelay = `${idx * 0.05}s`;
      card.style.setProperty('--card-glow-color', cfg.corTexto);
      card.style.setProperty('--card-glow-shadow', cfg.cor + 'aa');
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${char.nome}, ${char.cla}`);

      const hum = char.status.humanidade;
      const humDots = Array.from({length:10}, (_,i) =>
        `<span class="hum-dot ${i < hum ? '' : 'empty'}"></span>`).join('');

      card.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="${char.retrato}" alt="Retrato de ${char.nome}" loading="lazy" />
          <div class="card-img-overlay"></div>
          <div class="card-humanidade" title="Humanidade: ${hum}/10">${humDots}</div>
          <div class="card-body">
            <div class="card-cla-badge" style="background:${cfg.cor}33; color:${cfg.corTexto}; border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${char.cla}
            </div>
            <h2 class="card-nome">${char.nome}</h2>
            <p class="card-conceito">${char.conceito}</p>
          </div>
        </div>
        <div class="card-hover-cta">Ver Ficha →</div>
      `;

      card.addEventListener('click', () => openDetail(char));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openDetail(char); });
      cardGrid.appendChild(card);
    });

    applyFilter(activeFilter);
  }

  function applyFilter(cla) {
    activeFilter = cla;
    const cards = cardGrid.querySelectorAll('.char-card');
    cards.forEach(card => {
      if (cla === 'all' || card.dataset.cla === cla) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === cla);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // ---- DETAIL ----
  function openDetail(char) {
    currentChar = char;
    const cfg = getClaConfig(char.cla);
    renderDetail(char, cfg);
    showView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDetail(char, cfg) {
    const hum = char.status.humanidade;
    const fv  = char.status.forca_de_vontade;

    // Attributes section
    const attrHTML = buildAttributes(char.atributos);
    const skillsHTML = buildSkills(char.habilidades);
    const discHTML = buildDisciplines(char, cfg);
    const bgHTML = buildBackground(char, cfg);
    const statsHTML = buildStats(char, cfg);

    detailCont.innerHTML = `
      <div class="detail-grid">
        <!-- LEFT: Portrait -->
        <div class="detail-portrait-col">
          <div class="detail-portrait-wrap" style="--detail-glow: ${cfg.cor}88;">
            <img src="${char.retrato}" alt="Retrato de ${char.nome}" />
            <div class="detail-portrait-overlay"></div>
            <div class="detail-portrait-info">
              <div class="detail-hum-label">Humanidade</div>
              <div class="detail-humanidade">
                ${Array.from({length:10},(_,i)=>`<span class="detail-hum-dot ${i<hum?'':'empty'}"></span>`).join('')}
              </div>
            </div>
          </div>
          ${statsHTML}
          <div class="detail-badges" style="margin-top:18px;">
            <div class="detail-badge-row">
              <span class="detail-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
                ${cfg.icone} ${char.cla} — ${cfg.apelido}
              </span>
            </div>
            <div class="detail-badge-row">
              <span class="detail-badge" style="color:var(--parchment-dim);border-color:var(--border-dark);">
                ${char.natureza}
              </span>
              <span class="detail-badge" style="color:var(--parchment-dim);border-color:var(--border-dark);">
                ${char.comportamento}
              </span>
            </div>
          </div>
          ${buildAntecedentes(char.antecedentes)}
        </div>

        <!-- RIGHT: Info -->
        <div class="detail-info-col">
          <div class="detail-header-block" style="--detail-clan-color:${cfg.corTexto};">
            <div class="detail-cla-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${char.cla}
            </div>
            <a href="missoes.html?char_id=${char.id}" class="btn-missions" style="float: right;">🩸 Missões Solo</a>
            <h1 class="detail-nome">${char.nome}</h1>
            ${char.pseudonimo ? `<p class="detail-pseudonimo">Também conhecida como "${char.pseudonimo}"</p>` : ''}
            <p class="detail-conceito">${char.seita} · ${char.conceito}</p>
            <p class="detail-descricao-cla">${char.descricao_cla}</p>
          </div>

          <!-- TABS NAV -->
          <div class="tabs-nav" role="tablist">
            <button class="tab-btn active" data-tab="atributos" role="tab" id="tab-atributos">Atributos</button>
            <button class="tab-btn" data-tab="habilidades" role="tab" id="tab-habilidades">Habilidades</button>
            <button class="tab-btn" data-tab="disciplinas" role="tab" id="tab-disciplinas">Disciplinas</button>
            <button class="tab-btn" data-tab="historico" role="tab" id="tab-historico">Histórico</button>
          </div>

          <!-- TAB: ATRIBUTOS -->
          <div class="tab-panel active" id="panel-atributos" role="tabpanel">
            ${attrHTML}
            <p class="section-title">Virtudes</p>
            ${buildVirtudes(char.virtudes)}
          </div>

          <!-- TAB: HABILIDADES -->
          <div class="tab-panel" id="panel-habilidades" role="tabpanel">
            ${skillsHTML}
          </div>

          <!-- TAB: DISCIPLINAS -->
          <div class="tab-panel" id="panel-disciplinas" role="tabpanel">
            ${discHTML}
          </div>

          <!-- TAB: HISTÓRICO -->
          <div class="tab-panel" id="panel-historico" role="tabpanel">
            ${bgHTML}
          </div>
        </div>
      </div>
    `;

    // Apply clan CSS vars to detail panels
    detailCont.style.setProperty('--detail-clan-color', cfg.corTexto);
    detailCont.style.setProperty('--detail-clan-text',  cfg.corTexto);

    // Wire tabs
    detailCont.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        detailCont.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        detailCont.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        detailCont.querySelector(`#panel-${btn.dataset.tab}`).classList.add('active');
      });
    });
  }

  function buildAttributes(attrs) {
    const groups = [
      { label: 'Físicos', data: attrs.fisicos },
      { label: 'Sociais', data: attrs.sociais },
      { label: 'Mentais', data: attrs.mentais }
    ];
    return groups.map(g => `
      <div class="attr-group">
        <p class="section-title">${g.label}</p>
        ${Object.entries(g.data).map(([k, v]) => `
          <div class="attr-row">
            <span class="attr-name">${formatKey(k)}</span>
            <div class="attr-dots">
              ${makeDots(v, 5, 'dot', 'filled')}
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  function buildSkills(habilidades) {
    const groups = [
      { label: 'Talentos', data: habilidades.talentos },
      { label: 'Perícias',  data: habilidades.pericias },
      { label: 'Conhecimentos', data: habilidades.conhecimentos }
    ];
    return groups.map(g => {
      const items = Object.entries(g.data).filter(([,v]) => v > 0);
      if (!items.length) return '';
      return `
        <p class="section-title">${g.label}</p>
        <div class="skill-grid">
          ${items.map(([k,v]) => `
            <div class="skill-item">
              <span class="skill-name">${formatKey(k)}</span>
              <div class="skill-dots">
                ${makeDots(v, 5, 'skill-dot', 'filled')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }

  function buildDisciplines(char, cfg) {
    const disc = char.disciplinas;
    const entries = Object.entries(disc).filter(([k]) => k !== 'detalhe_taumaturgia');
    if (!entries.length) return '<p style="color:var(--text-dim); font-style:italic;">Nenhuma disciplina registrada.</p>';

    return `
      <p class="section-title">Poderes Sobrenaturais</p>
      <div class="disc-grid">
        ${entries.map(([k, v]) => {
          if (typeof v !== 'number') return '';
          let detail = '';
          if (k === 'taumaturgia' && char.disciplinas.detalhe_taumaturgia) {
            detail = `<div class="disc-detail">${char.disciplinas.detalhe_taumaturgia.join(' · ')}</div>`;
          }
          return `
            <div class="disc-item">
              <div style="flex:1">
                <span class="disc-name">${formatKey(k)}</span>
                ${detail}
              </div>
              <div class="disc-bar">
                ${makeDots(v, 5, 'disc-pip', 'filled')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function buildBackground(char, cfg) {
    return `
      <p class="section-title">História</p>
      <div class="historico-block">${char.historico}</div>

      <p class="section-title">Dicas de Interpretação</p>
      <div class="dicas-block">
        <div class="dicas-label">🎭 Como Interpretar</div>
        <p class="dicas-text">${char.dicas}</p>
      </div>

      <p class="section-title">Fraqueza de Clã</p>
      <div class="fraqueza-block" style="background:${cfg.cor}22; border-color:${cfg.corTexto}33;">
        <div class="fraqueza-nome">⚠ ${char.fraqueza.nome}</div>
        <p class="fraqueza-text">${char.fraqueza.descricao}</p>
        ${char.fraqueza.restricao ? `<p class="restricao-text">🩸 ${char.fraqueza.restricao}</p>` : ''}
      </div>

      ${char.qualidades.length ? `
        <p class="section-title">Qualidades & Defeitos</p>
        <div class="qualidades-list">
          ${char.qualidades.map(q => `<div class="qualidade-item">${q}</div>`).join('')}
        </div>
      ` : ''}
    `;
  }

  function buildStats(char, cfg) {
    const s = char.status;
    return `
      <div class="detail-stat-row" style="margin-top:18px;">
        <div class="detail-stat">
          <span class="stat-label">F. Vontade</span>
          <span class="stat-value" style="color:${cfg.corTexto};">${s.forca_de_vontade}</span>
        </div>
        <div class="detail-stat">
          <span class="stat-label">Humanidade</span>
          <span class="stat-value" style="color:var(--blood-bright);">${s.humanidade}</span>
        </div>
        <div class="detail-stat">
          <span class="stat-label">P. Sangue</span>
          <span class="stat-value" style="color:var(--blood-bright);">${s.pontos_de_sangue}</span>
        </div>
      </div>
    `;
  }

  function buildVirtudes(virtudes) {
    const labels = { consciencia: 'Consciência', autocontrole: 'Autocontrole', coragem: 'Coragem' };
    return `
      <div class="virtudes-row">
        ${Object.entries(virtudes).map(([k,v]) => `
          <div class="virtude-card">
            <div class="virtude-nome">${labels[k] || formatKey(k)}</div>
            <div class="virtude-dots">${makeDots(v, 5, 'dot', 'filled')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function buildAntecedentes(antec) {
    if (!antec) return '';
    const skip = new Set(Object.keys(antec).filter(k => k.startsWith('detalhe_')));
    const entries = Object.entries(antec).filter(([k,v]) => !skip.has(k) && typeof v === 'number');
    if (!entries.length) return '';

    return `
      <div style="margin-top:18px;">
        <p class="section-title" style="margin-bottom:12px;">Antecedentes</p>
        <div class="antec-grid">
          ${entries.map(([k,v]) => {
            const detalhe = antec[`detalhe_${k}`];
            return `
              <div class="antec-item">
                <span class="antec-nome">${formatKey(k)}</span>
                <div class="antec-valor">${makeDots(v, 5, 'antec-dot', 'filled')}</div>
                ${detalhe ? `<div class="antec-detalhe">${detalhe}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ---- VIEW SWITCHING ----
  function showView(viewName) {
    if (viewName === 'gallery') {
      galleryView.classList.add('active');
      detailView.classList.remove('active');
    } else {
      galleryView.classList.remove('active');
      detailView.classList.add('active');
      detailView.classList.add('view-enter');
      setTimeout(() => detailView.classList.remove('view-enter'), 400);
    }
  }

  backBtn.addEventListener('click', () => showView('gallery'));
  logoBtn.addEventListener('click', () => showView('gallery'));
  logoBtn.addEventListener('keydown', e => { if (e.key === 'Enter') showView('gallery'); });

  // Keyboard navigation (Escape to go back)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && detailView.classList.contains('active')) {
      showView('gallery');
    }
  });

  // ---- INIT ----
  initParticles();
  renderGallery();

})();

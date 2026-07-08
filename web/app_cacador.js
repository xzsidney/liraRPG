(function () {
  'use strict';

  // ---- ELEMENTS ----
  const galleryView  = document.getElementById('gallery-view');
  const detailView   = document.getElementById('detail-view');
  const cardGrid     = document.getElementById('card-grid');
  const detailCont   = document.getElementById('detail-container');
  const backBtn      = document.getElementById('back-btn');
  const logoBtn      = document.getElementById('logo-btn');
  const filterBar    = document.getElementById('filter-bar');

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
        background: #ff8c00;
        animation-delay: ${Math.random() * 12}s;
        animation-duration: ${8 + Math.random() * 16}s;
        opacity: ${0.1 + Math.random() * 0.3};
      `;
      container.appendChild(p);
    }
  }

  function getCredoConfig(credo) {
    if (!credo) return CREDO_CONFIG["Desconhecido"];
    const baseCredo = credo.split(' ')[0];
    const key = Object.keys(CREDO_CONFIG).find(k => k.startsWith(baseCredo));
    return key ? CREDO_CONFIG[key] : CREDO_CONFIG["Desconhecido"];
  }

  function makeDots(value, max, cls, filled_cls) {
    let html = '';
    for (let i = 1; i <= max; i++) {
      html += `<span class="${cls} ${i <= value ? filled_cls : ''}"></span>`;
    }
    return html;
  }

  function formatKey(key) {
    if(!key) return "";
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  // ---- GALLERY ----
  function renderGallery() {
    // Generate filters
    let credos = [...new Set(CHARACTERS_CACADOR.map(c => {
      const base = c.informacoes_basicas.credo.split(' ')[0];
      return Object.keys(CREDO_CONFIG).find(k => k.startsWith(base)) || "Desconhecido";
    }))];
    
    filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">TODOS</button>`;
    credos.forEach(c => {
      filterBar.innerHTML += `<button class="filter-btn" data-filter="${c}">${c.split(' ')[0]}</button>`;
    });

    // Generate cards
    cardGrid.innerHTML = '';
    CHARACTERS_CACADOR.forEach((char, idx) => {
      const info = char.informacoes_basicas;
      const baseCredo = info.credo.split(' ')[0];
      const credoKey = Object.keys(CREDO_CONFIG).find(k => k.startsWith(baseCredo)) || "Desconhecido";
      const cfg = getCredoConfig(info.credo);
      
      const card = document.createElement('article');
      card.className = `char-card cacador-card`;
      card.dataset.credo = credoKey;
      card.dataset.id  = char.id;
      card.style.animationDelay = `${idx * 0.05}s`;

      card.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="${char.retrato}" alt="Retrato de ${info.nome}" loading="lazy" onerror="this.onerror=null; this.src='assets/portraits/placeholder.png';" />
          <div class="card-img-overlay"></div>
          <div class="cacador-badge" style="border-color:${cfg.cor}; color:${cfg.cor};">
            ${cfg.icone} ${info.credo.split(' ')[0]}
          </div>
          <div class="card-body">
            <h2 class="card-nome" style="font-family: var(--font-cacador-title);">${info.nome}</h2>
            <p class="card-conceito" style="font-family: monospace; color: #aaa;">${info.conceito}</p>
          </div>
        </div>
        <div class="card-hover-cta" style="background: var(--cacador-orange-dim);">Acessar Arquivo →</div>
      `;

      card.addEventListener('click', () => openDetail(char));
      cardGrid.appendChild(card);
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.filter;
        document.querySelectorAll('.char-card').forEach(card => {
          if (t === 'all' || card.dataset.credo === t) card.style.display = 'block';
          else card.style.display = 'none';
        });
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ---- DETAIL ----
  function openDetail(char) {
    currentChar = char;
    const cfg = getCredoConfig(char.informacoes_basicas.credo);
    renderDetail(char, cfg);
    showView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDetail(char, cfg) {
    const info = char.informacoes_basicas;
    const status = char.status_humanos;
    
    const attrHTML = buildAttributes(char.atributos);
    const skillsHTML = buildSkills(char.habilidades);
    const advHTML = buildAdvantages(char.vantagens_e_trunfos);
    const bgHTML = buildBackground(char, cfg);

    detailCont.innerHTML = `
      <div class="detail-grid">
        <div class="detail-portrait-col">
          <div class="detail-portrait-wrap cacador-portrait-wrap">
            <img src="${char.retrato}" alt="Retrato de ${info.nome}" onerror="this.onerror=null; this.src='assets/portraits/placeholder.png';" />
            <div class="detail-portrait-overlay"></div>
          </div>
          
          <div class="cacador-meters">
            <div class="cacador-meter">
              <span class="meter-label-cacador" style="color:var(--cacador-orange);">Ímpeto</span>
              <div class="meter-dots">${makeDots(status.impeto_inicial, 10, 'cacador-dot impeto', 'filled')}</div>
            </div>
            <div class="cacador-meter">
              <span class="meter-label-cacador" style="color:#ffffff;">F. Vontade</span>
              <div class="meter-dots">${makeDots(status.forca_de_vontade, 10, 'cacador-dot vontade', 'filled')}</div>
            </div>
            <div class="cacador-meter">
              <span class="meter-label-cacador" style="color:#ff3333;">Vitalidade</span>
              <div class="meter-dots">${makeDots(status.vitalidade, 10, 'cacador-dot vitalidade', 'filled')}</div>
            </div>
          </div>

          <div class="cacador-badge-row">
            <div class="cacador-badge-info" style="border-left-color: ${cfg.cor};">
              <strong>CREDO:</strong> ${info.credo}
            </div>
            <div class="cacador-badge-info">
              <strong>CÉLULA:</strong> ${info.celula}
            </div>
          </div>
        </div>

        <div class="detail-info-col">
          <div class="detail-header-block" style="border-bottom: 2px solid var(--cacador-orange-dim);">
            <h1 class="detail-name" style="font-family: var(--font-cacador-title);">${info.nome}</h1>
            <p class="detail-concept" style="font-family: monospace; color: #888;">${info.conceito}</p>
          </div>

          <div class="cacador-tabs-nav" role="tablist">
            <button class="cacador-tab-btn active" data-tab="atributos" role="tab">Atributos</button>
            <button class="cacador-tab-btn" data-tab="habilidades" role="tab">Habilidades</button>
            <button class="cacador-tab-btn" data-tab="vantagens" role="tab">Antecedentes</button>
            <button class="cacador-tab-btn" data-tab="historico" role="tab">Dossiê</button>
          </div>

          <div class="tab-panel active" id="panel-atributos" role="tabpanel">${attrHTML}</div>
          <div class="tab-panel" id="panel-habilidades" role="tabpanel">${skillsHTML}</div>
          <div class="tab-panel" id="panel-vantagens" role="tabpanel">${advHTML}</div>
          <div class="tab-panel" id="panel-historico" role="tabpanel">${bgHTML}</div>
        </div>
      </div>
    `;

    setupTabs();
  }

  // BUILDERS
  function buildAttributes(attr) {
    if(!attr) return '';
    let html = '';
    const categories = ['fisicos', 'sociais', 'mentais'];
    
    categories.forEach(cat => {
      if(!attr[cat]) return;
      html += `<div class="cacador-attr-group">
                 <p class="cacador-section-title">${cat}</p>`;
      for(let a in attr[cat]) {
        html += `
          <div class="cacador-attr-row">
            <span class="cacador-attr-name">${formatKey(a)}</span>
            <div class="attr-dots">${makeDots(attr[cat][a], 5, 'cacador-dot-attr', 'filled')}</div>
          </div>
        `;
      }
      html += `</div>`;
    });
    return html;
  }

  function buildSkills(habs) {
    if(!habs) return '';
    let html = `<div class="cacador-attr-group"><p class="cacador-section-title">Habilidades</p><div class="cacador-skill-grid">`;
    
    // Flatten skills from nivel_3, nivel_2, nivel_1
    const flatHabs = [];
    ['nivel_3', 'nivel_2', 'nivel_1'].forEach(nivel => {
      if(habs[nivel]) {
        for(let h in habs[nivel]) {
          flatHabs.push({ name: h, value: habs[nivel][h] });
        }
      }
    });

    flatHabs.sort((a,b) => b.value - a.value).forEach(skill => {
      html += `
        <div class="cacador-skill-item">
          <span class="cacador-skill-name">${formatKey(skill.name)}</span>
          <div class="attr-dots">${makeDots(skill.value, 5, 'cacador-dot-attr', 'filled')}</div>
        </div>
      `;
    });
    html += `</div></div>`;
    return html;
  }

  function buildAdvantages(vantagens) {
    if(!vantagens) return '';
    let html = '';
    
    if(vantagens.antecedentes) {
      html += `<p class="cacador-section-title">Antecedentes</p><div class="cacador-attr-group" style="display: flex; flex-direction: column; gap: 10px;">`;
      const skip = new Set(Object.keys(vantagens.antecedentes).filter(k => k.startsWith('detalhe_')));
      const entries = Object.entries(vantagens.antecedentes).filter(([k,v]) => !skip.has(k) && typeof v === 'number');
      entries.forEach(([k,v]) => {
        let desc = vantagens.antecedentes['detalhe_' + k] || '';
        html += `
          <div style="background: #111; padding: 10px; border-left: 2px solid var(--cacador-orange-dim);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
              <span class="cacador-skill-name" style="font-weight:bold; color:var(--cacador-orange);">${formatKey(k)}</span>
              <div class="attr-dots">${makeDots(v, 5, 'cacador-dot-attr', 'filled')}</div>
            </div>
            <div style="font-family:monospace; font-size:12px; color:#aaa;">${desc}</div>
          </div>
        `;
      });
      html += `</div>`;
    }
    
    return html;
  }

  function buildBackground(char, cfg) {
    const hist = char.historico;
    let html = '';
    
    html += `
      <div class="cacador-attr-group">
        <p class="cacador-section-title">Ambições e Redenção</p>
        <p style="font-family:monospace; color:#ccc; margin-bottom:8px;"><strong>Ambição:</strong> ${char.informacoes_basicas.ambicao}</p>
        <p style="font-family:monospace; color:#ccc; margin-bottom:8px;"><strong>Desejo:</strong> ${char.informacoes_basicas.desejo}</p>
        <p style="font-family:monospace; color:#ccc;"><strong>Redenção:</strong> ${char.informacoes_basicas.redencao}</p>
      </div>
    `;

    if (char.qualidades_e_defeitos && char.qualidades_e_defeitos.length) {
      html += `<p class="cacador-section-title">Qualidades e Defeitos</p><div class="cacador-attr-group" style="display:flex; flex-direction:column; gap:5px;">`;
      char.qualidades_e_defeitos.forEach(q => {
        html += `<div style="font-family:monospace; color:#bbb; padding:5px; background:#111; border-left:2px solid #555;">• ${q}</div>`;
      });
      html += `</div>`;
    }

    if(hist) {
      html += `
        <p class="cacador-section-title">Dossiê e Histórico</p>
        <div class="cacador-attr-group" style="font-family:monospace; line-height:1.5; color:#ccc; text-align:justify;">
          <p style="margin-bottom: 15px;">${hist.resumo}</p>
          <p style="color:var(--cacador-orange-dim);"><strong>> Dicas de Interpretação:</strong></p>
          <p>${hist.dicas_de_interpretacao}</p>
      `;
      // Other historical notes
      Object.keys(hist).filter(k => k !== 'resumo' && k !== 'dicas_de_interpretacao').forEach(k => {
        html += `<p style="margin-top: 15px; color:var(--cacador-orange-dim);"><strong>> ${formatKey(k)}:</strong></p><p>${hist[k]}</p>`;
      });
      html += `</div>`;
    }

    return html;
  }

  // ---- TABS & NAVIGATION ----
  function setupTabs() {
    const tabs = document.querySelectorAll('.cacador-tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`panel-${target}`).classList.add('active');
      });
    });
  }

  function showView(viewName) {
    if (viewName === 'gallery') {
      detailView.classList.remove('active');
      galleryView.classList.add('active');
      currentChar = null;
    } else {
      galleryView.classList.remove('active');
      detailView.classList.add('active');
    }
  }

  // ---- INIT ----
  function init() {
    initParticles();
    renderGallery();

    backBtn.addEventListener('click', () => {
      showView('gallery');
    });
    
    logoBtn.addEventListener('click', (e) => {
      if(detailView.classList.contains('active')) {
        e.preventDefault();
        showView('gallery');
      }
    });
  }

  // Start app
  window.addEventListener('DOMContentLoaded', init);

})();

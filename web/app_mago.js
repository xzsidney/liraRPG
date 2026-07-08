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

  // ---- PARTICLES (Mago: Estrelas Roxas/Douradas) ----
  function initParticles() {
    const container = document.getElementById('particles');
    const count = Math.floor(window.innerWidth / 70);
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const isGold = Math.random() > 0.7;
      const color = isGold ? '#e2c070' : '#a872fc';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        background: ${color};
        animation-delay: ${Math.random() * 12}s;
        animation-duration: ${10 + Math.random() * 20}s;
        opacity: ${0.1 + Math.random() * 0.4};
        position: absolute;
        border-radius: 50%;
      `;
      container.appendChild(p);
    }
  }

  function getTradicaoConfig(trad) {
    return TRADICAO_CONFIG[trad] || { cor: '#3a2550', corTexto: '#a872fc', icone: '🔮' };
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
    const afiliacoes = [...new Set(CHARACTERS_MAGO.map(c => c.informacoes_basicas.afiliacao))];
    filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">TODOS</button>`;
    afiliacoes.forEach(t => {
      filterBar.innerHTML += `<button class="filter-btn" data-filter="${t}">${t}</button>`;
    });

    cardGrid.innerHTML = '';
    CHARACTERS_MAGO.forEach((char, idx) => {
      const info = char.informacoes_basicas;
      const cfg = getTradicaoConfig(info.afiliacao);
      const card = document.createElement('article');
      card.className = `char-card card-loading`;
      card.dataset.afiliacao = info.afiliacao;
      card.dataset.id  = char.id;
      card.style.animationDelay = `${idx * 0.05}s`;
      card.style.setProperty('--card-glow-color', cfg.corTexto);
      card.style.setProperty('--card-glow-shadow', cfg.cor + 'aa');

      const arete = char.status_magicos.arete;

      card.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="${char.retrato}" alt="Retrato de ${info.nome}" loading="lazy" />
          <div class="card-img-overlay"></div>
          <div class="card-arete" title="Arete: ${arete}">Arete ${arete}</div>
          <div class="card-body">
            <div class="card-cla-badge" style="background:${cfg.cor}33; color:${cfg.corTexto}; border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${info.afiliacao}
            </div>
            <h2 class="card-nome">${info.nome}</h2>
            <p class="card-conceito">${info.essencia} · ${info.natureza}</p>
          </div>
        </div>
        <div class="card-hover-cta">Ler Padrão →</div>
      `;

      card.addEventListener('click', () => openDetail(char));
      cardGrid.appendChild(card);
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.filter;
        document.querySelectorAll('.char-card').forEach(card => {
          if (t === 'all' || card.dataset.afiliacao === t) card.style.display = 'block';
          else card.style.display = 'none';
        });
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ---- DETAIL ----
  function openDetail(char) {
    const cfg = getTradicaoConfig(char.informacoes_basicas.afiliacao);
    renderDetail(char, cfg);
    showView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDetail(char, cfg) {
    const info = char.informacoes_basicas;
    const status = char.status_magicos;
    
    const attrHTML = buildAttributes(char.atributos);
    const skillsHTML = buildSkills(char.habilidades);
    const advHTML = buildAdvantages(char.vantagens);
    const bgHTML = buildBackground(char, cfg);

    detailCont.innerHTML = `
      <div class="detail-grid">
        <div class="detail-portrait-col">
          <div class="detail-portrait-wrap" style="--detail-glow: ${cfg.cor}88;">
            <img src="${char.retrato}" alt="Retrato de ${info.nome}" />
            <div class="detail-portrait-overlay"></div>
            <div class="card-humanidade" title="Paradoxo">
              ${makeDots(status.paradoxo, 10, 'hum-dot', 'filled')}
            </div>
          </div>
          
          <div class="detail-stat-row" style="margin-top:18px;">
            <div class="detail-stat">
              <span class="stat-label">F. Vontade</span>
              <span class="stat-value" style="color:var(--mago-gold);">${status.forca_de_vontade || 4}</span>
            </div>
            <div class="detail-stat">
              <span class="stat-label">Humanidade</span>
              <span class="stat-value" style="color:var(--blood-bright);">6</span>
            </div>
            <div class="detail-stat">
              <span class="stat-label">P. Sangue</span>
              <span class="stat-value" style="color:#ff3333;">10</span>
            </div>
          </div>

          <div class="detail-badges" style="margin-top:18px;">
            <div class="detail-badge-row">
              <span class="detail-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
                ${cfg.icone} ${info.afiliacao}
              </span>
            </div>
            <div class="detail-badge-row">
              <span class="detail-badge" style="color:#aaa;border-color:var(--mago-border);">
                Essência: ${info.essencia}
              </span>
            </div>
          </div>
          ${buildAntecedentes(char.vantagens.antecedentes)}
        </div>

        <div class="detail-info-col">
          <div class="detail-header-block" style="--detail-clan-color:${cfg.corTexto};">
            <div class="detail-cla-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${info.afiliacao}
            </div>
            <h1 class="detail-nome">${info.nome}</h1>
            <p class="detail-conceito">${info.conceito} · Facção: ${info.faccao || 'Nenhuma'}</p>
            <p class="detail-descricao-cla">${info.descricao_tradicao}</p>
          </div>

          <div class="tabs-nav" role="tablist">
            <button class="tab-btn active" data-tab="atributos" role="tab">Atributos</button>
            <button class="tab-btn" data-tab="habilidades" role="tab">Habilidades</button>
            <button class="tab-btn" data-tab="vantagens" role="tab">Esferas & Vant.</button>
            <button class="tab-btn" data-tab="desperto" role="tab">Desperto</button>
            <button class="tab-btn" data-tab="historico" role="tab">Histórico & Foco</button>
          </div>

          <div class="tab-panel active" id="panel-atributos" role="tabpanel">${attrHTML}</div>
          <div class="tab-panel" id="panel-habilidades" role="tabpanel">${skillsHTML}</div>
          <div class="tab-panel" id="panel-vantagens" role="tabpanel">${advHTML}</div>
          <div class="tab-panel" id="panel-desperto" role="tabpanel">
            <p class="section-title">Estatísticas Desperto</p>
            <div class="skill-grid">
              <div class="skill-item">
                <span class="skill-name">Arete</span>
                <div class="skill-dots">${makeDots(status.arete, 5, 'skill-dot', 'filled')}</div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Paradoxo</span>
                <div class="skill-dots">${makeDots(status.paradoxo, 10, 'skill-dot', 'filled')}</div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Quintessência</span>
                <div class="skill-dots">${makeDots(status.quintessencia, 20, 'skill-dot', 'filled')}</div>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="panel-historico" role="tabpanel">${bgHTML}</div>
        </div>
      </div>
    `;

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
            <div class="attr-dots">${makeDots(v, 5, 'dot', 'filled')}</div>
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
              <div class="skill-dots">${makeDots(v, 5, 'skill-dot', 'filled')}</div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }

  function buildAdvantages(vantagens) {
    let html = '';
    
    // Esferas
    if(vantagens.esferas) {
      html += `<p class="section-title">Esferas Mágicas</p><div class="disc-grid">`;
      for(let e in vantagens.esferas) {
        if(vantagens.esferas[e] > 0) {
          html += `
          <div class="disc-item">
            <span class="disc-name">${formatKey(e)}</span>
            <div class="disc-dots">${makeDots(vantagens.esferas[e], 5, 'dot', 'filled')}</div>
          </div>`;
        }
      }
      html += `</div>`;
    }
    
    return html;
  }

  function buildAntecedentes(antec) {
    if(!antec) return '';
    let html = `<p class="section-title" style="margin-top:20px;">Antecedentes</p><div class="antec-grid">`;
    const skip = new Set(Object.keys(antec).filter(k => k.startsWith('detalhe_')));
    const entries = Object.entries(antec).filter(([k,v]) => !skip.has(k) && typeof v === 'number');
    entries.forEach(([k,v]) => {
      const detalhe = antec[`detalhe_${k}`];
      html += `
        <div class="antec-item">
          <span class="antec-nome">${formatKey(k)}</span>
          <div class="antec-valor">${makeDots(v, 5, 'antec-dot', 'filled')}</div>
          ${detalhe ? `<div class="antec-detalhe">${detalhe}</div>` : ''}
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

  function buildBackground(char, cfg) {
    const hist = char.historico;
    const focos = char.focos_e_paradigmas;
    
    let html = `
      <p class="section-title">Paradigma e Prática</p>
      <div class="paradigma-block">
        <div class="paradigma-nome">Paradigma: ${focos.paradigma}</div>
        <p style="color:#d1c5e6;"><strong>Focos Utilizados:</strong> ${focos.focos}</p>
      </div>
      
      <p class="section-title">Histórico e Despertar</p>
      <div class="historico-block">${hist.resumo}</div>
      <p class="section-title">Dicas de Interpretação</p>
      <div class="dicas-block">
        <p>${hist.dicas_de_interpretacao}</p>
      </div>
    `;
    
    if(char.qualidades_e_defeitos && char.qualidades_e_defeitos.length) {
      html += `<p class="section-title">Qualidades e Defeitos</p><div class="qualidades-list">`;
      char.qualidades_e_defeitos.forEach(q => {
        html += `<div class="qualidade-item">${q}</div>`;
      });
      html += `</div>`;
    }
    
    return html;
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

  // ---- INIT ----
  initParticles();
  renderGallery();

})();

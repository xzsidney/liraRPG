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
        background: #6abf69; /* Verde espírito */
        animation-delay: ${Math.random() * 12}s;
        animation-duration: ${8 + Math.random() * 16}s;
        opacity: ${0.1 + Math.random() * 0.3};
      `;
      container.appendChild(p);
    }
  }

  function getTriboConfig(tribo) {
    return TRIBO_CONFIG[tribo] || { cor: '#3a3a3a', corTexto: '#aaaaaa', icone: '🐺', apelido: tribo };
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
    const tribos = [...new Set(CHARACTERS_LOBO.map(c => c.informacoes_basicas.tribo))];
    filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">TODOS</button>`;
    tribos.forEach(t => {
      filterBar.innerHTML += `<button class="filter-btn" data-filter="${t}">${t}</button>`;
    });

    // Generate cards
    cardGrid.innerHTML = '';
    CHARACTERS_LOBO.forEach((char, idx) => {
      const info = char.informacoes_basicas;
      const cfg = getTriboConfig(info.tribo);
      const card = document.createElement('article');
      card.className = `char-card card-loading`;
      card.dataset.tribo = info.tribo;
      card.dataset.id  = char.id;
      card.style.animationDelay = `${idx * 0.05}s`;
      card.style.setProperty('--card-glow-color', cfg.corTexto);
      card.style.setProperty('--card-glow-shadow', cfg.cor + 'aa');

      const gloria = char.vantagens.renome.gloria;
      const gloriaDots = Array.from({length:5}, (_,i) =>
        `<span class="hum-dot ${i < gloria ? '' : 'empty'}" style="background:var(--blood-bright)"></span>`).join('');

      card.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="${char.retrato}" alt="Retrato de ${info.nome}" loading="lazy" />
          <div class="card-img-overlay"></div>
          <div class="card-humanidade" title="Glória: ${gloria}/5">${gloriaDots}</div>
          <div class="card-body">
            <div class="card-cla-badge" style="background:${cfg.cor}33; color:${cfg.corTexto}; border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${info.tribo}
            </div>
            <h2 class="card-nome">${info.nome}</h2>
            <p class="card-conceito">${info.augurio}</p>
          </div>
        </div>
        <div class="card-hover-cta">Ver Ficha →</div>
      `;

      card.addEventListener('click', () => openDetail(char));
      cardGrid.appendChild(card);
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.filter;
        document.querySelectorAll('.char-card').forEach(card => {
          if (t === 'all' || card.dataset.tribo === t) card.style.display = 'block';
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
    const cfg = getTriboConfig(char.informacoes_basicas.tribo);
    renderDetail(char, cfg);
    showView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDetail(char, cfg) {
    const info = char.informacoes_basicas;
    const status = char.status_garou;
    
    const attrHTML = buildAttributes(char.atributos);
    const skillsHTML = buildSkills(char.habilidades);
    const advHTML = buildAdvantages(char.vantagens);
    const bgHTML = buildBackground(char, cfg);

    detailCont.innerHTML = `
      <div class="detail-grid">
        <div class="detail-portrait-col">
          <div class="detail-portrait-wrap lobo-portrait-wrap" style="--detail-glow: ${cfg.cor}88;">
            <img src="${char.retrato}" alt="Retrato de ${info.nome}" />
            <div class="detail-portrait-overlay"></div>
          </div>
          
          <div class="lobo-meters">
            <div class="lobo-meter">
              <span class="meter-label" style="color:#ff4d4d;">Fúria</span>
              <div class="meter-dots">${makeDots(status.furia_inicial, 10, 'lobo-dot furia', 'filled')}</div>
            </div>
            <div class="lobo-meter">
              <span class="meter-label" style="color:var(--lobo-green-bright);">Gnose</span>
              <div class="meter-dots">${makeDots(status.gnose || 1, 10, 'lobo-dot gnose', 'filled')}</div>
            </div>
            <div class="lobo-meter">
              <span class="meter-label" style="color:#ffffff;">F. Vontade</span>
              <div class="meter-dots">${makeDots(status.forca_de_vontade, 10, 'lobo-dot vontade', 'filled')}</div>
            </div>
          </div>

          <div class="lobo-corruption">
            <div class="lobo-meter-small">
              <span class="corruption-label">Harano</span>
              <div class="meter-dots-small">${makeDots(status.harano, 5, 'lobo-dot harano', 'filled')}</div>
            </div>
            <div class="lobo-meter-small">
              <span class="corruption-label">Hauglosk</span>
              <div class="meter-dots-small">${makeDots(status.hauglosk, 5, 'lobo-dot hauglosk', 'filled')}</div>
            </div>
          </div>

          <div class="detail-badges" style="margin-top:18px;">
            <div class="detail-badge-row">
              <span class="detail-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
                ${cfg.icone} ${info.tribo} — ${cfg.apelido}
              </span>
            </div>
            <div class="detail-badge-row">
              <span class="detail-badge" style="color:var(--parchment-dim);border-color:var(--border-dark);">
                ${info.augurio}
              </span>
            </div>
          </div>
          ${buildAntecedentes(char.vantagens.antecedentes)}
        </div>

        <div class="detail-info-col">
          <div class="detail-header-block" style="--detail-clan-color:${cfg.corTexto};">
            <div class="detail-cla-badge" style="background:${cfg.cor}44;color:${cfg.corTexto};border-color:${cfg.corTexto}55;">
              ${cfg.icone} ${info.tribo}
            </div>
            <h1 class="detail-nome">${info.nome}</h1>
            <p class="detail-conceito">${info.patrono} · ${info.conceito}</p>
            <p class="detail-descricao-cla">${info.descricao_tribo}</p>
          </div>

          <div class="lobo-tabs-nav" role="tablist">
            <button class="lobo-tab-btn active" data-tab="atributos" role="tab">Atributos</button>
            <button class="lobo-tab-btn" data-tab="habilidades" role="tab">Habilidades</button>
            <button class="lobo-tab-btn" data-tab="vantagens" role="tab">Vantagens</button>
            <button class="lobo-tab-btn" data-tab="formas" role="tab">Formas</button>
            <button class="lobo-tab-btn" data-tab="historico" role="tab">Histórico</button>
          </div>

          <div class="tab-panel active" id="panel-atributos" role="tabpanel">${attrHTML}</div>
          <div class="tab-panel" id="panel-habilidades" role="tabpanel">${skillsHTML}</div>
          <div class="tab-panel" id="panel-vantagens" role="tabpanel">${advHTML}</div>
          <div class="tab-panel" id="panel-formas" role="tabpanel">
            <p class="lobo-section-title">Formas do Garou</p>
            <div class="formas-grid">
              <div class="forma-card">
                <div class="forma-header">Homídeo</div>
                <div class="forma-body">
                  <p><strong>Custo:</strong> Nenhum</p>
                  <p><strong>Bônus:</strong> Imunidade a prata</p>
                </div>
              </div>
              <div class="forma-card">
                <div class="forma-header">Glabro</div>
                <div class="forma-body">
                  <p><strong>Custo:</strong> 1 checagem de Fúria</p>
                  <p><strong>Testes Físicos:</strong> +2 dados</p>
                  <p><strong>Testes Sociais:</strong> -2 dados</p>
                  <p><strong>Regeneração:</strong> 1 por checagem de Fúria</p>
                </div>
              </div>
              <div class="forma-card forma-crinos">
                <div class="forma-header crinos">Crinos</div>
                <div class="forma-body">
                  <p><strong>Custo:</strong> 2 checagens de Fúria</p>
                  <p class="crinos-alert">Precisa gastar 1 Força de Vontade ou entra em Frenesi</p>
                  <p><strong>Testes Físicos:</strong> +4 dados</p>
                  <p><strong>Vitalidade:</strong> +4 níveis</p>
                  <p><strong>Regeneração:</strong> 2 por checagem de Fúria</p>
                  <p><strong>Garras:</strong> +3 dano</p>
                  <p><strong>Mordida:</strong> +1 dano Agravado</p>
                  <p><strong>Restrições:</strong> Sociais e Furtividade falham automaticamente. Provoca Delírio.</p>
                </div>
              </div>
              <div class="forma-card">
                <div class="forma-header">Hispo</div>
                <div class="forma-body">
                  <p><strong>Custo:</strong> 1 checagem de Fúria</p>
                  <p><strong>Testes Físicos:</strong> +2 dados</p>
                  <p><strong>Furtividade:</strong> -2 dados</p>
                  <p><strong>Regeneração:</strong> 1 por checagem de Fúria</p>
                  <p><strong>Mordida:</strong> +1 dano Agravado</p>
                  <p><strong>Testes Sociais:</strong> Limitados a lobos/garous</p>
                </div>
              </div>
              <div class="forma-card">
                <div class="forma-header">Lupus</div>
                <div class="forma-body">
                  <p><strong>Custo:</strong> Nenhum</p>
                  <p><strong>Bônus:</strong> Imunidade a prata</p>
                  <p><strong>Testes Sociais:</strong> Limitados a lobos/garous</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="panel-historico" role="tabpanel">${bgHTML}</div>
        </div>
      </div>
    `;

    detailCont.style.setProperty('--detail-clan-color', cfg.corTexto);
    detailCont.style.setProperty('--detail-clan-text',  cfg.corTexto);

    detailCont.querySelectorAll('.lobo-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        detailCont.querySelectorAll('.lobo-tab-btn').forEach(b => b.classList.remove('active'));
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
      <div class="lobo-attr-group">
        <p class="lobo-section-title">${g.label}</p>
        ${Object.entries(g.data).map(([k, v]) => `
          <div class="lobo-attr-row">
            <span class="lobo-attr-name">${formatKey(k)}</span>
            <div class="attr-dots">${makeDots(v, 5, 'lobo-dot-attr', 'filled')}</div>
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
        <div class="lobo-attr-group">
          <p class="lobo-section-title">${g.label}</p>
          <div class="lobo-skill-grid">
            ${items.map(([k,v]) => `
              <div class="lobo-skill-item">
                <span class="lobo-skill-name">${formatKey(k)}</span>
                <div class="skill-dots">${makeDots(v, 5, 'lobo-dot-attr', 'filled')}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function buildAdvantages(vantagens) {
    let html = '';
    
    // Renome
    html += `<p class="lobo-section-title">Renome</p><div class="antec-grid">`;
    for(let r in vantagens.renome) {
      html += `
        <div class="antec-item">
          <span class="antec-nome">${formatKey(r)}</span>
          <div class="antec-valor">${makeDots(vantagens.renome[r], 5, 'antec-dot', 'filled')}</div>
        </div>`;
    }
    html += `</div>`;
    
    // Dons e Rituais
    if(vantagens.dons_e_rituais) {
      html += `<p class="lobo-section-title">Dons e Rituais</p><div class="lobo-disc-grid">`;
      if(vantagens.dons_e_rituais.dons_iniciais) {
        vantagens.dons_e_rituais.dons_iniciais.forEach(d => {
          html += `<div class="lobo-disc-item"><span class="lobo-disc-name">${d}</span></div>`;
        });
      }
      if(vantagens.dons_e_rituais.rituais_iniciais) {
        vantagens.dons_e_rituais.rituais_iniciais.forEach(d => {
          html += `<div class="lobo-disc-item"><span class="lobo-disc-name">${d}</span></div>`;
        });
      }
      html += `</div>`;
    }
    
    return html;
  }

  function buildAntecedentes(antec) {
    if(!antec) return '';
    let html = `<p class="lobo-section-title" style="margin-top:20px;">Antecedentes</p><div class="antec-grid">`;
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
    let html = `
      <p class="lobo-section-title">Histórico e Resumo</p>
      <div class="historico-block">${hist.resumo}</div>
      <p class="lobo-section-title">Dicas de Interpretação</p>
      <div class="dicas-block">
        <div class="dicas-label">🎭 Como Interpretar</div>
        <p class="dicas-text">${hist.dicas_de_interpretacao}</p>
      </div>
    `;
    
    if(char.interdicao_da_tribo) {
      html += `
      <p class="lobo-section-title">Interdição da Tribo</p>
      <div class="fraqueza-block" style="background:${cfg.cor}22; border-color:${cfg.corTexto}33;">
        <div class="fraqueza-nome">⚠ ${char.interdicao_da_tribo.nome}</div>
        <p class="fraqueza-text">${char.interdicao_da_tribo.descricao}</p>
      </div>`;
    }
    
    if(char.qualidades_e_defeitos && char.qualidades_e_defeitos.length) {
      html += `<p class="lobo-section-title">Qualidades e Defeitos</p><div class="qualidades-list">`;
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

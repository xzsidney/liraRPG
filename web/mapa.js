(function() {
  'use strict';

  if (typeof REGIOES === 'undefined') {
    console.error('Dados de REGIOES não carregados. Verifique se o regiao.js foi incluído corretamente.');
    return;
  }

  // --- ELEMENTOS ---
  const mapContent = document.getElementById('map-content');
  const tooltip = document.getElementById('tooltip');
  const ttZona = document.getElementById('tt-zona');
  const ttNome = document.getElementById('tt-nome');
  const ttFac = document.getElementById('tt-fac');
  
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebar-close');
  const sideZona = document.getElementById('side-zona');
  const sideNome = document.getElementById('side-nome');
  const sideBadge = document.getElementById('side-badge');
  const sideRiq = document.getElementById('side-riq');
  const sideCrim = document.getElementById('side-crim');
  const sideSeg = document.getElementById('side-seg');
  const sideVis = document.getElementById('side-vis');
  const sideDiff = document.getElementById('side-diff');
  
  const diffContainer = document.getElementById('diff-container');
  const diffTitle = document.getElementById('diff-title');

  // Mapeamento de Zonas para Setores Angulares do Radar (em radianos) e Raios
  const ZONAS_MAP = {
    'zona_central': { minR: 0.05, maxR: 0.25, minA: 0, maxA: 2 * Math.PI },
    'zona_norte':   { minR: 0.35, maxR: 0.9, minA: 1.25 * Math.PI, maxA: 1.75 * Math.PI }, // Topo
    'zona_leste':   { minR: 0.35, maxR: 0.9, minA: 1.75 * Math.PI, maxA: 2.25 * Math.PI }, // Direita
    'zona_sul':     { minR: 0.35, maxR: 0.9, minA: 0.25 * Math.PI, maxA: 0.75 * Math.PI }, // Baixo
    'zona_oeste':   { minR: 0.35, maxR: 0.9, minA: 0.75 * Math.PI, maxA: 1.25 * Math.PI }  // Esquerda
  };

  function getFactionClass(dominio) {
    const dom = dominio.toLowerCase();
    if (dom.includes('vampiro')) return 'fac-vampiro';
    if (dom.includes('lobisomem')) return 'fac-lobisomem';
    if (dom.includes('mago')) return 'fac-mago';
    if (dom.includes('caçador') || dom.includes('cacador')) return 'fac-cacador';
    return 'fac-desconhecido';
  }

  function getFactionColor(dominio) {
    const dom = dominio.toLowerCase();
    if (dom.includes('vampiro')) return '#ff3333';
    if (dom.includes('lobisomem')) return '#33ff33';
    if (dom.includes('mago')) return '#cc33ff';
    if (dom.includes('caçador') || dom.includes('cacador')) return '#ff9933';
    return '#00ffff';
  }

  function getFactionIcon(dominio) {
    const dom = dominio.toLowerCase();
    if (dom.includes('vampiro')) return '🩸';
    if (dom.includes('lobisomem')) return '🐺';
    if (dom.includes('mago')) return '🔮';
    if (dom.includes('caçador') || dom.includes('cacador')) return '🔫';
    return '❓';
  }

  // --- RENDERIZAR MAPA ---
  function renderMap() {
    mapContent.innerHTML = '';
    
    // Objeto raiz REGIOES.sao_paulo_rpg_regioes
    const cidade = REGIOES.sao_paulo_rpg_regioes;

    // Semente fixa simples para gerar sempre as mesmas posições
    let seed = 42;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    for (const [key, zonaData] of Object.entries(cidade)) {
      const sector = ZONAS_MAP[key] || ZONAS_MAP['zona_central'];

      zonaData.bairros.forEach(bairro => {
        const r = sector.minR + random() * (sector.maxR - sector.minR);
        const a = sector.minA + random() * (sector.maxA - sector.minA);
        
        // Converter polar para cartesiano (% do container)
        // Centro é 50%, raio de 0 a 1 vira 0 a 50%
        const x = 50 + (r * Math.cos(a) * 50);
        const y = 50 + (r * Math.sin(a) * 50);

        const facClass = getFactionClass(bairro.dominio_faccao);
        const dot = document.createElement('div');
        dot.className = `node-bairro blip-anim ${facClass}`;
        
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        
        // Animação dessincronizada
        dot.style.animationDelay = `${random() * 2}s`;

        // Eventos
        dot.addEventListener('mouseenter', (e) => showTooltip(e, bairro, zonaData.nome));
        dot.addEventListener('mouseleave', hideTooltip);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          openSidebar(bairro, zonaData.nome);
        });

        mapContent.appendChild(dot);
      });
    }
  }

  // --- TOOLTIP ---
  function showTooltip(e, bairro, zonaNome) {
    const rect = e.target.getBoundingClientRect();
    ttZona.textContent = zonaNome;
    ttNome.textContent = bairro.nome;
    ttFac.textContent = bairro.dominio_faccao;
    ttFac.style.color = getFactionColor(bairro.dominio_faccao);
    
    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
    tooltip.style.top = rect.top - 10 + 'px';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  // --- SIDEBAR ---
  function openSidebar(bairro, zonaNome) {
    sideZona.textContent = zonaNome;
    sideNome.textContent = bairro.nome;
    
    const facColor = getFactionColor(bairro.dominio_faccao);
    const facIcon = getFactionIcon(bairro.dominio_faccao);
    sideBadge.innerHTML = `<span class="fac-badge" style="color:${facColor}; border-color:${facColor}55; background:${facColor}22">${facIcon} ${bairro.dominio_faccao}</span>`;
    
    sideRiq.textContent = bairro.riqueza;
    sideCrim.textContent = bairro.criminalidade;
    sideSeg.textContent = bairro.seguranca_publica;
    sideVis.textContent = bairro.visibilidade_midiatica;

    // Customizar cor do bloco de dificuldades com a cor da facção
    diffContainer.style.background = `${facColor}15`; // ~8% opacidade
    diffContainer.style.borderColor = `${facColor}55`; // ~30% opacidade
    diffTitle.style.color = facColor;

    // Dificuldades
    const diffs = bairro.dificuldades;
    const diffLabels = {
      teste_riqueza: 'Riqueza',
      teste_criminalidade: 'Criminalidade',
      teste_seguranca: 'Segurança',
      teste_dominio: 'Domínio',
      teste_visibilidade: 'Visibilidade'
    };

    sideDiff.innerHTML = Object.entries(diffs).map(([k, v]) => `
      <div class="diff-item" style="background:${facColor}22;">
        <span class="diff-name">${diffLabels[k]}</span>
        <span class="diff-val" style="color:${facColor}; text-shadow:0 0 5px ${facColor}55;">${v}</span>
      </div>
    `).join('');

    sidebar.classList.add('open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
  }

  sidebarClose.addEventListener('click', closeSidebar);
  
  // Como o map-area não cobre toda a tela com o novo layout de radar centralizado,
  // fechamos ao clicar em qualquer lugar que não seja o radar interno.
  document.querySelector('.mapa-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.mapa-container') || e.target === document.querySelector('.radar')) {
      closeSidebar();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // --- INIT ---
  renderMap();

})();

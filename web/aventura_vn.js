(function() {
  'use strict';

  // --- INIT DATA ---
  const params = new URLSearchParams(window.location.search);
  const charId = params.get('char_id');
  const missionId = params.get('mission_id');

  if (!charId || !missionId) {
    alert("Parâmetros inválidos. Abortando missão.");
    window.location.href = "vampiro.html";
    return;
  }

  const character = CHARACTERS.find(c => c.id === charId);
  const mission = MISSOES[missionId];

  if (!character || !mission) {
    alert("Dados não encontrados. Abortando missão.");
    window.location.href = "vampiro.html";
    return;
  }

  // --- GAME STATE ---
  let state = {
    fome: 10 - character.status.pontos_de_sangue,
    fdv: character.status.forca_de_vontade,
    hum: character.status.humanidade,
    currentSceneId: "Cena01"
  };

  if(state.fome < 0) state.fome = 0;
  if(state.fome > 5) state.fome = 5;

  // --- UI ELEMENTS ---
  document.getElementById('t-mission').textContent = mission.aventura.nome;
  document.getElementById('char-portrait').src = character.retrato;
  
  const elFome = document.getElementById('s-fome');
  const elFdv = document.getElementById('s-fdv');
  const elHum = document.getElementById('s-hum');

  const elTitle = document.getElementById('d-title');
  const elDesc = document.getElementById('d-desc');
  const elActions = document.getElementById('d-actions');

  // Dice Overlay
  const overlay = document.getElementById('dice-overlay');
  const diceInfo = document.getElementById('dice-info');
  const diceResults = document.getElementById('dice-results');
  const diceMsg = document.getElementById('dice-msg');
  const btnContinue = document.getElementById('btn-continue');

  function updateStatusUI() {
    elFome.textContent = state.fome;
    elFdv.textContent = state.fdv;
    elHum.textContent = state.hum;
  }

  function getStatValue(statName) {
    let val = 0;
    const s = statName.toLowerCase().trim().replace(/ /g, "_");
    for(const cat in character.atributos) {
      if(character.atributos[cat][s] !== undefined) val = character.atributos[cat][s];
    }
    for(const cat in character.habilidades) {
      if(character.habilidades[cat][s] !== undefined) val = character.habilidades[cat][s];
    }
    return val;
  }

  // --- DICE ANIMATION ---
  function executeAction(acao) {
    if (acao.teste === "Sucesso Automático") {
      if(acao.destino_sucesso) renderScene(acao.destino_sucesso);
      return;
    }

    // Calcula Pool
    const parts = acao.teste.split('+');
    let pool = 0;
    if(parts.length === 2) {
      pool = getStatValue(parts[0]) + getStatValue(parts[1]);
    } else {
      pool = getStatValue(parts[0]);
    }
    if (pool < 1) pool = 1;

    // Prepara Tela de Dados
    diceInfo.textContent = `Foco: ${acao.foco} (${acao.teste}) · Alvo: ${acao.dificuldade_sucessos} Sucesso(s)`;
    diceResults.innerHTML = '';
    diceMsg.textContent = '';
    btnContinue.style.display = 'none';
    overlay.classList.add('active');

    let successes = 0;
    let ones = 0;
    let finalSuccesses = 0;
    let isSuccess = false;

    // Rola com delay para dar efeito
    for(let i=0; i < pool; i++) {
      setTimeout(() => {
        const d = Math.floor(Math.random() * 10) + 1;
        const dieEl = document.createElement('div');
        dieEl.className = 'die';
        dieEl.textContent = d;
        
        if(d >= 6) {
          dieEl.classList.add('success');
          successes++;
        } else if(d === 1) {
          dieEl.classList.add('fail');
          ones++;
        }
        
        diceResults.appendChild(dieEl);
        
        // No último dado, calcula o resultado final
        if(i === pool - 1) {
          setTimeout(() => {
            finalSuccesses = successes - ones;
            isSuccess = finalSuccesses >= acao.dificuldade_sucessos;
            
            diceMsg.className = 'dice-final-msg ' + (isSuccess ? 'msg-success' : 'msg-fail');
            diceMsg.textContent = isSuccess ? `SUCESSO! (${finalSuccesses})` : `FALHA (${finalSuccesses})`;
            
            btnContinue.style.display = 'inline-block';
            btnContinue.onclick = () => {
              overlay.classList.remove('active');
              if(isSuccess && acao.destino_sucesso) renderScene(acao.destino_sucesso);
              else if(!isSuccess && acao.destino_falha) renderScene(acao.destino_falha);
            };
          }, 600);
        }
      }, i * 150); // Efeito cascata
    }
  }

  // --- RENDER SCENE ---
  function renderScene(sceneId) {
    const cena = mission.aventura.cenas.find(c => c.id === sceneId);
    if(!cena) return;

    state.currentSceneId = sceneId;
    elTitle.textContent = cena.titulo;
    elDesc.textContent = cena.descricao;
    elActions.innerHTML = "";

    if(cena.consequencias_api) {
      if(cena.consequencias_api.modificar_fome) state.fome += cena.consequencias_api.modificar_fome;
      if(cena.consequencias_api.modificar_forca_de_vontade) state.fdv += cena.consequencias_api.modificar_forca_de_vontade;
      if(cena.consequencias_api.modificar_humanidade) state.hum += cena.consequencias_api.modificar_humanidade;
      updateStatusUI();
    }

    if(cena.acoes && cena.acoes.length > 0) {
      cena.acoes.forEach(acao => {
        const btn = document.createElement('button');
        btn.className = 'vn-btn';
        
        btn.innerHTML = `<span class="vn-btn-meta">${acao.foco} · Teste: ${acao.teste}</span>${acao.texto}`;
        btn.onclick = () => executeAction(acao);
        elActions.appendChild(btn);
      });
    } else {
      const endText = document.createElement('div');
      endText.style.color = 'var(--gold)';
      endText.style.textAlign = 'center';
      endText.style.padding = '20px';
      endText.textContent = "— FIM DA CRÔNICA —";
      elActions.appendChild(endText);
    }
  }

  // --- BOOT ---
  updateStatusUI();
  renderScene(state.currentSceneId);

})();

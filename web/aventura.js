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
    fome: 10 - character.status.pontos_de_sangue, // Inverte para mecânica V5/antiga
    fdv: character.status.forca_de_vontade,
    hum: character.status.humanidade,
    currentSceneId: "Cena01"
  };

  if(state.fome < 0) state.fome = 0;
  if(state.fome > 5) state.fome = 5;

  // --- UI ELEMENTS ---
  const elNome = document.getElementById('p-nome');
  const elCla = document.getElementById('p-cla');
  const elFome = document.getElementById('p-fome');
  const elFdv = document.getElementById('p-fdv');
  const elHum = document.getElementById('p-hum');
  const elLogs = document.getElementById('logs');

  const elTitle = document.getElementById('s-title');
  const elDesc = document.getElementById('s-desc');
  const elActions = document.getElementById('s-actions');

  function updateStatusUI() {
    elNome.textContent = character.nome;
    elCla.textContent = character.cla;
    elFome.textContent = state.fome;
    elFdv.textContent = state.fdv;
    elHum.textContent = state.hum;
  }

  function addLog(text, type = "") {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.textContent = `> ${text}`;
    elLogs.appendChild(div);
    elLogs.scrollTop = elLogs.scrollHeight;
  }

  // --- DICE ENGINE ---
  // Acha o valor de um status (Atributo ou Habilidade) dinamicamente na ficha
  function getStatValue(statName) {
    let val = 0;
    const s = statName.toLowerCase().trim().replace(/ /g, "_");
    
    // Busca em Atributos
    for(const cat in character.atributos) {
      if(character.atributos[cat][s] !== undefined) val = character.atributos[cat][s];
    }
    // Busca em Habilidades
    for(const cat in character.habilidades) {
      if(character.habilidades[cat][s] !== undefined) val = character.habilidades[cat][s];
    }
    
    return val;
  }

  function rollDice(testeStr, diffSucessos) {
    if (testeStr === "Sucesso Automático") {
      addLog(`[AUTO-WIN] Progredindo sem teste.`, 'log-success');
      return true;
    }

    const parts = testeStr.split('+');
    let pool = 0;
    
    if(parts.length === 2) {
      const v1 = getStatValue(parts[0]);
      const v2 = getStatValue(parts[1]);
      pool = v1 + v2;
    } else {
      pool = getStatValue(parts[0]);
    }

    if (pool < 1) pool = 1;

    addLog(`Calculando Pool [${testeStr}]: ${pool} dados.`);
    
    let successes = 0;
    let ones = 0;
    let rolls = [];

    for(let i=0; i < pool; i++) {
      const d = Math.floor(Math.random() * 10) + 1;
      rolls.push(d);
      if(d >= 6) successes++;
      if(d === 1) ones++;
    }

    // Regra clássica: 1 anula sucesso
    const finalSuccesses = successes - ones;
    
    let colorClass = "";
    if(finalSuccesses >= diffSucessos) colorClass = 'log-success';
    else if(finalSuccesses < 0) colorClass = 'log-fail';
    else colorClass = 'log-fail';

    addLog(`Rolagem: [${rolls.join(', ')}] -> Sucessos Finais: ${finalSuccesses} (Alvo: ${diffSucessos})`, colorClass);

    return finalSuccesses >= diffSucessos;
  }

  // --- RENDER SCENE ---
  function renderScene(sceneId) {
    const cena = mission.aventura.cenas.find(c => c.id === sceneId);
    
    if(!cena) {
      addLog("ERRO CRÍTICO: Cena não encontrada.", "log-fail");
      return;
    }

    state.currentSceneId = sceneId;
    elTitle.textContent = cena.titulo;
    elDesc.textContent = cena.descricao;
    elActions.innerHTML = "";

    addLog(`--- CENA: ${cena.titulo} ---`);

    // Processa consequências
    if(cena.consequencias_api) {
      if(cena.consequencias_api.modificar_fome) {
        state.fome += cena.consequencias_api.modificar_fome;
        addLog(`FOME modificada em ${cena.consequencias_api.modificar_fome}`, 'log-alert');
      }
      if(cena.consequencias_api.modificar_forca_de_vontade) {
        state.fdv += cena.consequencias_api.modificar_forca_de_vontade;
        addLog(`VONTADE modificada em ${cena.consequencias_api.modificar_forca_de_vontade}`, 'log-alert');
      }
      if(cena.consequencias_api.modificar_humanidade) {
        state.hum += cena.consequencias_api.modificar_humanidade;
        addLog(`HUMANIDADE modificada em ${cena.consequencias_api.modificar_humanidade}`, 'log-fail');
      }
      updateStatusUI();
    }

    // Botões de Ação
    if(cena.acoes && cena.acoes.length > 0) {
      cena.acoes.forEach(acao => {
        const btn = document.createElement('button');
        btn.className = 'action-btn';
        
        let metaHtml = `<div class="action-meta"><span>FOCO: ${acao.foco}</span><span>TESTE: ${acao.teste}</span></div>`;
        btn.innerHTML = `${metaHtml}${acao.texto}`;

        btn.onclick = () => {
          addLog(`> Executando Ação: ${acao.foco}`, 'log-roll');
          const isSuccess = rollDice(acao.teste, acao.dificuldade_sucessos);
          
          if(isSuccess) {
            if(acao.destino_sucesso) renderScene(acao.destino_sucesso);
            else addLog("MISSÃO CONCLUÍDA.", 'log-success');
          } else {
            if(acao.destino_falha) renderScene(acao.destino_falha);
            else addLog("FALHA CRÍTICA - FIM DA LINHA.", 'log-fail');
          }
        };

        elActions.appendChild(btn);
      });
    } else {
      const endText = document.createElement('div');
      endText.style.color = 'var(--term-alert)';
      endText.style.textAlign = 'center';
      endText.style.padding = '20px';
      endText.textContent = "=== FIM DA TRANSMISSÃO ===";
      elActions.appendChild(endText);
    }
  }

  // --- BOOT ---
  updateStatusUI();
  addLog(`Conectado ao perfil do Operativo: ${character.nome}`);
  addLog(`Carregando missão: ${mission.aventura.nome}`);
  setTimeout(() => {
    renderScene(state.currentSceneId);
  }, 1000);

})();

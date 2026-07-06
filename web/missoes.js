(function() {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const charId = params.get('char_id');

  if (!charId) {
    alert("Nenhum personagem selecionado! Volte para a Galeria.");
    window.location.href = "vampiro.html";
    return;
  }

  // Encontrar o personagem
  const character = CHARACTERS.find(c => c.id === charId);
  if (character) {
    document.getElementById('char-header').style.display = 'flex';
    document.getElementById('char-img').src = character.retrato;
    document.getElementById('char-name').textContent = character.nome;
    document.getElementById('char-clan').textContent = `${character.cla} · ${character.seita}`;
  }

  // Renderizar a lista de Missões
  const missionList = document.getElementById('mission-list');
  
  if (typeof MISSOES !== 'undefined') {
    Object.entries(MISSOES).forEach(([mId, missionData]) => {
      const adv = missionData.aventura;
      
      const card = document.createElement('a');
      card.className = 'mission-card';
      card.href = `aventura.html?char_id=${charId}&mission_id=${mId}`;
      
      card.innerHTML = `
        <span class="mission-tag">${adv.tipo}</span>
        <h3 class="mission-title">${adv.nome}</h3>
        <p class="mission-desc" style="margin-bottom: 20px;">${adv.objetivo}</p>
        <div style="display: flex; gap: 10px;">
          <a href="aventura.html?char_id=${charId}&mission_id=${mId}" class="btn-missions" style="flex: 1; text-align: center; margin: 0; background: rgba(0,255,0,0.1); border-color: #33ff33; color: #33ff33;">Terminal Hacker</a>
          <a href="aventura_vn.html?char_id=${charId}&mission_id=${mId}" class="btn-missions" style="flex: 1; text-align: center; margin: 0;">Visual Novel</a>
        </div>
      `;
      
      missionList.appendChild(card);
    });
  } else {
    missionList.innerHTML = '<p style="color:red;">Erro ao carregar dados de missoes.js</p>';
  }

})();

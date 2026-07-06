const CHARACTERS = [
  {
    id: "andre_maranhao",
    nome: "André de Albuquerque Maranhão",
    cla: "Ventrue",
    seita: "Camarilla",
    natureza: "Galante",
    comportamento: "Diretor",
    conceito: "Profissional",
    descricao_cla: "Relutantes membros aristocratas, os de Sangue Azul se reconciliam com sua maldição impondo as Tradições e a Máscara.",
    retrato: "assets/portraits/andre_maranhao.png",
    atributos: {
      fisicos: { forca: 1, destreza: 3, vigor: 2 },
      sociais: { carisma: 4, manipulacao: 3, aparencia: 3 },
      mentais: { percepcao: 3, inteligencia: 2, raciocinio: 3 }
    },
    habilidades: {
      talentos: { prontidao: 1, esportes: 1, esquiva: 2, empatia: 3, intimidacao: 1, lideranca: 2, labia: 3 },
      pericias: { oficios: 2, etiqueta: 1, armas_de_fogo: 1, seguranca: 1 },
      conhecimentos: { financas: 1, investigacao: 3, linguistica: 1, medicina: 3, politica: 1 }
    },
    disciplinas: { dominacao: 4, fortitude: 1 },
    antecedentes: { recursos: 4, lacaios: 1, detalhe_lacaios: "Segurança Particular", influencia: 3 },
    virtudes: { consciencia: 2, autocontrole: 4, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida", "Segredo Sombrio"],
    historico: "André é o típico exemplar de homem de sucesso. Ele começou do zero, um desconhecido cuja única vantagem era um sobrenome tradicional na sociedade paulista, ele construiu uma tremenda fortuna e adquiriu uma grande influência no setor de construção de São Paulo. Chamando a atenção de uma Ventrue que desejava seus recursos, ele acabou se tornando sua cria. Quando o Sabá atacou São Paulo (há 30 anos) e causou grandes estragos aos membros da cidade, ele sobreviveu e sua senhora não. Então ele abraçou a oportunidade, se mudou para Curitiba, e agora já é o responsável por uma empresa crescente e de sucesso na cidade.",
    dicas: "Você é um profissional, educado e sob controle. Suas ambições são grandes, mas você sabe esperar a hora certa para fazer e cobrar favores. Quando você decide permitir que suas paixões aflorem, pessoas morrem.",
    fraqueza: { nome: "Paladar Exigente", descricao: "Cada Ventrue só pode se alimentar de um tipo de sangue mortal.", restricao: "Você prefere o sangue de garotas jovens embriagadas com vinho." }
  },
  {
    id: "antonio_canellas",
    nome: "Antônio Canellas",
    cla: "Gangrel",
    seita: "Camarilla",
    natureza: "Esperto",
    comportamento: "Caçador de Emoções",
    conceito: "Malandro",
    descricao_cla: "Os nômades Forasteiros são ferozes e selvagens. Estes errantes solitários são a fonte de muitas das histórias que comparam os vampiros a bestas sombrias.",
    retrato: "assets/portraits/antonio_canellas.png",
    atributos: {
      fisicos: { forca: 3, destreza: 2, vigor: 3 },
      sociais: { carisma: 4, manipulacao: 3, aparencia: 3 },
      mentais: { percepcao: 2, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 1, briga: 2, esquiva: 2, empatia: 2, manha: 3, labia: 3 },
      pericias: { oficios: 1, conducao: 2, armas_de_fogo: 2, seguranca: 2, furtividade: 2 },
      conhecimentos: { computador: 1, financas: 2, investigacao: 2 }
    },
    disciplinas: { fortitude: 3, metamorfose: 2 },
    antecedentes: { recursos: 2, aliados: 2, detalhe_aliados: "Contrabando de Peças", lacaios: 3, detalhe_lacaios: "Família Falsa" },
    virtudes: { consciencia: 1, autocontrole: 5, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Refúgio (um estacionamento vertical bem protegido)", "Favor (alguns membros lhe devem favores)"],
    historico: "Antônio não é um Gangrel típico, ele é um habitante da selva de pedra. Amante da civilização, ele nunca teve as inclinações selvagens que se espera de um Nômade. Assim que foi liberado por seu Senhor, Antônio passou a usar suas habilidades para conseguir conforto e segurança. Hoje ele possui um prédio no centro de Curitiba, um estacionamento vertical que serve de fachada para diversos negócios escusos.",
    dicas: "Você é um marginal boa pinta, um ladrão de carros que bebe o sangue de algumas pessoas que vêm estacionar os carros em seu estabelecimento. Você é um malandro, sedutor, que sabe o valor das amizades.",
    fraqueza: { nome: "Marcas da Besta", descricao: "Toda vez que um Gangrel entra em estado de frenesi ele ganha uma característica animalesca permanente. Para cada cinco características adquiridas, o Gangrel perde um ponto em um Atributo Social.", restricao: null }
  },
  {
    id: "aristeu_nogueira",
    nome: "Aristeu Nogueira",
    cla: "Toreador",
    seita: "Camarilla",
    natureza: "Penitente",
    comportamento: "Gozador",
    conceito: "Artista",
    descricao_cla: "Amantes da arte e da estética, os Degenerados estão presos na estagnação da não-vida. Os Toreador são apaixonados e decadentes.",
    retrato: "assets/portraits/aristeu_nogueira.png",
    atributos: {
      fisicos: { forca: 2, destreza: 3, vigor: 3 },
      sociais: { carisma: 4, manipulacao: 2, aparencia: 4 },
      mentais: { percepcao: 2, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 2, esportes: 3, esquiva: 2, empatia: 3, expressao: 3 },
      pericias: { etiqueta: 2, armas_de_fogo: 2, performance: 3, seguranca: 1, furtividade: 1 },
      conhecimentos: { computador: 2, financas: 1, investigacao: 1, linguistica: 1 }
    },
    disciplinas: { presenca: 3, rapidez: 1, auspicios: 1 },
    antecedentes: { recursos: 3, rebanho: 3, detalhe_rebanho: "Fãs", contatos: 1, detalhe_contatos: "Mídia" },
    virtudes: { consciencia: 5, autocontrole: 3, coragem: 2 },
    status: { forca_de_vontade: 2, humanidade: 8, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Refúgio (Estúdio Fotográfico)"],
    historico: "A vida nunca foi difícil para Aristeu, pois ele nasceu dotado de beleza. Filho único de família de classe média, ele se tornou modelo infantil com seis anos. Após entrevista para participar de um curta-metragem ele encontrou a bela produtora do projeto, e ambos iniciaram um caso. Ela era um membro da Camarilla, e em um impulso de momento, Aristeu foi abraçado. Sua Senhora foi destruída por abraçar sem permissão do Príncipe.",
    dicas: "Você não queria ser um vampiro, e sequer sabia que sua amante era uma vampira. Por fora, você age como se não ligasse para nada e faz piadas com tudo, mas internamente você teme o Príncipe horrivelmente.",
    fraqueza: { nome: "Transe da Beleza / Fascinação", descricao: "Quando um Toreador vê algo realmente maravilhoso, precisa ser bem sucedido num teste de Autocontrole (dif. 6) ou se encantará. O Toreador será tomado por um êxtase de fascinação durante uma cena e não pode se defender se atacado.", restricao: null }
  },
  {
    id: "benedito_meia_legua",
    nome: "Benedito Meia-Légua",
    cla: "Nosferatu",
    seita: "Camarilla",
    natureza: "Sobrevivente",
    comportamento: "Gozador",
    conceito: "Investigador",
    descricao_cla: "Deformados e reclusos, os horrorosos Ratos de Esgoto estão para sempre banidos da sociedade humana, mas guardam segredos sobre a escuridão que os esconde.",
    retrato: "assets/portraits/benedito_meia_legua.png",
    atributos: {
      fisicos: { forca: 5, destreza: 2, vigor: 3 },
      sociais: { carisma: 3, manipulacao: 2, aparencia: 0 },
      mentais: { percepcao: 4, inteligencia: 1, raciocinio: 3 }
    },
    habilidades: {
      talentos: { prontidao: 3, esportes: 1, briga: 3, esquiva: 3, intimidacao: 1, labia: 2 },
      pericias: { empatia_com_animais: 2, oficios: 1, armas_de_fogo: 3, seguranca: 2, furtividade: 1 },
      conhecimentos: { investigacao: 3, direito: 2 }
    },
    disciplinas: { ofuscacao: 2, animalismo: 2, potencia: 1 },
    antecedentes: { contatos: 2, detalhe_contatos: "Mendigos", lacaios: 5, detalhe_lacaios: "Animais de Rua" },
    virtudes: { consciencia: 3, autocontrole: 3, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Refúgio (Prédio antigo, onde os militares faziam interrogatórios)", "Inofensivo para Animais"],
    historico: "Benedito era um simples investigador da polícia em uma época perigosa para o país, um pouco antes do golpe militar. Quando o exército assumiu o governo, vários de seus opositores desapareceram. O chefe do departamento onde Benedito trabalhava era um destes opositores, e todos os subordinados dele foram levados para interrogatório — Benedito nunca foi liberado, acabando carniçal para um vampiro Nosferatu. Após provar seu valor como investigador, ele acabou sendo abraçado.",
    dicas: "Profissionalismo define seu ser, mas curiosidade move seus atos. Você é um investigador, e aprendeu a gostar do papel de monstro e a usar ratos, pombos, cães e gatos para aprender segredos. Piadista e irreverente, nada é sagrado.",
    fraqueza: { nome: "Deformidade Repugnante", descricao: "Aparência permanentemente 0. A maioria das ações Sociais baseadas na primeira impressão falham automaticamente.", restricao: "Você tem a carne e a pele secas e quebradiças, deixando pequenos pedaços que parecem madeira seca pelo chão." }
  },
  {
    id: "daniel_freitas",
    nome: "Daniel Gomes de Freitas",
    cla: "Brujah",
    seita: "Camarilla",
    natureza: "Arquiteto",
    comportamento: "Durão",
    conceito: "Estudante",
    descricao_cla: "A Ralé, rebeldes e insurgentes, lutando com paixão por suas causas desesperadas. Os Brujah sonham com uma sociedade perfeita para os vampiros.",
    retrato: "assets/portraits/daniel_freitas.png",
    atributos: {
      fisicos: { forca: 4, destreza: 3, vigor: 3 },
      sociais: { carisma: 3, manipulacao: 2, aparencia: 3 },
      mentais: { percepcao: 2, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 2, briga: 1, empatia: 3, expressao: 1, intimidacao: 2, lideranca: 2, manha: 1, labia: 1 },
      pericias: { conducao: 1, armas_de_fogo: 1, armas_brancas: 2, performance: 3, seguranca: 1, furtividade: 1 },
      conhecimentos: { academicos: 1, computador: 1, investigacao: 1, medicina: 1, politica: 1 }
    },
    disciplinas: { presenca: 3, rapidez: 2 },
    antecedentes: { recursos: 2, contatos: 3, detalhe_contatos: "Grêmios Estudantis", influencia: 2 },
    virtudes: { consciencia: 3, autocontrole: 3, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida"],
    historico: "Daniel era um defensor das minorias em seu tempo de estudante, uma voz potente em meio às multidões. Esta pode ter sido a razão de ele ter sido abraçado, logo após ser fuzilado pelos militares em 66. Seu senhor era um infiltrado europeu, encarregado de vigiar a Camarilla brasileira durante os anos de ditadura. Agora Daniel ainda se envolve em problemas com o Principado de Curitiba devido aos seus atos de rebeldia.",
    dicas: "Você ainda esquece a hora de ficar quieto, mas nunca desobedeceu quando a desobediência poderia causar sua destruição. Você viveu por uma causa, e morreu por ela. Agora sua causa é você mesmo.",
    fraqueza: { nome: "Paixão Ardente", descricao: "A dificuldade dos testes para se evitar o frenesi é dois níveis mais alta para os membros do clã Brujah.", restricao: null }
  },
  {
    id: "djalma_dutra",
    nome: "Djalma Dutra",
    cla: "Toreador",
    seita: "Camarilla",
    natureza: "Sobrevivente",
    comportamento: "Durão",
    conceito: "Motoqueira",
    descricao_cla: "Amantes da arte e da estética, os Degenerados estão presos na estagnação da não-vida. Os Toreador são apaixonados e decadentes.",
    retrato: "assets/portraits/djalma_dutra.png",
    atributos: {
      fisicos: { forca: 3, destreza: 5, vigor: 2 },
      sociais: { carisma: 3, manipulacao: 1, aparencia: 2 },
      mentais: { percepcao: 4, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 3, esportes: 1, briga: 3, esquiva: 3, intimidacao: 2, manha: 1 },
      pericias: { armas_de_fogo: 2, armas_brancas: 3, seguranca: 3, furtividade: 1 },
      conhecimentos: { computador: 1, investigacao: 2, medicina: 2 }
    },
    disciplinas: { presenca: 2, rapidez: 2, auspicios: 1 },
    antecedentes: { recursos: 1, rebanho: 2, contatos: 2, detalhe_contatos: "Antiga Gangue", aliados: 2, detalhe_aliados: "Policial Seduzido" },
    virtudes: { consciencia: 2, autocontrole: 3, coragem: 5 },
    status: { forca_de_vontade: 4, humanidade: 5, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Equilíbrio Perfeito"],
    historico: "Djalma não parece uma Toreador típica, e não é. Desordeira, criminosa, violenta, esquentada... ela tinha tudo para se tornar uma presidiária. Visada por um Brujah para se tornar mais uma cria em sua gangue, Djalma foi capturada e abraçada por uma Toreador como uma manobra política. Após cumprir seu papel nos planos de sua Senhora, Djalma foi liberada da servidão e esquecida pelo clã. Mas ela não é o tipo de pessoa a ficar esquecida por muito tempo.",
    dicas: "Você foi usada, abusada e descartada. Você é um tanto estourada, e ainda acha que uma boa mão na cara resolve muita coisa. Se eles te deram algumas habilidades, você vai usar.",
    fraqueza: { nome: "Transe da Beleza / Fascinação", descricao: "Quando um Toreador vê algo realmente maravilhoso, precisa ser bem sucedido num teste de Autocontrole (dif. 6) ou se encantará. O Toreador será tomado por um êxtase de fascinação durante uma cena.", restricao: null }
  },
  {
    id: "dulce_maia",
    nome: "Dulce Maia",
    cla: "Ventrue",
    seita: "Camarilla",
    natureza: "Competidor",
    comportamento: "Esperto",
    conceito: "Acompanhante",
    descricao_cla: "Relutantes membros aristocratas, os de Sangue Azul se reconciliam com sua maldição impondo as Tradições e a Máscara.",
    retrato: "assets/portraits/dulce_maia.png",
    atributos: {
      fisicos: { forca: 1, destreza: 4, vigor: 1 },
      sociais: { carisma: 2, manipulacao: 4, aparencia: 4 },
      mentais: { percepcao: 3, inteligencia: 3, raciocinio: 2 }
    },
    habilidades: {
      talentos: { esportes: 1, esquiva: 2, empatia: 3, labia: 3 },
      pericias: { conducao: 2, etiqueta: 3, armas_de_fogo: 3, performance: 2, seguranca: 2, furtividade: 1 },
      conhecimentos: { computador: 1, investigacao: 2, linguistica: 1, politica: 1 }
    },
    disciplinas: { dominacao: 3, presenca: 2 },
    antecedentes: { status: 2, recursos: 2, lacaios: 1, contatos: 2, detalhe_contatos: "Traficantes" },
    virtudes: { consciencia: 3, autocontrole: 3, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida"],
    historico: "Dulce é uma personificação da ambição. Escolhida por uma Ventrue devido a sua beleza, ela foi transformada em carniçal, serviçal e amante daquela que acabaria por se tornar sua senhora. Inicialmente considerada apenas uma 'carinha bonita', a perspicácia da jovem desconcerta alguns membros mais conservadores.",
    dicas: "Você era julgada pela sua aparência, e aprendeu a usar isso a seu favor. Você parece uma patricinha, avoada e fútil; mas isso tudo é uma cortina de fumaça que esconde sua real personalidade.",
    fraqueza: { nome: "Paladar Exigente", descricao: "Cada Ventrue só pode se alimentar de um tipo de sangue mortal.", restricao: "Você prefere o sangue de adolescentes sob a influência de drogas." }
  },
  {
    id: "elisa_abramovich",
    nome: "Elisa Kauffmann Abramovich",
    cla: "Tremere",
    seita: "Camarilla",
    natureza: "Tradicionalista",
    comportamento: "Caçador de Emoções",
    conceito: "Assassina",
    descricao_cla: "Um clã de magos do sangue, os Feiticeiros não são nada confiáveis... e sim temíveis.",
    retrato: "assets/portraits/elisa_abramovich.png",
    atributos: {
      fisicos: { forca: 2, destreza: 3, vigor: 1 },
      sociais: { carisma: 1, manipulacao: 3, aparencia: 2 },
      mentais: { percepcao: 4, inteligencia: 3, raciocinio: 3 }
    },
    habilidades: {
      talentos: { empatia: 1, lideranca: 2, labia: 2 },
      pericias: { oficios: 1, armas_de_fogo: 1, armas_brancas: 2, seguranca: 2, furtividade: 3 },
      conhecimentos: { academicos: 2, investigacao: 3, linguistica: 2, medicina: 2, ocultismo: 3, ciencia: 1 }
    },
    disciplinas: { taumaturgia: 5, detalhe_taumaturgia: ["Sedução das Chamas 5", "Linha do Sangue 3"] },
    antecedentes: { status: 3, recursos: 3, lacaios: 1, detalhe_lacaios: "Capela" },
    virtudes: { consciencia: 1, autocontrole: 4, coragem: 5 },
    status: { forca_de_vontade: 5, humanidade: 5, pontos_de_sangue: 10 },
    qualidades: ["Sono Leve", "Memória Eidética", "Bom Senso"],
    historico: "A história de Elisa é considerada comum para as mulheres nascidas no começo do século passado: inteligente, via todas as oportunidades de aprendizado passarem fora de seu alcance. Um tutor percebeu seu talento místico e ela foi recrutada para o clã Tremere. Seu talento para as linhas taumatúrgicas impressionou seus colegas. Hoje Elisa é a Mão Esquerda de Lis Losentaff — ela executa os alvos definidos.",
    dicas: "Você é mais velha e poderosa do que os neófitos comuns. O machismo a incomoda, mas o feminismo atual a irrita. Você acredita em tradição, respeito, hierarquia, ordem. Os únicos momentos em que você libera suas emoções é quando o fogo corre por seus dedos.",
    fraqueza: { nome: "Laço de Sangue do Conselho", descricao: "Todo neófito Tremere tomou do sangue dos sete anciões do clã. A dificuldade de qualquer tentativa de Dominação feita por um superior do clã é reduzida em 1. Um Tremere é fiel ao clã acima de tudo.", restricao: null }
  },
  {
    id: "luisa_mahin",
    nome: "Luísa Mahin",
    cla: "Brujah",
    seita: "Camarilla",
    natureza: "Celebrante",
    comportamento: "Bon Vivant",
    conceito: "Diletante",
    descricao_cla: "A Ralé, rebeldes e insurgentes, lutando com paixão por suas causas desesperadas. Os Brujah sonham com uma sociedade perfeita para os vampiros.",
    retrato: "assets/portraits/luisa_mahin.png",
    atributos: {
      fisicos: { forca: 2, destreza: 4, vigor: 2 },
      sociais: { carisma: 3, manipulacao: 4, aparencia: 3 },
      mentais: { percepcao: 3, inteligencia: 2, raciocinio: 1 }
    },
    habilidades: {
      talentos: { prontidao: 1, esquiva: 3, empatia: 3, expressao: 1, manha: 2, labia: 3 },
      pericias: { conducao: 1, etiqueta: 1, armas_de_fogo: 3, performance: 1, seguranca: 1, furtividade: 2 },
      conhecimentos: { academicos: 1, computador: 2, investigacao: 2 }
    },
    disciplinas: { presenca: 2, potencia: 3 },
    antecedentes: { mentor: 2, detalhe_mentor: "Nestor Garcia", recursos: 3, status: 2 },
    virtudes: { consciencia: 3, autocontrole: 2, coragem: 5 },
    status: { forca_de_vontade: 5, humanidade: 5, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida"],
    historico: "Luísa sempre teve a atitude errada na hora errada. Primogênita nascida em família rica e influente no Rio de Janeiro, desde cedo demonstrava que a vida da alta sociedade não servia para ela. Deserdada ao agredir seu noivo (casamento arranjado pelos pais), ela acabou envolvida com pessoas perigosas, o que a levou aos braços e presas de seu senhor, um Brujah criminoso. Eventualmente ela escapou, buscando refúgio em Curitiba.",
    dicas: "Você é dona de seu próprio nariz, e isso você jamais esquece. Nestor ajudou você em um momento difícil, e você ainda irá pagar sua bondade. Baladas, bebidas, sexo: cada noite é uma nova noite.",
    fraqueza: { nome: "Paixão Ardente", descricao: "A dificuldade dos testes para se evitar o frenesi é dois níveis mais alta para os membros do clã Brujah.", restricao: null }
  },
  {
    id: "nuta_james",
    nome: "Nuta James",
    pseudonimo: "Evangeline",
    cla: "Nosferatu",
    seita: "Camarilla",
    natureza: "Celebrante",
    comportamento: "Bon Vivant",
    conceito: "Acompanhante",
    descricao_cla: "Deformados e reclusos, os horrorosos Ratos de Esgoto estão para sempre banidos da sociedade humana, mas guardam segredos sobre a escuridão que os esconde.",
    retrato: "assets/portraits/nuta_james.png",
    atributos: {
      fisicos: { forca: 5, destreza: 3, vigor: 2 },
      sociais: { carisma: 3, manipulacao: 4, aparencia: 0 },
      mentais: { percepcao: 2, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 1, esquiva: 2, empatia: 3, expressao: 2, manha: 2, labia: 3 },
      pericias: { conducao: 1, etiqueta: 3, seguranca: 3, furtividade: 2 },
      conhecimentos: { computador: 1, financas: 1, investigacao: 3 }
    },
    disciplinas: { ofuscacao: 4, potencia: 1 },
    antecedentes: { recursos: 2, contatos: 3, detalhe_contatos: "Acompanhantes", status: 2 },
    virtudes: { consciencia: 5, autocontrole: 2, coragem: 3 },
    status: { forca_de_vontade: 3, humanidade: 7, pontos_de_sangue: 10 },
    qualidades: ["Ingerir Comida", "Refúgio (prostíbulo de luxo 'Fleurami')"],
    historico: "Nuta tinha uma vida de prazeres e sucesso. Ela recebia vários rótulos: Modelo, atriz, amante, prostituta. Sua beleza era tida como uma das mais desejáveis de Curitiba. Infelizmente tais qualidades lhe concederam a indesejável atenção de um influente e imoral político, o qual destruiu sua vida por meio de drogas. Destruída, ela recebeu uma proposta na sarjeta: sua beleza em troca da oportunidade de vingança.",
    dicas: "Você pode ser horripilante, mas ainda sabe aproveitar a boa vida. Sua disciplina permite enganar quase todos. O maldito que arruinou sua vida já apodreceu há muito tempo, mas canalhas existem aos montes.",
    fraqueza: { nome: "Deformidade Repugnante", descricao: "Aparência permanentemente 0. A maioria das ações Sociais baseadas na primeira impressão falham automaticamente.", restricao: "Você não possui nenhum pêlo no corpo e sua pele possui a viscosidade de uma lesma, deixando muco onde você encostar." }
  },
  {
    id: "pajeu",
    nome: "Pajeú",
    cla: "Gangrel",
    seita: "Camarilla",
    natureza: "Sobrevivente",
    comportamento: "Celebrante",
    conceito: "Caçadora",
    descricao_cla: "Os nômades Forasteiros são ferozes e selvagens. Estes errantes solitários são a fonte de muitas das histórias que comparam os vampiros a bestas sombrias.",
    retrato: "assets/portraits/pajeu.png",
    atributos: {
      fisicos: { forca: 3, destreza: 4, vigor: 3 },
      sociais: { carisma: 1, manipulacao: 1, aparencia: 4 },
      mentais: { percepcao: 4, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 3, esportes: 2, briga: 3, esquiva: 2, intimidacao: 3 },
      pericias: { empatia_com_animais: 1, armas_brancas: 2, furtividade: 3, sobrevivencia: 3 },
      conhecimentos: { investigacao: 3, medicina: 2 }
    },
    disciplinas: { metamorfose: 4, animalismo: 1 },
    antecedentes: { mentor: 4, detalhe_mentor: "Rafael Rodriguez", lacaios: 3, detalhe_lacaios: "Cães de Guarda" },
    virtudes: { consciencia: 2, autocontrole: 3, coragem: 5 },
    status: { forca_de_vontade: 5, humanidade: 5, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida", "Refúgio (uma casa bem murada, protegida pelos seus Lacaios)"],
    historico: "A Gangrel conhecida como Pajeú não tem a mais complexa das histórias. Sua família terminou na noite em que um grupo de membros passou pela região, incumbido de caçar um grupo de lobisomens. A jovem garota lutou até o fim, e antes de sucumbir conseguiu vencer um dos inimigos ao cortar sua cabeça com um facão. Em respeito a sua força, ela foi abraçada ali mesmo, recebendo o nome e o posto do vampiro que ela matou.",
    dicas: "Deixe as frescuras para quem quer ser fresco. Você é um monstro, um animal, uma caçadora. Você respeita a força, despreza os fracos, e não tem muita serventia pra frouxos. Felizmente você é bonita, muito bonita: e isso é uma excelente arma.",
    fraqueza: { nome: "Marcas da Besta", descricao: "Toda vez que um Gangrel entra em estado de frenesi ele ganha uma característica animalesca permanente. Para cada cinco características adquiridas, o Gangrel perde um ponto em um Atributo Social.", restricao: null }
  },
  {
    id: "rafael_mourao",
    nome: "Rafael Mourão",
    cla: "Brujah",
    seita: "Camarilla",
    natureza: "Arquiteto",
    comportamento: "Durão",
    conceito: "Estudante",
    descricao_cla: "A Ralé, rebeldes e insurgentes, lutando com paixão por suas causas desesperadas. Os Brujah sonham com uma sociedade perfeita para os vampiros.",
    retrato: "assets/portraits/rafael_mourao.png",
    atributos: {
      fisicos: { forca: 4, destreza: 3, vigor: 3 },
      sociais: { carisma: 3, manipulacao: 2, aparencia: 3 },
      mentais: { percepcao: 2, inteligencia: 2, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 2, briga: 1, empatia: 3, expressao: 1, intimidacao: 2, lideranca: 2, manha: 1, labia: 1 },
      pericias: { conducao: 1, armas_de_fogo: 1, armas_brancas: 2, performance: 3, seguranca: 1, furtividade: 1 },
      conhecimentos: { academicos: 1, computador: 1, investigacao: 1, medicina: 1, politica: 1 }
    },
    disciplinas: { presenca: 3, rapidez: 2 },
    antecedentes: { recursos: 2, contatos: 3, detalhe_contatos: "Grêmios Estudantis", influencia: 2 },
    virtudes: { consciencia: 3, autocontrole: 3, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Rubor de Saúde", "Ingerir Comida"],
    historico: "Rafael Mourão era estudante de direito em Curitiba nos anos 70, um filho de família tradicional que não conseguia fechar os olhos para as injustiças ao redor. Envolvido com movimentos estudantis clandestinos durante a ditadura, foi abraçado por um Brujah que reconheceu nele o mesmo fogo que move todos os membros do clã. Hoje navega entre sua lealdade ao clã e suas convicções pessoais, tentando não perder nem uma nem outra.",
    dicas: "Você ainda acredita que pode mudar as coisas de dentro do sistema. É uma visão ingênua, mas é a que te mantém em pé. Cuidado para que a Paixão Ardente não te queime antes da hora.",
    fraqueza: { nome: "Paixão Ardente", descricao: "A dificuldade dos testes para se evitar o frenesi é dois níveis mais alta para os membros do clã Brujah.", restricao: null }
  },
  {
    id: "severo_fournier",
    nome: "Severo Fournier",
    cla: "Tremere",
    seita: "Camarilla",
    natureza: "Fanático",
    comportamento: "Sobrevivente",
    conceito: "Professor",
    descricao_cla: "Um clã de magos do sangue, os Feiticeiros não são nada confiáveis... e sim temíveis.",
    retrato: "assets/portraits/severo_fournier.png",
    atributos: {
      fisicos: { forca: 1, destreza: 2, vigor: 3 },
      sociais: { carisma: 4, manipulacao: 4, aparencia: 2 },
      mentais: { percepcao: 2, inteligencia: 4, raciocinio: 2 }
    },
    habilidades: {
      talentos: { prontidao: 2, empatia: 2, lideranca: 2, labia: 3 },
      pericias: { conducao: 1, etiqueta: 2, armas_brancas: 2, performance: 2, furtividade: 2 },
      conhecimentos: { academicos: 3, computador: 2, investigacao: 3, medicina: 1, ocultismo: 2, ciencia: 2 }
    },
    disciplinas: { auspicios: 2, dominacao: 3 },
    antecedentes: { recursos: 3, contatos: 2, detalhe_contatos: "Faculdades", influencia: 2 },
    virtudes: { consciencia: 1, autocontrole: 5, coragem: 4 },
    status: { forca_de_vontade: 4, humanidade: 6, pontos_de_sangue: 10 },
    qualidades: ["Vontade de Ferro"],
    historico: "Severo tinha tudo: uma bela esposa, filhos obedientes, um ótimo emprego como professor universitário. Mas então um pergaminho estranho lhe foi enviado para tradução, e em pouco tempo ele perdeu tudo. Sua família foi assassinada, seu emprego retirado. Aquele pergaminho continha um fragmento do Livro de Nod, e Severo acabou sendo abraçado como medida para impedir a existência dos vampiros de ser levada a público.",
    dicas: "Você odeia o clã, mas o laço de sangue é forte demais. Então você decidiu se tornar alguém em posição de liderança, para um dia se vingar. Você é frio e calculista, e finge ser um peão leal. Um dia, eles verão a verdade.",
    fraqueza: { nome: "Laço de Sangue do Conselho", descricao: "Todo neófito Tremere tomou do sangue dos sete anciões do clã. A dificuldade de qualquer tentativa de Dominação feita por um superior do clã é reduzida em 1. Um Tremere é fiel ao clã acima de tudo.", restricao: null }
  }
];

const CLA_CONFIG = {
  "Ventrue":  { cor: "#1a3a5c", corTexto: "#6fa8dc", icone: "👑", apelido: "Sangue Azul" },
  "Gangrel":  { cor: "#3d2b1f", corTexto: "#c4894a", icone: "🐺", apelido: "Forasteiro" },
  "Toreador": { cor: "#5c1a3a", corTexto: "#e07aad", icone: "🌹", apelido: "Degenerado" },
  "Nosferatu":{ cor: "#1a2a1a", corTexto: "#6abf69", icone: "🦇", apelido: "Rato de Esgoto" },
  "Brujah":   { cor: "#5c1a1a", corTexto: "#e07070", icone: "✊", apelido: "A Ralé" },
  "Tremere":  { cor: "#2a1a5c", corTexto: "#9a7ae0", icone: "🔮", apelido: "Feiticeiro" }
};

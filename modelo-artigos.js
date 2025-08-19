// modelo-artigos.js
// Definição centralizada de todos os artigos do código penal
// Altere os valores aqui para atualizar automaticamente a calculadora

const ARTIGOS = {
  // Crimes Diversos (101–103)
  "azaralhamento-recrutamento": {
    numero: "101",
    nome: "Azaralhamento Recrutamento**",
    tempo: 150,
    multa: 25000,
    categoria: "Crimes Diversos"
  },
  "agressao-funcionario": {
    numero: "102",
    nome: "Agressão a Funcionário Público**",
    tempo: 15,
    multa: 8000,
    categoria: "Crimes Diversos"
  },
  "prevaricacao": {
    numero: "103",
    nome: "Prevaricação**",
    tempo: 60,
    multa: 60000,
    categoria: "Crimes Diversos"
  },
  
  // Crimes Contra a Vida (104–108)
  "homicidio-doloso-qualificado": {
    numero: "104",
    nome: "Homicídio Doloso Qualificado**",
    tempo: 40,
    multa: 45000,
    categoria: "Crimes Contra a Vida"
  },
  "homicidio-doloso": {
    numero: "105",
    nome: "Homicídio Doloso**",
    tempo: 35,
    multa: 40000,
    categoria: "Crimes Contra a Vida"
  },
  "tentativa-homicidio": {
    numero: "106",
    nome: "Tentativa de Homicídio**",
    tempo: 20,
    multa: 8000,
    categoria: "Crimes Contra a Vida"
  },
  "homicidio-culposo": {
    numero: "107",
    nome: "Homicídio Culposo",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra a Vida"
  },
  "homicidio-culposo-transito": {
    numero: "108",
    nome: "Homicídio Culposo no Trânsito",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra a Vida"
  },
  
  // Crimes Contra Direitos Fundamentais (109–111)
  "lesao-corporal": {
    numero: "109",
    nome: "Lesão Corporal",
    tempo: 6,
    multa: 7000,
    categoria: "Crimes Contra Direitos Fundamentais"
  },
  "sequestro": {
    numero: "110",
    nome: "Sequestro**",
    tempo: 30,
    multa: 20000,
    categoria: "Crimes Contra Direitos Fundamentais"
  },
  "carcere-privado": {
    numero: "111",
    nome: "Cárcere Privado",
    tempo: 15,
    multa: 10000,
    categoria: "Crimes Contra Direitos Fundamentais"
  },
  
  // Crimes Contra o Patrimônio (112–117)
  "desmanche-veiculos": {
    numero: "112",
    nome: "Desmanche de Veículos",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes Contra o Patrimônio"
  },
  "furto": {
    numero: "113",
    nome: "Furto",
    tempo: 10,
    multa: 8000,
    categoria: "Crimes Contra o Patrimônio"
  },
  "receptacao-veiculos": {
    numero: "114",
    nome: "Receptação de Veículos",
    tempo: 10,
    multa: 8000,
    categoria: "Crimes Contra o Patrimônio"
  },
  "roubo-veiculos": {
    numero: "115",
    nome: "Roubo de Veículos",
    tempo: 15,
    multa: 12000,
    categoria: "Crimes Contra o Patrimônio"
  },
  "tentativa-furto": {
    numero: "116",
    nome: "Tentativa de Furto",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra o Patrimônio"
  },
  "furto-veiculos": {
    numero: "117",
    nome: "Furto de Veículos",
    tempo: 15,
    multa: 12000,
    categoria: "Crimes Contra o Patrimônio"
  },
  
  // Crimes de Roubos, Furtos e Variantes (118–120)
  "roubo": {
    numero: "118",
    nome: "Roubo",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes de Roubos, Furtos e Variantes"
  },
  "furto-caixa": {
    numero: "119",
    nome: "Furto a Caixa Eletrônico",
    tempo: 10,
    multa: 15000,
    categoria: "Crimes de Roubos, Furtos e Variantes"
  },
  "extorsao": {
    numero: "120",
    nome: "Extorsão",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes de Roubos, Furtos e Variantes"
  },
  
  // Crimes de Porte, Posse e Tráfico (121–137)
  "posse-pecas-armas": {
    numero: "121",
    nome: "Posse de Peças de Armas",
    tempo: 5,
    multa: 10000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-capsulas": {
    numero: "122",
    nome: "Posse de Cápsulas",
    tempo: 5,
    multa: 10000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "trafico-armas": {
    numero: "123",
    nome: "Tráfico de Armas",
    tempo: 30,
    multa: 50000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "trafico-itens-ilegais": {
    numero: "124",
    nome: "Tráfico de Itens Ilegais",
    tempo: 20,
    multa: 15000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "porte-arma-pesada": {
    numero: "125",
    nome: "Porte de Arma Pesada",
    tempo: 15,
    multa: 15000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "porte-arma-leve": {
    numero: "126",
    nome: "Porte de Arma Leve",
    tempo: 10,
    multa: 5000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "disparo-arma": {
    numero: "127",
    nome: "Disparo de Arma de Fogo",
    tempo: 5,
    multa: 0,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "trafico-municoes": {
    numero: "128",
    nome: "Tráfico de Munições",
    tempo: 20,
    multa: 20000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-municao": {
    numero: "129",
    nome: "Posse de Munição",
    tempo: 10,
    multa: 5000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-colete": {
    numero: "130",
    nome: "Posse de Colete",
    tempo: 10,
    multa: 5000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "porte-arma-branca": {
    numero: "131",
    nome: "Porte de Arma Branca",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "trafico-drogas": {
    numero: "132",
    nome: "Tráfico de Drogas",
    tempo: 25,
    multa: 30000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "aviaozinho": {
    numero: "133",
    nome: "Aviãozinho",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-componentes": {
    numero: "134",
    nome: "Posse de Componentes Narcóticos",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-drogas": {
    numero: "135",
    nome: "Posse de Drogas",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "posse-itens-ilegais": {
    numero: "136",
    nome: "Posse de Itens Ilegais",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  "dinheiro-sujo": {
    numero: "137",
    nome: "Dinheiro Sujo",
    tempo: 10,
    multa: 0,
    categoria: "Crimes de Porte, Posse e Tráfico"
  },
  
  // Crimes Contra a Ordem Pública (138–167)
  "falsidade-ideologica": {
    numero: "138",
    nome: "Falsidade Ideológica",
    tempo: 15,
    multa: 40000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "associacao-criminosa": {
    numero: "139",
    nome: "Associação Criminosa",
    tempo: 20,
    multa: 30000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "apologia-crime": {
    numero: "140",
    nome: "Apologia ao Crime",
    tempo: 5,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "posse-arma-publico": {
    numero: "141",
    nome: "Posse de Arma em Público",
    tempo: 10,
    multa: 25000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "tentativa-suborno": {
    numero: "142",
    nome: "Tentativa de Suborno",
    tempo: 10,
    multa: 20000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "ameaca": {
    numero: "143",
    nome: "Ameaça",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "falsa-comunicacao": {
    numero: "144",
    nome: "Falsa Comunicação de Crime",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desobediencia-01": {
    numero: "145",
    nome: "Desobediência 01",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desobediencia-02": {
    numero: "146",
    nome: "Desobediência 02",
    tempo: 0,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desobediencia-03": {
    numero: "147",
    nome: "Desobediência 03",
    tempo: 0,
    multa: 15000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "assedio-moral": {
    numero: "148",
    nome: "Assédio Moral**",
    tempo: 15,
    multa: 25000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "atentado-pudor": {
    numero: "149",
    nome: "Atentado ao Pudor",
    tempo: 15,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "vandalismo": {
    numero: "150",
    nome: "Vandalismo",
    tempo: 5,
    multa: 15000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "invasao-propriedade": {
    numero: "151",
    nome: "Invasão de Propriedade",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "abuso-autoridade": {
    numero: "152",
    nome: "Abuso de Autoridade",
    tempo: 20,
    multa: 30000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "uso-mascara": {
    numero: "153",
    nome: "Uso de Máscara",
    tempo: 0,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "uso-equipamentos": {
    numero: "154",
    nome: "Uso de Equipamentos Restritos",
    tempo: 0,
    multa: 15000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "omissao-socorro": {
    numero: "155",
    nome: "Omissão de Socorro",
    tempo: 10,
    multa: 5000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "tentativa-fuga": {
    numero: "156",
    nome: "Tentativa de Fuga",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desacato-01": {
    numero: "157",
    nome: "Desacato 01**",
    tempo: 20,
    multa: 20000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desacato-02": {
    numero: "158",
    nome: "Desacato 02**",
    tempo: 25,
    multa: 25000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "desacato-03": {
    numero: "159",
    nome: "Desacato 03**",
    tempo: 30,
    multa: 30000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "resistencia-prisao": {
    numero: "160",
    nome: "Resistência à Prisão",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "reu-reincidente": {
    numero: "161",
    nome: "Réu Reincidente",
    tempo: 5,
    multa: 0,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "cumplice": {
    numero: "162",
    nome: "Cúmplice",
    tempo: 0,
    multa: 15000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "obstrucao-justica": {
    numero: "163",
    nome: "Obstrução de Justiça",
    tempo: 5,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "ocultacao-provas": {
    numero: "164",
    nome: "Ocultação de Provas",
    tempo: 10,
    multa: 20000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "vadiagem": {
    numero: "165",
    nome: "Vadiagem",
    tempo: 5,
    multa: 5000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "perturbacao-sossego": {
    numero: "166",
    nome: "Perturbação do Sossego Alheio",
    tempo: 0,
    multa: 10000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  "calunia-injuria": {
    numero: "167",
    nome: "Calúnia, Injúria ou Difamação",
    tempo: 0,
    multa: 15000,
    categoria: "Crimes Contra a Ordem Pública"
  },
  
  // Crimes de Trânsito (168–178)
  "conducao-imprudente": {
    numero: "168",
    nome: "Condução Imprudente",
    tempo: 0,
    multa: 10000,
    categoria: "Crimes de Trânsito"
  },
  "dirigir-contra-mao": {
    numero: "169",
    nome: "Dirigir na Contra Mão",
    tempo: 0,
    multa: 10000,
    categoria: "Crimes de Trânsito"
  },
  "alta-velocidade": {
    numero: "170",
    nome: "Alta Velocidade",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Trânsito"
  },
  "poluicao-sonora": {
    numero: "171",
    nome: "Poluição Sonora",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Trânsito"
  },
  "corridas-ilegais": {
    numero: "172",
    nome: "Corridas Ilegais",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes de Trânsito"
  },
  "uso-excessivo-insulfilm": {
    numero: "173",
    nome: "Uso Excessivo de Insulfilm",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Trânsito"
  },
  "veiculo-danificado": {
    numero: "174",
    nome: "Veículo Muito Danificado",
    tempo: 0,
    multa: 2000,
    categoria: "Crimes de Trânsito"
  },
  "veiculo-estacionado": {
    numero: "175",
    nome: "Veículo Ilegalmente Estacionado",
    tempo: 0,
    multa: 5000,
    categoria: "Crimes de Trânsito"
  },
  "nao-ceder-passagem": {
    numero: "176",
    nome: "Não Ceder Passagem a Viaturas",
    tempo: 0,
    multa: 2000,
    categoria: "Crimes de Trânsito"
  },
  "impedir-fluxo": {
    numero: "177",
    nome: "Impedir o Fluxo do Tráfego",
    tempo: 0,
    multa: 2000,
    categoria: "Crimes de Trânsito"
  },
  "dano-patrimonio": {
    numero: "178",
    nome: "Dano a Patrimônio Público",
    tempo: 10,
    multa: 10000,
    categoria: "Crimes de Trânsito"
  }
}; 
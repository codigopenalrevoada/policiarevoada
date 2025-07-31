// modelo-fianca.js
// Valores de fiança para cada artigo do código penal

const FIANCAS = {
  // Crimes Diversos (101–103)
  "azaralhamento-recrutamento": 0, // Inafiançável
  "agressao-funcionario": 0, // Inafiançável
  "prevaricacao": 0, // Inafiançável
  
  // Crimes Contra a Vida (104–108)
  "homicidio-doloso-qualificado": 0, // Inafiançável
  "homicidio-doloso": 0, // Inafiançável
  "tentativa-homicidio": 0, // Inafiançável
  "homicidio-culposo": 30000,
  "homicidio-culposo-transito": 30000,
  
  // Crimes Contra Direitos Fundamentais (109–111)
  "lesao-corporal": 15000,
  "sequestro": 0, // Inafiançável
  "carcere-privado": 60000,
  
  // Crimes Contra o Patrimônio (112–117)
  "desmanche-veiculos": 50000,
  "furto": 50000,
  "receptacao-veiculos": 50000,
  "roubo-veiculos": 50000,
  "tentativa-furto": 50000,
  "furto-veiculos": 50000,
  
  // Crimes de Roubos, Furtos e Variantes (118–120)
  "roubo": 40000,
  "furto-caixa": 40000,
  "extorsao": 40000,
  
  // Crimes de Porte, Posse e Tráfico (121–137)
  "posse-pecas-armas": 35000,
  "posse-capsulas": 35000,
  "trafico-armas": 60000,
  "trafico-itens-ilegais": 60000,
  "porte-arma-pesada": 50000,
  "porte-arma-leve": 50000,
  "disparo-arma": 50000,
  "trafico-municoes": 60000,
  "posse-municao": 50000,
  "posse-colete": 50000,
  "porte-arma-branca": 5000,
  "trafico-drogas": 60000,
  "aviaozinho": 50000,
  "posse-componentes": 35000,
  "posse-drogas": 5000,
  "posse-itens-ilegais": 35000,
  "dinheiro-sujo": 60000,
  
  // Crimes Contra a Ordem Pública (138–167)
  "falsidade-ideologica": 30000,
  "associacao-criminosa": 30000,
  "apologia-crime": 30000,
  "posse-arma-publico": 30000,
  "tentativa-suborno": 30000,
  "ameaca": 30000,
  "falsa-comunicacao": 30000,
  "desobediencia-01": 30000,
  "desobediencia-02": 35000,
  "desobediencia-03": 40000,
  "assedio-moral": 0, // Inafiançável
  "atentado-pudor": 30000,
  "vandalismo": 30000,
  "invasao-propriedade": 30000,
  "abuso-autoridade": 30000,
  "uso-mascara": 30000,
  "uso-equipamentos": 30000,
  "omissao-socorro": 30000,
  "tentativa-fuga": 30000,
  "desacato-01": 0, // Inafiançável
  "desacato-02": 0, // Inafiançável
  "desacato-03": 0, // Inafiançável
  "resistencia-prisao": 25000,
  "reu-reincidente": 25000,
  "cumplice": 20000,
  "obstrucao-justica": 30000,
  "ocultacao-provas": 30000,
  "vadiagem": 25000,
  "perturbacao-sossego": 25000,
  "calunia-injuria": 35000,
  
  // Crimes de Trânsito (168–178)
  "conducao-imprudente": 20000,
  "dirigir-contra-mao": 20000,
  "alta-velocidade": 20000,
  "poluicao-sonora": 20000,
  "corridas-ilegais": 20000,
  "uso-excessivo-insulfilm": 20000,
  "veiculo-danificado": 20000,
  "veiculo-estacionado": 20000,
  "nao-ceder-passagem": 20000,
  "impedir-fluxo": 20000,
  "dano-patrimonio": 20000
}; 
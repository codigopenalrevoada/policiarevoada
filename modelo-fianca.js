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
  "homicidio-culposo": 10000,
  "homicidio-culposo-transito": 10000,
  
  // Crimes Contra Direitos Fundamentais (109–111)
  "lesao-corporal": 10000,
  "sequestro": 0, // Inafiançável
  "carcere-privado": 60000,
  
  // Crimes Contra o Patrimônio (112–117)
  "desmanche-veiculos": 15000,
  "furto": 15000,
  "receptacao-veiculos": 10000,
  "roubo-veiculos": 15000,
  "tentativa-furto": 15000,
  "furto-veiculos": 15000,
  
  // Crimes de Roubos, Furtos e Variantes (118–120)
  "roubo": 10000,
  "furto-caixa": 10000,
  "extorsao": 10000,
  
  // Crimes de Porte, Posse e Tráfico (121–137)
  "posse-pecas-armas": 10000,
  "posse-capsulas": 10000,
  "trafico-armas": 20000,
  "trafico-itens-ilegais": 20000,
  "porte-arma-pesada": 25000,
  "porte-arma-leve": 15000,
  "disparo-arma": 15000,
  "trafico-municoes": 20000,
  "posse-municao": 15000,
  "posse-colete": 15000,
  "porte-arma-branca": 5000,
  "trafico-drogas": 20000,
  "aviaozinho": 15000,
  "posse-componentes": 10000,
  "posse-drogas": 5000,
  "posse-itens-ilegais": 15000,
  "dinheiro-sujo": 15000,
  
  // Crimes Contra a Ordem Pública (138–167)
  "falsidade-ideologica": 15000,
  "associacao-criminosa": 15000,
  "apologia-crime": 15000,
  "posse-arma-publico": 15000,
  "tentativa-suborno": 15000,
  "ameaca": 20000,
  "falsa-comunicacao": 5000,
  "desobediencia-01": 5000,
  "desobediencia-02": 10000,
  "desobediencia-03": 20000,
  "assedio-moral": 0, // Inafiançável
  "atentado-pudor": 10000,
  "vandalismo": 10000,
  "invasao-propriedade": 10000,
  "abuso-autoridade": 10000,
  "uso-mascara": 15000,
  "uso-equipamentos": 20000,
  "omissao-socorro": 20000,
  "tentativa-fuga": 20000,
  "desacato-01": 0, // Inafiançável
  "desacato-02": 0, // Inafiançável
  "desacato-03": 0, // Inafiançável
  "resistencia-prisao": 15000,
  "reu-reincidente": 15000,
  "cumplice": 10000,
  "obstrucao-justica": 15000,
  "ocultacao-provas": 15000,
  "vadiagem": 15000,
  "perturbacao-sossego": 15000,
  "calunia-injuria": 25000,
  
  // Crimes de Trânsito (168–178)
  "conducao-imprudente": 10000,
  "dirigir-contra-mao": 10000,
  "alta-velocidade": 10000,
  "poluicao-sonora": 10000,
  "corridas-ilegais": 10000,
  "uso-excessivo-insulfilm": 10000,
  "veiculo-danificado": 10000,
  "veiculo-estacionado": 10000,
  "nao-ceder-passagem": 10000,
  "impedir-fluxo": 10000,
  "dano-patrimonio": 10000
}; 
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
  "homicidio-culposo": 50000,
  "homicidio-culposo-transito": 30000,
  
  // Crimes Contra Direitos Fundamentais (109–111)
  "lesao-corporal": 30000,
  "sequestro": 0, // Inafiançável
  "carcere-privado": 60000,
  
  // Crimes Contra o Patrimônio (112–117)
  "desmanche-veiculos": 35000,
  "furto": 45000,
  "receptacao-veiculos": 10000,
  "roubo-veiculos": 35000,
  "tentativa-furto": 25000,
  "furto-veiculos": 35000,
  
  // Crimes de Roubos, Furtos e Variantes (118–120)
  "roubo": 50000,
  "furto-caixa": 50000,
  "extorsao": 50000,
  
  // Crimes de Porte, Posse e Tráfico (121–137)
  "posse-pecas-armas": 40000,
  "posse-capsulas": 40000,
  "trafico-armas": 80000,
  "trafico-itens-ilegais": 40000,
  "porte-arma-pesada": 65000,
  "porte-arma-leve": 45000,
  "disparo-arma": 70000,
  "trafico-municoes": 60000,
  "posse-municao": 40000,
  "posse-colete": 35000,
  "porte-arma-branca": 15000,
  "trafico-drogas": 60000,
  "aviaozinho": 40000,
  "posse-componentes": 30000,
  "posse-drogas": 30000,
  "posse-itens-ilegais": 25000,
  "dinheiro-sujo": 40000,
  
  // Crimes Contra a Ordem Pública (138–167)
  "falsidade-ideologica": 45000,
  "associacao-criminosa": 35000,
  "apologia-crime": 45000,
  "posse-arma-publico": 55000,
  "tentativa-suborno": 55000,
  "ameaca": 30000,
  "falsa-comunicacao": 25000,
  "desobediencia-01": 15000,
  "desobediencia-02": 20000,
  "desobediencia-03": 25000,
  "assedio-moral": 0, // Inafiançável
  "atentado-pudor": 10000,
  "vandalismo": 30000,
  "invasao-propriedade": 10000,
  "abuso-autoridade": 10000,
  "uso-mascara": 35000,
  "uso-equipamentos": 25000,
  "omissao-socorro": 25000,
  "tentativa-fuga": 45000,
  "desacato-01": 0, // Inafiançável
  "desacato-02": 0, // Inafiançável
  "desacato-03": 0, // Inafiançável
  "resistencia-prisao": 40000,
  "reu-reincidente": 45000,
  "cumplice": 20000,
  "obstrucao-justica": 35000,
  "ocultacao-provas": 35000,
  "vadiagem": 25000,
  "perturbacao-sossego": 35000,
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
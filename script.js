// Array para armazenar os crimes selecionados
let crimesSelecionados = [];

// Elementos do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const prisonerName = document.getElementById('prisonerName');
    const prisonerRG = document.getElementById('prisonerRG');
    const lawyerRG = document.getElementById('lawyerRG');
    const selectedCrimesList = document.getElementById('selectedCrimesList');
    const totalPena = document.getElementById('totalPena');
    const totalMulta = document.getElementById('totalMulta');
    const totalFianca = document.getElementById('totalFianca');
    const clearAllBtn = document.getElementById('clearAll');
    const copyResultsBtn = document.getElementById('copyResults');
    const excessWarning = document.getElementById('excessWarning');

    // Checkboxes de atenuantes
    const advogadoConstituido = document.getElementById('advogadoConstituido');
    const reuPrimario = document.getElementById('reuPrimario');
    const reuConfesso = document.getElementById('reuConfesso');
    const reanimadoHP = document.getElementById('reanimadoHP');
    const reanimadoHPMeses = document.getElementById('reanimadoHPMeses');
    const possuiPorteArma = document.getElementById('possuiPorteArma');
    const fiancaAtenuante = document.getElementById('fiancaAtenuante');

    // Campos adicionais
    const seizedItems = document.getElementById('seizedItems');
    const dirtyMoney = document.getElementById('dirtyMoney');

    // Inicialização
    inicializarEventos();
    inicializarCategoriasColapsaveis();
    atualizarBotoesComModelo();
    marcarBotoesInafiancaveis(); // Marcar os botões de crimes inafiançáveis
    verificarAdvogado(); // Verificar estado inicial do checkbox de advogado constituído
    verificarCrimesInafiancaveis(); // Verificar se há crimes inafiançáveis selecionados

    // Função para inicializar todos os eventos
    function inicializarEventos() {
        // Eventos para botões de crimes
        document.querySelectorAll('.crime-btn').forEach(btn => {
            btn.addEventListener('click', () => adicionarCrime(btn.dataset.crime));
        });

        // Validação para campos de RG - permitir apenas números
        prisonerRG.addEventListener('input', function() {
            // Remove todos os caracteres que não são números
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        lawyerRG.addEventListener('input', function() {
            // Remove todos os caracteres que não são números
            this.value = this.value.replace(/[^0-9]/g, '');
            verificarAdvogado();
        });

        // Prevenir colagem de caracteres não numéricos nos campos de RG
        prisonerRG.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericOnly = pastedText.replace(/[^0-9]/g, '');
            this.value = numericOnly;
        });

        lawyerRG.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericOnly = pastedText.replace(/[^0-9]/g, '');
            this.value = numericOnly;
            verificarAdvogado();
        });

        // Prevenir digitação de caracteres não numéricos nos campos de RG
        prisonerRG.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
            }
        });

        lawyerRG.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
            }
        });

        // Eventos para checkboxes de atenuantes
        advogadoConstituido.addEventListener('change', function() {
            if (this.checked && lawyerRG.value.trim() === '') {
                mostrarNotificacao('Informe o RG do advogado para prosseguir', 'info');
                this.checked = false;
                return;
            }
            calcularTotais();
        });
        reuPrimario.addEventListener('change', function() {
            // Se réu primário for marcado, desmarca réu reincidente
            if (this.checked) {
                const reuReincidente = crimesSelecionados.findIndex(c => c.codigo === 'reu-reincidente');
                if (reuReincidente !== -1) {
                    removerCrime('reu-reincidente');
                    mostrarNotificacao('Réu reincidente foi desmarcado automaticamente', 'info');
                }
            }
            calcularTotais();
        });
        reuConfesso.addEventListener('change', calcularTotais);
        
        // Evento para o checkbox Reanimado HP
        reanimadoHP.addEventListener('change', function() {
            // Habilitar/desabilitar o campo de meses
            reanimadoHPMeses.disabled = !this.checked;
            if (this.checked) {
                reanimadoHPMeses.focus();
                if (!reanimadoHPMeses.value) {
                    reanimadoHPMeses.value = "1"; // Valor padrão
                }
            }
            calcularTotais();
        });
        
        // Evento para o campo de meses do Reanimado HP
        reanimadoHPMeses.addEventListener('input', function() {
            // Garantir que o valor seja pelo menos 1
            if (parseInt(this.value) < 1) {
                this.value = "1";
            }
            calcularTotais();
        });
        
        possuiPorteArma.addEventListener('change', calcularTotais);
        fiancaAtenuante.addEventListener('change', calcularTotais);

        // Eventos para campos de texto
        lawyerRG.addEventListener('input', verificarAdvogado);
        dirtyMoney.addEventListener('input', function() {
            preencherItensApreendidos();
            calcularTotais(); // Recalcular totais quando o valor de dinheiro sujo mudar
        });

        // Eventos para botões de ação
        clearAllBtn.addEventListener('click', limparTudo);
        copyResultsBtn.addEventListener('click', copiarResultados);
    }

    // Função para marcar os botões de crimes inafiançáveis
    function marcarBotoesInafiancaveis() {
        document.querySelectorAll('.crime-btn').forEach(btn => {
            const codigo = btn.dataset.crime;
            // Verificar se o crime é inafiançável (fiança = 0)
            if (FIANCAS[codigo] === 0) {
                btn.setAttribute('data-inafiancavel', 'true');
            }
        });
    }

    // Função para verificar se há crimes inafiançáveis selecionados
    function verificarCrimesInafiancaveis() {
        // Verificar se algum crime inafiançável foi selecionado (crimes com fiança = 0)
        const temCrimeInafiancavel = crimesSelecionados.some(crime => crime.fianca === 0 || FIANCAS[crime.codigo] === 0);
        
        if (temCrimeInafiancavel) {
            // Desabilitar o checkbox de fiança
            fiancaAtenuante.checked = false;
            fiancaAtenuante.disabled = true;
            fiancaAtenuante.parentElement.style.opacity = '0.5';
            fiancaAtenuante.parentElement.style.cursor = 'not-allowed';
            fiancaAtenuante.parentElement.title = 'Não disponível para crimes inafiançáveis';
        } else {
            // Habilitar o checkbox de fiança
            fiancaAtenuante.disabled = false;
            fiancaAtenuante.parentElement.style.opacity = '1';
            fiancaAtenuante.parentElement.style.cursor = 'pointer';
            fiancaAtenuante.parentElement.title = '';
        }
    }

    // Função para verificar o status do réu (primário ou reincidente)
    function verificarStatusReu() {
        // Apenas verifica o status, sem marcar nenhum por padrão
        const reuReincidente = crimesSelecionados.some(c => c.codigo === 'reu-reincidente');
        return {
            primario: reuPrimario.checked,
            reincidente: reuReincidente
        };
    }

    // Função para atualizar os botões de crimes com os dados do modelo
    function atualizarBotoesComModelo() {
        document.querySelectorAll('.crime-btn').forEach(btn => {
            const codigo = btn.dataset.crime;
            if (ARTIGOS[codigo]) {
                // Atualizar os atributos do botão com os valores do modelo
                btn.dataset.tempo = ARTIGOS[codigo].tempo;
                btn.dataset.multa = ARTIGOS[codigo].multa;
                btn.textContent = `Art. ${ARTIGOS[codigo].numero} - ${ARTIGOS[codigo].nome}`;
            }
        });
    }

    // Função para inicializar categorias colapsáveis
    function inicializarCategoriasColapsaveis() {
        document.querySelectorAll('.category-header').forEach(header => {
            const toggleBtn = header.querySelector('.toggle-btn');
            const crimeButtons = header.nextElementSibling;
            
            // Inicialmente, mostrar todos os botões de crime
            crimeButtons.style.display = 'grid';
            
            header.addEventListener('click', () => {
                toggleBtn.classList.toggle('active');
                crimeButtons.style.display = crimeButtons.style.display === 'none' ? 'grid' : 'none';
            });
        });
    }

    // Função para verificar se o advogado pode ser selecionado
    function verificarAdvogado() {
        const rgAdvogadoPreenchido = lawyerRG.value.trim() !== '';
        
        // Sempre habilitar o checkbox, mas verificar se o RG está preenchido quando marcado
        advogadoConstituido.disabled = false;
        advogadoConstituido.parentElement.style.opacity = '1';
        advogadoConstituido.parentElement.style.cursor = 'pointer';
        advogadoConstituido.parentElement.title = '';
        
        // Recalcular totais após mudança
        calcularTotais();
    }

    // Função para validar advogado constituído quando marcado
    function validarAdvogadoConstituido() {
        const rgAdvogadoPreenchido = lawyerRG.value.trim() !== '';
        
        if (!rgAdvogadoPreenchido) {
            // Se não há RG do advogado, desmarca o checkbox e mostra notificação
            advogadoConstituido.checked = false;
            mostrarNotificacao('Preencha o RG do advogado para selecionar advogado constituído', 'warning');
            return false;
        }
        
        return true;
    }

    // Função para verificar se dinheiro sujo foi selecionado
    function verificarDinheiroSujo() {
        const dinheiroSujoSelecionado = crimesSelecionados.some(crime => crime.codigo === 'dinheiro-sujo');
        const valorDinheiroSujo = dirtyMoney.value.trim();
        
        if (dinheiroSujoSelecionado && !valorDinheiroSujo) {
            return false; // Dinheiro sujo selecionado mas valor não preenchido
        }
        
        return true; // Tudo ok
    }

    // Função para preencher automaticamente itens apreendidos
    function preencherItensApreendidos() {
        const valorDinheiroSujo = dirtyMoney.value.trim();
        
        if (valorDinheiroSujo) {
            const valorFormatado = parseInt(valorDinheiroSujo).toLocaleString();
            seizedItems.value = `$${valorFormatado} em dinheiro sujo`;
        }
    }

    // Função para atualizar o campo de dinheiro sujo
    function atualizarCampoDinheiroSujo() {
        const artigoDinheiroSujoSelecionado = crimesSelecionados.some(c => c.codigo === 'dinheiro-sujo');
        if (artigoDinheiroSujoSelecionado) {
            dirtyMoney.disabled = false;
            dirtyMoney.placeholder = 'Valor em $';
        } else {
            dirtyMoney.value = '';
            dirtyMoney.disabled = true;
            dirtyMoney.placeholder = 'Selecione o artigo Dinheiro Sujo';
        }
    }

    // Função para adicionar crime
    function adicionarCrime(codigo) {
        // Obter dados do artigo do modelo centralizado
        const artigo = ARTIGOS[codigo];
        if (!artigo) {
            mostrarNotificacao(`Artigo não encontrado: ${codigo}`, 'error');
            return;
        }

        // Verificar se o crime já foi adicionado
        const crimeExistente = crimesSelecionados.find(c => c.codigo === codigo);
        
        if (crimeExistente) {
            // Se o crime já existe, removê-lo (funcionalidade de toggle)
            removerCrime(codigo);
            return;
        }

        // Regra 2: Verificar compatibilidade entre réu primário e réu reincidente
        if (codigo === 'reu-reincidente') {
            // Se estiver tentando adicionar réu reincidente, verificar se réu primário está marcado
            if (reuPrimario.checked) {
                mostrarNotificacao('Não é possível marcar réu reincidente quando réu primário está marcado', 'error');
                return;
            }
        }

        const crime = {
            nome: `Art. ${artigo.numero} - ${artigo.nome}`,
            tempo: artigo.tempo,
            multa: artigo.multa,
            codigo: codigo,
            fianca: FIANCAS[codigo] || 0
        };

        // Adicionar novo crime
        crime.quantidade = 1;
        crime.tempoTotal = crime.tempo;
        crime.multaTotal = crime.multa;
        crime.fiancaTotal = crime.fianca;
        crimesSelecionados.push(crime);

        // Se adicionou réu reincidente, desmarca réu primário
        if (codigo === 'reu-reincidente') {
            reuPrimario.checked = false;
        }

        // Atualizar interface
        atualizarListaCrimes();
        calcularTotais();
        atualizarCampoDinheiroSujo();
        verificarCrimesInafiancaveis(); // Verificar se o crime adicionado é inafiançável
        
        // Feedback visual
        const crimeBtn = document.querySelector(`.crime-btn[data-crime="${codigo}"]`);
        if (crimeBtn) {
            // Efeito temporário de seleção
            crimeBtn.classList.add('selected');
            setTimeout(() => {
                crimeBtn.classList.remove('selected');
            }, 200);
            
            // Adicionar classe 'active' para manter o botão destacado
            crimeBtn.classList.add('active');
        }
        
        // Mostrar notificação
        mostrarNotificacao(`${crime.nome} adicionado`, 'success');
    }

    // Função para remover crime
    function removerCrime(codigo) {
        const crimeRemovido = crimesSelecionados.find(c => c.codigo === codigo);
        crimesSelecionados = crimesSelecionados.filter(c => c.codigo !== codigo);
        
        // Se removeu réu reincidente, marca réu primário automaticamente
        if (codigo === 'reu-reincidente') {
            reuPrimario.checked = true;
        }
        
        // Remover a classe 'active' do botão correspondente
        const btnRemovido = document.querySelector(`.crime-btn[data-crime="${codigo}"]`);
        if (btnRemovido) {
            btnRemovido.classList.remove('active');
        }
        
        atualizarListaCrimes();
        calcularTotais();
        atualizarCampoDinheiroSujo();
        verificarCrimesInafiancaveis(); // Verificar se ainda há crimes inafiançáveis
        
        if (crimeRemovido) {
            mostrarNotificacao(`${crimeRemovido.nome} removido`, 'info');
        }
    }

    // Função para atualizar a lista de crimes na interface
    function atualizarListaCrimes() {
        if (crimesSelecionados.length === 0) {
            selectedCrimesList.innerHTML = '<p class="empty-message">Nenhum crime selecionado</p>';
            
            // Remover a classe 'active' de todos os botões quando não houver crimes selecionados
            document.querySelectorAll('.crime-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            return;
        }

        selectedCrimesList.innerHTML = crimesSelecionados.map(crime => `
            <div class="crime-item">
                <div class="crime-info">
                    <div class="crime-name">${crime.nome}</div>
                    <div class="crime-details">
                        ${crime.quantidade > 1 ? `(${crime.quantidade}x) ` : ''}
                        ${crime.tempoTotal} meses | $${crime.multaTotal.toLocaleString()}
                    </div>
                </div>
                <button class="remove-btn" onclick="removerCrime('${crime.codigo}')">×</button>
            </div>
        `).join('');
        
        // Atualizar visualmente os botões de crimes selecionados
        atualizarBotoesSelecionados();
    }
    
    // Função para atualizar visualmente os botões de crimes selecionados
    function atualizarBotoesSelecionados() {
        // Primeiro, remover a classe 'active' de todos os botões
        document.querySelectorAll('.crime-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Depois, adicionar a classe 'active' apenas aos botões dos crimes selecionados
        crimesSelecionados.forEach(crime => {
            const btn = document.querySelector(`.crime-btn[data-crime="${crime.codigo}"]`);
            if (btn) {
                btn.classList.add('active');
            }
        });
    }

    // Função para calcular totais
    function calcularTotais() {
        // Primeiro, calcular a pena total antes dos atenuantes
        let penaBase = crimesSelecionados.reduce((total, crime) => total + crime.tempoTotal, 0);
        let multaTotal = crimesSelecionados.reduce((total, crime) => total + crime.multaTotal, 0);
        
        // Aplicar atenuantes
        let reducaoPena = 0;
        let reducaoMulta = 0;
        
        // Verificar se tem advogado constituído
        const temAdvogado = advogadoConstituido.checked && !advogadoConstituido.disabled;
        
        // Mostrar ou esconder seção de fiança com base no advogado
        const calculationsDiv = document.querySelector('.calculations');
        if (temAdvogado) {
            calculationsDiv.classList.add('show-fianca');
        } else {
            calculationsDiv.classList.remove('show-fianca');
        }
        
        // Aplicar reduções conforme as porcentagens especificadas
        if (temAdvogado) {
            reducaoPena += 0.2; // Advogado constituído: 20% na pena
            // NÃO aplicar na multa
        }
        if (reuPrimario.checked) {
            reducaoPena += 0.1; // Réu primário: 10% na pena
            // NÃO aplicar na multa
        }
        if (reuConfesso.checked) {
            reducaoPena += 0.1; // Réu confesso: 10% na pena
            // NÃO aplicar na multa
        }
        
        // Aplicar reduções (máximo de 50%)
        reducaoPena = Math.min(reducaoPena, 0.5);
        reducaoMulta = Math.min(reducaoMulta, 0.5);
        
        // Verificar se a pena base já excede o limite máximo
        if (penaBase > 100) {
            penaBase = 100; // Limitar a pena base a 100 meses
        }
        
        // Aplicar reduções percentuais à pena base
        let penaTotal = Math.round(penaBase * (1 - reducaoPena) * 10) / 10; // Uma casa decimal
        // Multa NÃO recebe desconto de atenuantes
        // multaTotal = Math.round(multaTotal * (1 - reducaoMulta));
        
        // Aplicar redução direta de meses para Reanimado HP
        if (reanimadoHP.checked && reanimadoHPMeses.value) {
            const minutosInseridos = parseInt(reanimadoHPMeses.value) || 0;
            // Dividir por 2 para obter o desconto real em meses
            const mesesDesconto = Math.floor(minutosInseridos / 2);
            penaTotal = Math.max(0, penaTotal - mesesDesconto); // Não permitir pena negativa
        }
        
        // Verificar se há crimes inafiançáveis
        const temCrimeInafiancavel = crimesSelecionados.some(crime => crime.fianca === 0 || FIANCAS[crime.codigo] === 0);
        
        // Calcular fiança SEM considerar o checkbox de fiança
        let fiancaTotal = crimesSelecionados.reduce((total, crime) => {
            // Pega do modelo FIANCAS
            return total + (FIANCAS[crime.codigo] || 0);
        }, 0);
        let fiancaPolicial = Math.round(fiancaTotal * 0.35);
        let fiancaPainel = Math.round(fiancaTotal * 0.35);
        let fiancaAdvogado = fiancaTotal - fiancaPolicial - fiancaPainel; // Para garantir 100%

        // Atualizar interface
        totalPena.textContent = `${penaTotal} meses`;
        totalMulta.textContent = `$${multaTotal.toLocaleString()}`;

        // Atualizar valores de fiança
        if (temCrimeInafiancavel) {
            totalFianca.textContent = "SEM FIANÇA";
            totalFianca.classList.add('sem-fianca');
            document.getElementById('fiancaPolicial').textContent = "SEM FIANÇA";
            document.getElementById('fiancaPainel').textContent = "SEM FIANÇA";
            document.getElementById('fiancaAdvogado').textContent = "SEM FIANÇA";
            document.getElementById('fiancaPolicial').classList.add('sem-fianca');
            document.getElementById('fiancaPainel').classList.add('sem-fianca');
            document.getElementById('fiancaAdvogado').classList.add('sem-fianca');
        } else {
            totalFianca.textContent = `$${fiancaTotal.toLocaleString()}`;
            totalFianca.classList.remove('sem-fianca');
            document.getElementById('fiancaPolicial').textContent = `$${fiancaPolicial.toLocaleString()}`;
            document.getElementById('fiancaPainel').textContent = `$${fiancaPainel.toLocaleString()}`;
            document.getElementById('fiancaAdvogado').textContent = `$${fiancaAdvogado.toLocaleString()}`;
            document.getElementById('fiancaPolicial').classList.remove('sem-fianca');
            document.getElementById('fiancaPainel').classList.remove('sem-fianca');
            document.getElementById('fiancaAdvogado').classList.remove('sem-fianca');
        }

        // Verificar se excedeu 100 meses
        if (penaBase >= 100) {
            excessWarning.style.display = 'flex';
        } else {
            excessWarning.style.display = 'none';
        }
    }

    // Função para calcular o total de fiança
    function calcularFiancaTotal() {
        return crimesSelecionados.reduce((total, crime) => {
            return total + (crime.fiancaTotal || 0);
        }, 0);
    }

    // Função para formatar o tempo em meses/anos
    function formatarTempo(meses) {
        if (meses < 12) {
            return `${meses} meses`;
        } else {
            const anos = Math.floor(meses / 12);
            const mesesRestantes = meses % 12;
            
            if (mesesRestantes === 0) {
                return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
            } else {
                return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
            }
        }
    }

    // Função para limpar tudo
    function limparTudo() {
        if (crimesSelecionados.length === 0 && 
            !prisonerName.value && 
            !prisonerRG.value && 
            !lawyerRG.value && 
            !seizedItems.value && 
            !dirtyMoney.value) {
            mostrarNotificacao('Não há dados para limpar.', 'info');
            return;
        }

        if (confirm('Tem certeza que deseja limpar todos os dados?')) {
            crimesSelecionados = [];
            prisonerName.value = '';
            prisonerRG.value = '';
            lawyerRG.value = '';
            seizedItems.value = '';
            dirtyMoney.value = '';
            
            // Limpar checkboxes
            advogadoConstituido.checked = false;
            reuPrimario.checked = false; // Não marca réu primário por padrão
            reuConfesso.checked = false;
            reanimadoHP.checked = false;
            reanimadoHPMeses.value = '';
            reanimadoHPMeses.disabled = true;
            possuiPorteArma.checked = false;
            fiancaAtenuante.checked = false;
            
            // Verificar advogado após limpar
            verificarAdvogado();
            atualizarCampoDinheiroSujo();
            verificarCrimesInafiancaveis(); // Verificar se ainda há crimes inafiançáveis
            
            // Remover a classe 'active' de todos os botões
            document.querySelectorAll('.crime-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            atualizarListaCrimes();
            calcularTotais();
            
            // Remover a classe sem-fianca de todos os elementos de fiança
            totalFianca.classList.remove('sem-fianca');
            document.getElementById('fiancaPolicial').classList.remove('sem-fianca');
            document.getElementById('fiancaPainel').classList.remove('sem-fianca');
            document.getElementById('fiancaAdvogado').classList.remove('sem-fianca');
            
            mostrarNotificacao('Todos os dados foram limpos.', 'success');
        }
    }

    // Função para copiar resultados no formato de relatório
    function copiarResultados() {
        // Verificar se nome e RG do preso foram preenchidos
        if (!prisonerName.value.trim()) {
            mostrarNotificacao('O nome do preso é obrigatório.', 'error');
            prisonerName.focus();
            return;
        }
        
        if (!prisonerRG.value.trim()) {
            mostrarNotificacao('O RG do preso é obrigatório.', 'error');
            prisonerRG.focus();
            return;
        }
        
        if (crimesSelecionados.length === 0) {
            mostrarNotificacao('Não há crimes selecionados para copiar.', 'error');
            return;
        }

        // Verificar se dinheiro sujo foi selecionado mas valor não foi preenchido
        if (!verificarDinheiroSujo()) {
            mostrarNotificacao('O crime "Dinheiro Sujo" foi selecionado, mas o valor não foi preenchido.', 'error');
            dirtyMoney.focus();
            return;
        }

        // Verificar se réu primário ou réu reincidente está marcado
        const reuReincidente = crimesSelecionados.some(c => c.codigo === 'reu-reincidente');
        if (!reuPrimario.checked && !reuReincidente) {
            mostrarNotificacao('É obrigatório marcar réu primário ou réu reincidente para prosseguir.', 'error');
            return;
        }

        // Obter valores
        const nome = prisonerName.value.trim() || '[NOME NÃO INFORMADO]';
        const rg = prisonerRG.value.trim() || '[RG NÃO INFORMADO]';
        const advogado = lawyerRG.value.trim() || 'Não possui';
        
        // Calcular totais
        // Primeiro, calcular a pena total antes dos atenuantes
        let penaBase = crimesSelecionados.reduce((total, crime) => total + crime.tempoTotal, 0);
        let multaTotal = crimesSelecionados.reduce((total, crime) => total + crime.multaTotal, 0);
        
        // Aplicar atenuantes
        let reducaoPena = 0;
        let reducaoMulta = 0;
        let atenuantesAplicados = [];
        
        const temAdvogado = advogadoConstituido.checked && !advogadoConstituido.disabled;
        
        // Aplicar reduções conforme as porcentagens especificadas
        if (temAdvogado) {
            reducaoPena += 0.2; // Advogado constituído: 20% na pena
            reducaoMulta += 0.2; // Advogado constituído: 20% na multa
            atenuantesAplicados.push('Advogado constituído');
        }
        
        if (reuPrimario.checked) {
            reducaoPena += 0.1; // Réu primário: 10% na pena
            atenuantesAplicados.push('Réu primário');
            // NÃO aplicar na multa
        }
        
        if (reuConfesso.checked) {
            reducaoPena += 0.1; // Réu confesso: 10% na pena
            atenuantesAplicados.push('Réu confesso');
            // NÃO aplicar na multa
        }
        
        // Aplicar reduções (máximo de 50%)
        reducaoPena = Math.min(reducaoPena, 0.5);
        reducaoMulta = Math.min(reducaoMulta, 0.5);
        
        // Verificar se a pena base já excede o limite máximo
        if (penaBase > 100) {
            penaBase = 100; // Limitar a pena base a 100 meses
        }
        
        // Aplicar reduções percentuais à pena base
        let penaTotal = Math.round(penaBase * (1 - reducaoPena) * 10) / 10; // Uma casa decimal
        multaTotal = Math.round(multaTotal * (1 - reducaoMulta));
        
        // Reanimado HP agora desconta meses diretamente
        if (reanimadoHP.checked && reanimadoHPMeses.value) {
            const minutosInseridos = parseInt(reanimadoHPMeses.value) || 0;
            const mesesDesconto = Math.floor(minutosInseridos / 2);
            penaTotal = Math.max(0, penaTotal - mesesDesconto); // Não permitir pena negativa
            atenuantesAplicados.push(`Reanimado no HP (${minutosInseridos} minutos = -${mesesDesconto} meses)`);
        }
        
        if (possuiPorteArma.checked) {
            atenuantesAplicados.push('Possui porte de arma');
        }
        
        // Verificar se há crimes inafiançáveis
        const temCrimeInafiancavel = crimesSelecionados.some(crime => crime.fianca === 0);
        
        if (fiancaAtenuante.checked && !fiancaAtenuante.disabled) {
            atenuantesAplicados.push('Fiança aplicada');
        }
        
        // Calcular fiança
        let fiancaTotal = 0;
        
        if (!temCrimeInafiancavel) {
            fiancaTotal = calcularFiancaTotal();
            
            // Verificar se fiança está habilitada
            if (!fiancaAtenuante.checked || fiancaAtenuante.disabled) {
                fiancaTotal = 0;
            }
            
            // Verificar se possui porte de arma (reduz fiança para crimes de armas)
            if (possuiPorteArma.checked) {
                const crimesDeArmas = ['porte-arma-pesada', 'porte-arma-leve', 'posse-arma-publico'];
                const temCrimeDeArma = crimesSelecionados.some(crime => crimesDeArmas.includes(crime.codigo));
                
                if (temCrimeDeArma) {
                    fiancaTotal = Math.round(fiancaTotal * 0.5); // 50% de desconto na fiança para crimes de armas
                }
            }
            
            // Regra 3: Adicionar 70% do valor do dinheiro sujo à fiança quando há advogado constituído
            if (temAdvogado && fiancaAtenuante.checked && !fiancaAtenuante.disabled) {
                const dinheiroSujoSelecionado = crimesSelecionados.some(crime => crime.codigo === 'dinheiro-sujo');
                const valorDinheiroSujo = parseInt(dirtyMoney.value.trim() || '0');
                
                if (dinheiroSujoSelecionado && valorDinheiroSujo > 0) {
                    const adicionalFianca = Math.round(valorDinheiroSujo * 0.7);
                    fiancaTotal += adicionalFianca;
                    atenuantesAplicados.push(`Dinheiro sujo adicionado à fiança (70%): $${adicionalFianca.toLocaleString()}`);
                }
            }
        }
        
        let relatorio = '';
        
        // Verificar se deve usar o formato Discord (quando fiança não está marcada)
        if (!fiancaAtenuante.checked || fiancaAtenuante.disabled) {
            // Formato Discord sem fiança
            // Calcular percentual de redução da pena para exibição
            const percentualPena = Math.round((1 - reducaoPena) * 100);
            const percentualMulta = Math.round((1 - reducaoMulta) * 100);
            
            // Obter a data e hora atual
            const agora = new Date();
            const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()}`;
            const horaFormatada = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`;
            
            relatorio = `QRA:  
\`\`\`md
# INFORMAÇÕES DO PRESO:
* NOME: ${nome}
* RG: ${rg}

# PENA TOTAL: ${penaTotal} meses (${percentualPena}%)
# MULTA: R$ ${multaTotal.toLocaleString()} (${percentualMulta}%)

# CRIMES: 
${crimesSelecionados.map(crime => `Art. ${crime.nome.split(' - ')[0].replace('Art. ', '')} - ${crime.nome.split(' - ')[1]}`).join('\n')}

# ITENS APREENDIDOS
${seizedItems.value.trim() || 'Nenhum item apreendido'}

# ATENUANTES: ${atenuantesAplicados.length > 0 ? '\n' + atenuantesAplicados.map(a => {
    // Formatar atenuantes para o formato Discord
    if (a.includes('Advogado constituído')) {
        return '* 🔹 Advogado constituído: Redução de 20% na pena total.';
    } else if (a.includes('Réu primário')) {
        return '* 🔹 Réu primário: Redução de 10% na pena total.';
    } else if (a.includes('Réu confesso')) {
        return '* 🔹 Réu confesso: Redução de 10% na pena total.';
    } else if (a.includes('Reanimado no HP')) {
        const minutosMatch = a.match(/\((\d+) minutos = -(\d+) meses\)/);
        if (minutosMatch) {
            return `* 🔹 Reanimado no HP: ${minutosMatch[1]} minutos = -${minutosMatch[2]} meses na pena total.`;
        }
        return `* 🔹 ${a}`;
    } else {
        return `* 🔹 ${a}`;
    }
}).join('\n') : '\n* Nenhum atenuante aplicado'}

# 📋 PORTE DE ARMA: ${possuiPorteArma.checked ? 'Sim' : 'Não'}
* DATA: ${dataFormatada} - ${horaFormatada}
\`\`\``;
        } else {
            // Formato Discord com fiança
            // Calcular percentual de redução da pena para exibição
            const percentualPena = Math.round((1 - reducaoPena) * 100);
            const percentualMulta = Math.round((1 - reducaoMulta) * 100);
            
            // Obter a data e hora atual
            const agora = new Date();
            const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()}`;
            const horaFormatada = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`;
            
            relatorio = `QRA: 
\`\`\`md
# INFORMAÇÕES DO PRESO:
* NOME: ${nome}
* RG: ${rg}

${temAdvogado ? `# INFORMAÇÕES DO ADVOGADO: 
* RG: ${advogado}
` : ''}
# PENA TOTAL: ${penaTotal} meses (${percentualPena}%)
# MULTA: R$ ${multaTotal.toLocaleString()} (${percentualMulta}%)

# CRIMES: 
${crimesSelecionados.map(crime => `Art. ${crime.nome.split(' - ')[0].replace('Art. ', '')} - ${crime.nome.split(' - ')[1]}`).join('\n')}

# ITENS APREENDIDOS
${seizedItems.value.trim() || 'Nenhum item apreendido'}

# ATENUANTES: ${atenuantesAplicados.length > 0 ? '\n' + atenuantesAplicados.filter(a => !a.includes('Fiança aplicada')).map(a => {
    // Formatar atenuantes para o formato Discord
    if (a.includes('Advogado constituído')) {
        return '* 🔹 Advogado constituído: Redução de 20% na pena total.';
    } else if (a.includes('Réu primário')) {
        return '* 🔹 Réu primário: Redução de 10% na pena total.';
    } else if (a.includes('Réu confesso')) {
        return '* 🔹 Réu confesso: Redução de 10% na pena total.';
    } else if (a.includes('Reanimado no HP')) {
        const minutosMatch = a.match(/\((\d+) minutos = -(\d+) meses\)/);
        if (minutosMatch) {
            return `* 🔹 Reanimado no HP: ${minutosMatch[1]} minutos = -${minutosMatch[2]} meses na pena total.`;
        }
        return `* 🔹 ${a}`;
    } else if (!a.includes('Fiança')) {
        return `* 🔹 ${a}`;
    }
}).join('\n') : '\n* Nenhum atenuante aplicado'}

# 📋 PORTE DE ARMA: ${possuiPorteArma.checked ? 'Sim' : 'Não'}

* 🔹 Fiança paga

# 💸 FIANÇA TOTAL: R$ ${fiancaTotal.toLocaleString()} 
* DATA: ${dataFormatada} - ${horaFormatada}
\`\`\``;
        }

        // Copiar para área de transferência
        navigator.clipboard.writeText(relatorio).then(() => {
            mostrarNotificacao('Relatório copiado para a área de transferência!', 'success');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            mostrarNotificacao('Erro ao copiar o relatório.', 'error');
        });
    }

    // Função para mostrar notificação
    function mostrarNotificacao(mensagem, tipo = 'info') {
        // Criar elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.className = `notificacao ${tipo}`;
        
        // Ícone baseado no tipo
        let icone = '';
        switch (tipo) {
            case 'success':
                icone = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icone = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icone = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'info':
            default:
                icone = '<i class="fas fa-info-circle"></i>';
                break;
        }
        
        notificacao.innerHTML = `${icone} <span>${mensagem}</span>`;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(notificacao);
        
        // Mostrar notificação com animação
        setTimeout(() => {
            notificacao.classList.add('mostrar');
        }, 10);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notificacao.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacao);
            }, 300);
        }, 3000);
    }

    // Expor funções necessárias globalmente
    window.removerCrime = removerCrime;
}); 

/* =========================================================
   CBF HISTÓRIA — MONTE SUA SELEÇÃO HISTÓRICA
   Arquivo: selecao.js
   Compatível com os IDs do HTML enviado
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =====================================================
    // 1. ELEMENTOS DO HTML
    // =====================================================

    const $ = (id) => document.getElementById(id);

    const formacaoSelect = $("formacao");
    const campo = $("campo");
    const jogadoresCampo = $("jogadores-campo");
    const tituloJogador = $("titulo-jogador");
    const instrucao = $("instrucao");
    const detalhesJogador = $("detalhes-jogador");
    const listaJogadores = $("lista-jogadores");
    const contador = $("contador");
    const progressoPreenchido = $("progresso-preenchido");
    const resultado = $("resultado");
    const resumoResultado = $("resumo-resultado");
    const aviso = $("aviso");

    const botaoSalvar = $("salvar");
    const botaoCompartilhar = $("compartilhar");
    const botaoLimpar = $("limpar");

    const dialogo = $("confirmacao");
    const botaoCancelarLimpeza = $("cancelar-limpeza");
    const botaoConfirmarLimpeza = $("confirmar-limpeza");

    const CHAVE_STORAGE = "cbf-selecao-historica-v1";

    const elementosObrigatorios = [
        formacaoSelect,
        campo,
        jogadoresCampo,
        tituloJogador,
        instrucao,
        detalhesJogador,
        listaJogadores,
        contador,
        progressoPreenchido,
        resultado,
        resumoResultado,
        aviso,
        botaoSalvar,
        botaoCompartilhar,
        botaoLimpar
    ];

    if (elementosObrigatorios.some((elemento) => !elemento)) {
        console.error(
            "CBF História: faltam elementos necessários no HTML."
        );
        return;
    }

    // =====================================================
    // 2. BANCO DE JOGADORES HISTÓRICOS
    // =====================================================

    // grupos:
    // GOL = goleiros
    // LD/LE = laterais
    // ZAG = zagueiros
    // VOL = volantes
    // MEIO = meio-campistas
    // PONTA = pontas
    // ATA = atacantes

    const jogadores = [
        // GOLEIROS
        {
            id: "gilmar",
            nome: "Gilmar",
            grupos: ["GOL"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Goleiro histórico do Brasil, titular nas conquistas mundiais de 1958 e 1962."
        },
        {
            id: "taffarel",
            nome: "Taffarel",
            grupos: ["GOL"],
            periodo: "Décadas de 1990",
            descricao:
                "Foi o goleiro titular do Brasil na conquista da Copa do Mundo de 1994."
        },
        {
            id: "marcos",
            nome: "Marcos",
            grupos: ["GOL"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Goleiro campeão mundial com a Seleção Brasileira em 2002."
        },
        {
            id: "dida",
            nome: "Dida",
            grupos: ["GOL"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Goleiro brasileiro que integrou o elenco campeão mundial de 2002."
        },
        {
            id: "alisson",
            nome: "Alisson",
            grupos: ["GOL"],
            periodo: "Era contemporânea",
            descricao:
                "Goleiro brasileiro conhecido pela segurança nas defesas e pelo jogo com os pés."
        },

        // LATERAIS
        {
            id: "cafu",
            nome: "Cafu",
            grupos: ["LD"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Capitão do Brasil na conquista da Copa do Mundo de 2002."
        },
        {
            id: "carlos-alberto",
            nome: "Carlos Alberto Torres",
            grupos: ["LD"],
            periodo: "Décadas de 1960 e 1970",
            descricao:
                "Capitão da Seleção Brasileira campeã mundial em 1970."
        },
        {
            id: "djalma-santos",
            nome: "Djalma Santos",
            grupos: ["LD"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Lateral histórico que conquistou as Copas do Mundo de 1958 e 1962."
        },
        {
            id: "roberto-carlos",
            nome: "Roberto Carlos",
            grupos: ["LE"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Lateral-esquerdo reconhecido pela velocidade e pela potência dos chutes."
        },
        {
            id: "nilton-santos",
            nome: "Nílton Santos",
            grupos: ["LE"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Lateral histórico que integrou as seleções campeãs de 1958 e 1962."
        },
        {
            id: "marcelo",
            nome: "Marcelo",
            grupos: ["LE"],
            periodo: "Era contemporânea",
            descricao:
                "Lateral-esquerdo brasileiro conhecido pela técnica e pela participação ofensiva."
        },

        // ZAGUEIROS
        {
            id: "bellini",
            nome: "Bellini",
            grupos: ["ZAG"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Capitão do Brasil na primeira conquista mundial, em 1958."
        },
        {
            id: "mauro-ramos",
            nome: "Mauro Ramos",
            grupos: ["ZAG"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Capitão da Seleção Brasileira campeã mundial em 1962."
        },
        {
            id: "aldair",
            nome: "Aldair",
            grupos: ["ZAG"],
            periodo: "Décadas de 1990",
            descricao:
                "Zagueiro que fez parte da campanha brasileira campeã mundial em 1994."
        },
        {
            id: "lucio",
            nome: "Lúcio",
            grupos: ["ZAG"],
            periodo: "Décadas de 2000",
            descricao:
                "Zagueiro titular da Seleção Brasileira campeã da Copa do Mundo de 2002."
        },
        {
            id: "thiago-silva",
            nome: "Thiago Silva",
            grupos: ["ZAG"],
            periodo: "Era contemporânea",
            descricao:
                "Zagueiro brasileiro reconhecido pela liderança e pela qualidade na saída de bola."
        },
        {
            id: "domingos",
            nome: "Domingos da Guia",
            grupos: ["ZAG"],
            periodo: "Décadas de 1930 e 1940",
            descricao:
                "Um dos zagueiros mais lembrados da história do futebol brasileiro."
        },

        // VOLANTES
        {
            id: "zito",
            nome: "Zito",
            grupos: ["VOL", "MEIO"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Volante fundamental nas conquistas mundiais de 1958 e 1962."
        },
        {
            id: "dunga",
            nome: "Dunga",
            grupos: ["VOL", "MEIO"],
            periodo: "Décadas de 1980 e 1990",
            descricao:
                "Capitão da Seleção Brasileira campeã mundial em 1994."
        },
        {
            id: "clodoaldo",
            nome: "Clodoaldo",
            grupos: ["VOL", "MEIO"],
            periodo: "Década de 1970",
            descricao:
                "Volante técnico que integrou a Seleção Brasileira campeã de 1970."
        },
        {
            id: "gilberto-silva",
            nome: "Gilberto Silva",
            grupos: ["VOL", "MEIO"],
            periodo: "Década de 2000",
            descricao:
                "Volante importante na campanha do pentacampeonato mundial de 2002."
        },
        {
            id: "casemiro",
            nome: "Casemiro",
            grupos: ["VOL", "MEIO"],
            periodo: "Era contemporânea",
            descricao:
                "Volante brasileiro conhecido pela marcação e pela proteção à defesa."
        },

        // MEIO-CAMPISTAS
        {
            id: "pele",
            nome: "Pelé",
            grupos: ["MEIO", "ATA"],
            periodo: "Décadas de 1950 a 1970",
            descricao:
                "Rei do futebol, tricampeão mundial e um dos maiores jogadores da história."
        },
        {
            id: "gerson",
            nome: "Gérson",
            grupos: ["MEIO"],
            periodo: "Década de 1970",
            descricao:
                "Meio-campista conhecido pela visão de jogo e pelos passes precisos."
        },
        {
            id: "rivellino",
            nome: "Rivellino",
            grupos: ["MEIO", "PONTA"],
            periodo: "Décadas de 1960 e 1970",
            descricao:
                "Craque da Seleção de 1970, reconhecido pela técnica e pelo chute potente."
        },
        {
            id: "soc rates",
            nome: "Sócrates",
            grupos: ["MEIO"],
            periodo: "Décadas de 1970 e 1980",
            descricao:
                "Meio-campista de grande visão de jogo, habilidade e liderança."
        },
        {
            id: "zico",
            nome: "Zico",
            grupos: ["MEIO", "ATA"],
            periodo: "Décadas de 1970 e 1980",
            descricao:
                "Ídolo brasileiro conhecido pela criação de jogadas e pela qualidade nas cobranças de falta."
        },
        {
            id: "falcao",
            nome: "Falcão",
            grupos: ["MEIO", "VOL"],
            periodo: "Décadas de 1970 e 1980",
            descricao:
                "Meio-campista técnico que se destacou pela inteligência tática."
        },
        {
            id: "kaka",
            nome: "Kaká",
            grupos: ["MEIO", "ATA"],
            periodo: "Décadas de 2000",
            descricao:
                "Meio-campista ofensivo brasileiro vencedor do prêmio de melhor jogador do mundo em 2007."
        },
        {
            id: "rivaldo",
            nome: "Rivaldo",
            grupos: ["MEIO", "ATA"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Um dos protagonistas da campanha brasileira do pentacampeonato em 2002."
        },
        {
            id: "ronaldinho",
            nome: "Ronaldinho Gaúcho",
            grupos: ["MEIO", "PONTA", "ATA"],
            periodo: "Décadas de 2000",
            descricao:
                "Craque reconhecido pela criatividade, pelo drible e pela habilidade com a bola."
        },

        // PONTAS
        {
            id: "garrincha",
            nome: "Garrincha",
            grupos: ["PONTA", "ATA"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Um dos maiores dribladores da história, destaque nas conquistas de 1958 e 1962."
        },
        {
            id: "jairzinho",
            nome: "Jairzinho",
            grupos: ["PONTA", "ATA"],
            periodo: "Década de 1970",
            descricao:
                "O Furacão da Copa, autor de gols em todas as partidas do Brasil em 1970."
        },
        {
            id: "zagallo",
            nome: "Mário Zagallo",
            grupos: ["PONTA"],
            periodo: "Décadas de 1950 e 1960",
            descricao:
                "Ponta da Seleção Brasileira nas conquistas mundiais de 1958 e 1962."
        },
        {
            id: "neymar",
            nome: "Neymar",
            grupos: ["PONTA", "ATA"],
            periodo: "Era contemporânea",
            descricao:
                "Atacante brasileiro conhecido pelo drible, pela criatividade e pela capacidade de decidir jogos."
        },
        {
            id: "vinicius",
            nome: "Vinícius Júnior",
            grupos: ["PONTA", "ATA"],
            periodo: "Era contemporânea",
            descricao:
                "Atacante brasileiro reconhecido pela velocidade e pelo um contra um."
        },

        // CENTROAVANTES E ATACANTES
        {
            id: "romario",
            nome: "Romário",
            grupos: ["ATA"],
            periodo: "Décadas de 1980 e 1990",
            descricao:
                "Centroavante decisivo na conquista da Copa do Mundo de 1994."
        },
        {
            id: "ronaldo",
            nome: "Ronaldo Fenômeno",
            grupos: ["ATA"],
            periodo: "Décadas de 1990 e 2000",
            descricao:
                "Bicampeão mundial, artilheiro da Copa de 2002 e um dos maiores centroavantes da história."
        },
        {
            id: "careca",
            nome: "Careca",
            grupos: ["ATA"],
            periodo: "Décadas de 1980 e 1990",
            descricao:
                "Centroavante brasileiro que se destacou pela técnica e pela finalização."
        },
        {
            id: "bebeto",
            nome: "Bebeto",
            grupos: ["ATA", "PONTA"],
            periodo: "Décadas de 1980 e 1990",
            descricao:
                "Atacante importante na conquista da Copa do Mundo de 1994."
        },
        {
            id: "adriano",
            nome: "Adriano",
            grupos: ["ATA"],
            periodo: "Década de 2000",
            descricao:
                "Centroavante conhecido pela força física e pela potência do chute."
        }
    ];

    // =====================================================
    // 3. FORMAÇÕES E POSIÇÕES NO CAMPO
    // =====================================================

    // x e y são porcentagens da área do campo.
    // A baliza adversária fica na parte superior.

    const formacoes = {
        "4-3-3": [
            { id: "GOL", nome: "Goleiro", sigla: "GOL", grupos: ["GOL"], x: 50, y: 91 },
            { id: "LD", nome: "Lateral-direito", sigla: "LD", grupos: ["LD"], x: 14, y: 75 },
            { id: "ZAG1", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 39, y: 77 },
            { id: "ZAG2", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 61, y: 77 },
            { id: "LE", nome: "Lateral-esquerdo", sigla: "LE", grupos: ["LE"], x: 86, y: 75 },
            { id: "MID1", nome: "Volante", sigla: "VOL", grupos: ["VOL", "MEIO"], x: 31, y: 58 },
            { id: "MID2", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL"], x: 50, y: 51 },
            { id: "MID3", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL"], x: 69, y: 58 },
            { id: "WING_L", nome: "Ponta-esquerda", sigla: "PE", grupos: ["PONTA", "ATA"], x: 17, y: 30 },
            { id: "ATA", nome: "Centroavante", sigla: "ATA", grupos: ["ATA"], x: 50, y: 22 },
            { id: "WING_R", nome: "Ponta-direita", sigla: "PD", grupos: ["PONTA", "ATA"], x: 83, y: 30 }
        ],

        "4-4-2": [
            { id: "GOL", nome: "Goleiro", sigla: "GOL", grupos: ["GOL"], x: 50, y: 91 },
            { id: "LD", nome: "Lateral-direito", sigla: "LD", grupos: ["LD"], x: 14, y: 75 },
            { id: "ZAG1", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 39, y: 77 },
            { id: "ZAG2", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 61, y: 77 },
            { id: "LE", nome: "Lateral-esquerdo", sigla: "LE", grupos: ["LE"], x: 86, y: 75 },
            { id: "MID1", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL", "PONTA"], x: 15, y: 52 },
            { id: "MID2", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL", "PONTA"], x: 38, y: 55 },
            { id: "MID3", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL", "PONTA"], x: 62, y: 55 },
            { id: "MID4", nome: "Meio-campista", sigla: "MC", grupos: ["MEIO", "VOL", "PONTA"], x: 85, y: 52 },
            { id: "ATA1", nome: "Atacante", sigla: "ATA", grupos: ["ATA"], x: 36, y: 28 },
            { id: "ATA2", nome: "Atacante", sigla: "ATA", grupos: ["ATA"], x: 64, y: 28 }
        ],

        "4-2-3-1": [
            { id: "GOL", nome: "Goleiro", sigla: "GOL", grupos: ["GOL"], x: 50, y: 91 },
            { id: "LD", nome: "Lateral-direito", sigla: "LD", grupos: ["LD"], x: 14, y: 75 },
            { id: "ZAG1", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 39, y: 77 },
            { id: "ZAG2", nome: "Zagueiro", sigla: "ZAG", grupos: ["ZAG"], x: 61, y: 77 },
            { id: "LE", nome: "Lateral-esquerdo", sigla: "LE", grupos: ["LE"], x: 86, y: 75 },
            { id: "MID1", nome: "Volante", sigla: "VOL", grupos: ["VOL", "MEIO"], x: 38, y: 61 },
            { id: "MID2", nome: "Volante", sigla: "VOL", grupos: ["VOL", "MEIO"], x: 62, y: 61 },
            { id: "AM_L", nome: "Meia pela esquerda", sigla: "ME", grupos: ["MEIO", "PONTA", "ATA"], x: 19, y: 41 },
            { id: "AM_C", nome: "Meia central", sigla: "MEI", grupos: ["MEIO", "ATA"], x: 50, y: 38 },
            { id: "AM_R", nome: "Meia pela direita", sigla: "MD", grupos: ["MEIO", "PONTA", "ATA"], x: 81, y: 41 },
            { id: "ATA", nome: "Centroavante", sigla: "ATA", grupos: ["ATA"], x: 50, y: 22 }
        ]
    };

    // =====================================================
    // 4. ESTADO DA APLICAÇÃO
    // =====================================================

    let formacaoAtual = formacaoSelect.value;
    let escalação = {};
    let posicaoAtiva = null;
    let temporizadorAviso = null;

    // =====================================================
    // 5. FUNÇÕES AUXILIARES
    // =====================================================

    function obterPosicoes() {
        return formacoes[formacaoAtual] || formacoes["4-3-3"];
    }

    function obterJogador(id) {
        return jogadores.find((jogador) => jogador.id === id);
    }

    function obterJogadorDaPosicao(idPosicao) {
        return obterJogador(escalação[idPosicao]);
    }

    function nomeCurto(nome) {
        const partes = nome.trim().split(/\s+/);

        if (partes.length === 1) {
            return partes[0].slice(0, 3).toUpperCase();
        }

        return (
            partes[0][0] +
            partes[partes.length - 1][0]
        ).toUpperCase();
    }

    function jogadorPodeJogar(jogador, posicao) {
        return jogador.grupos.some((grupo) =>
            posicao.grupos.includes(grupo)
        );
    }

    function obterIdsUtilizados(excetoPosicao = null) {
        return Object.entries(escalação)
            .filter(([idPosicao]) => idPosicao !== excetoPosicao)
            .map(([, idJogador]) => idJogador);
    }

    function quantidadeSelecionada() {
        return obterPosicoes().filter(
            (posicao) => Boolean(escalação[posicao.id])
        ).length;
    }

    function selecaoCompleta() {
        return quantidadeSelecionada() === 11;
    }

    function mostrarAviso(mensagem) {
        aviso.textContent = mensagem;
        aviso.classList.add("visivel");

        clearTimeout(temporizadorAviso);

        temporizadorAviso = setTimeout(() => {
            aviso.classList.remove("visivel");
        }, 3500);
    }

    // =====================================================
    // 6. RENDERIZAÇÃO DO CAMPO
    // =====================================================

    function renderizarCampo() {
        jogadoresCampo.innerHTML = "";

        obterPosicoes().forEach((posicao) => {
            const idJogador = escalação[posicao.id];
            const jogador = idJogador ? obterJogador(idJogador) : null;

            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "posicao";

            if (posicaoAtiva === posicao.id) {
                botao.classList.add("selecionado");
            }

            botao.style.left = `${posicao.x}%`;
            botao.style.top = `${posicao.y}%`;

            botao.setAttribute(
                "aria-label",
                `${posicao.nome}: ${
                    jogador ? jogador.nome : "escolher jogador"
                }`
            );

            botao.setAttribute(
                "aria-pressed",
                String(posicaoAtiva === posicao.id)
            );

            const avatar = document.createElement("span");
            avatar.className = "avatar-jogador";
            avatar.textContent = jogador
                ? nomeCurto(jogador.nome)
                : posicao.sigla;

            const nome = document.createElement("span");
            nome.className = "nome-campo";
            nome.textContent = jogador ? jogador.nome : "Escolher";

            botao.append(avatar, nome);

            botao.addEventListener("click", () => {
                posicaoAtiva = posicao.id;
                renderizarCampo();
                renderizarListaJogadores();
                atualizarPainel();
            });

            jogadoresCampo.appendChild(botao);
        });
    }

    // =====================================================
    // 7. LISTA DE JOGADORES DISPONÍVEIS
    // =====================================================

    function renderizarListaJogadores() {
        listaJogadores.innerHTML = "";

        const posicao = obterPosicoes().find(
            (item) => item.id === posicaoAtiva
        );

        if (!posicao) {
            return;
        }

        const idsEmOutrasPosicoes = obterIdsUtilizados(posicao.id);

        const disponiveis = jogadores.filter((jogador) =>
            jogadorPodeJogar(jogador, posicao)
        );

        disponiveis.forEach((jogador) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "cartao-jogador";

            const estaNestaPosicao =
                escalação[posicao.id] === jogador.id;

            const usadoEmOutraPosicao =
                idsEmOutrasPosicoes.includes(jogador.id);

            if (estaNestaPosicao) {
                botao.classList.add("escolhido");
            }

            botao.disabled = usadoEmOutraPosicao;

            const nome = document.createElement("strong");
            nome.textContent = jogador.nome;

            const periodo = document.createElement("span");
            periodo.textContent = jogador.periodo;

            const status = document.createElement("span");

            if (estaNestaPosicao) {
                status.textContent = "✓ Selecionado nesta posição";
            } else if (usadoEmOutraPosicao) {
                status.textContent = "Já está na sua seleção";
            } else {
                status.textContent = "Clique para escalar";
            }

            botao.append(nome, periodo, status);

            botao.addEventListener("click", () => {
                selecionarJogador(jogador.id);
            });

            listaJogadores.appendChild(botao);
        });

        if (disponiveis.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent =
                "Não há jogadores disponíveis para esta posição.";
            listaJogadores.appendChild(mensagem);
        }
    }

    // =====================================================
    // 8. SELECIONAR OU RETIRAR UM JOGADOR
    // =====================================================

    function selecionarJogador(idJogador) {
        const posicao = obterPosicoes().find(
            (item) => item.id === posicaoAtiva
        );

        const jogador = obterJogador(idJogador);

        if (!posicao || !jogador) {
            mostrarAviso("Selecione uma posição primeiro.");
            return;
        }

        if (!jogadorPodeJogar(jogador, posicao)) {
            mostrarAviso("Esse jogador não corresponde à posição.");
            return;
        }

        if (escalação[posicao.id] === idJogador) {
            delete escalação[posicao.id];

            mostrarAviso(`${jogador.nome} foi retirado da posição.`);
        } else {
            const jaUtilizado = Object.entries(escalação).some(
                ([id, jogadorEscalado]) =>
                    id !== posicao.id && jogadorEscalado === idJogador
            );

            if (jaUtilizado) {
                mostrarAviso(
                    "Esse jogador já está escalado em outra posição."
                );
                return;
            }

            escalação[posicao.id] = idJogador;

            mostrarAviso(`${jogador.nome} foi escalado!`);
        }

        resultado.hidden = true;

        renderizarTudo();
    }

    // =====================================================
    // 9. PAINEL DE INFORMAÇÕES
    // =====================================================

    function atualizarPainel() {
        const posicao = obterPosicoes().find(
            (item) => item.id === posicaoAtiva
        );

        detalhesJogador.innerHTML = "";

        if (!posicao) {
            tituloJogador.textContent = "Escolha seus craques";
            instrucao.textContent =
                "Selecione uma posição no campo para começar a montar seu time.";
            return;
        }

        const jogador = obterJogadorDaPosicao(posicao.id);

        tituloJogador.textContent = posicao.nome;

        if (!jogador) {
            instrucao.textContent =
                `Escolha um jogador para a posição ${posicao.nome}.`;

            return;
        }

        instrucao.textContent =
            `${jogador.nome} está escalado como ${posicao.nome}.`;

        const ficha = document.createElement("div");
        ficha.className = "ficha";

        const nome = document.createElement("strong");
        nome.textContent = jogador.nome;

        const periodo = document.createElement("p");
        periodo.textContent = `Período: ${jogador.periodo}`;

        const descricao = document.createElement("p");
        descricao.textContent = jogador.descricao;

        ficha.append(nome, periodo, descricao);
        detalhesJogador.appendChild(ficha);
    }

    // =====================================================
    // 10. CONTADOR E BARRA DE PROGRESSO
    // =====================================================

    function atualizarProgresso() {
        const quantidade = quantidadeSelecionada();

        contador.textContent = `${quantidade} de 11 titulares`;

        progressoPreenchido.style.width =
            `${(quantidade / 11) * 100}%`;

        progressoPreenchido.setAttribute(
            "role",
            "progressbar"
        );

        progressoPreenchido.setAttribute(
            "aria-valuemin",
            "0"
        );

        progressoPreenchido.setAttribute(
            "aria-valuemax",
            "11"
        );

        progressoPreenchido.setAttribute(
            "aria-valuenow",
            String(quantidade)
        );
    }

    // =====================================================
    // 11. RESULTADO DA ESCALAÇÃO
    // =====================================================

    function gerarResumo() {
        const linhas = obterPosicoes().map((posicao) => {
            const jogador = obterJogadorDaPosicao(posicao.id);

            return jogador
                ? `${posicao.nome}: ${jogador.nome}`
                : `${posicao.nome}: vaga vazia`;
        });

        return (
            `Formação: ${formacaoAtual}\n\n` +
            linhas.join("\n")
        );
    }

    function mostrarResultado() {
        if (!selecaoCompleta()) {
            mostrarAviso(
                `Ainda faltam ${11 - quantidadeSelecionada()} posições.`
            );
            return false;
        }

        resumoResultado.textContent = gerarResumo();
        resultado.hidden = false;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        return true;
    }

    // =====================================================
    // 12. SALVAR NO NAVEGADOR
    // =====================================================

    function salvarSelecao() {
        if (!mostrarResultado()) {
            return;
        }

        const dados = {
            versao: 1,
            formacao: formacaoAtual,
            escalação,
            salvoEm: new Date().toISOString()
        };

        try {
            localStorage.setItem(
                CHAVE_STORAGE,
                JSON.stringify(dados)
            );

            mostrarAviso(
                "Sua Seleção Histórica foi salva neste navegador!"
            );
        } catch (erro) {
            console.error("Erro ao salvar a seleção:", erro);

            mostrarAviso(
                "Não foi possível salvar. Verifique as configurações do navegador."
            );
        }
    }

    function carregarSelecao() {
        try {
            const salvo = localStorage.getItem(CHAVE_STORAGE);

            if (!salvo) {
                return;
            }

            const dados = JSON.parse(salvo);

            if (
                !dados ||
                !formacoes[dados.formacao] ||
                typeof dados.escalação !== "object" ||
                dados.escalação === null ||
                Array.isArray(dados.escalação)
            ) {
                return;
            }

            formacaoAtual = dados.formacao;
            formacaoSelect.value = formacaoAtual;

            const restaurada = {};
            const jogadoresUsados = new Set();

            formacoes[formacaoAtual].forEach((posicao) => {
                const idJogador = dados.escalação[posicao.id];
                const jogador = obterJogador(idJogador);

                if (
                    jogador &&
                    jogadorPodeJogar(jogador, posicao) &&
                    !jogadoresUsados.has(jogador.id)
                ) {
                    restaurada[posicao.id] = jogador.id;
                    jogadoresUsados.add(jogador.id);
                }
            });

            escalação = restaurada;

            if (selecaoCompleta()) {
                resumoResultado.textContent = gerarResumo();
                resultado.hidden = false;
            }
        } catch (erro) {
            console.error("Não foi possível carregar a seleção:", erro);
        }
    }

    // =====================================================
    // 13. COMPARTILHAR A ESCALAÇÃO
    // =====================================================

    async function compartilharSelecao() {
        if (quantidadeSelecionada() === 0) {
            mostrarAviso("Monte sua seleção antes de compartilhar.");
            return;
        }

        const texto =
            "🇧🇷 Minha Seleção Histórica Brasileira\n\n" +
            gerarResumo() +
            "\n\nMonte sua seleção também!";

        try {
            if (typeof navigator.share === "function") {
                await navigator.share({
                    title: "Minha Seleção Histórica",
                    text: texto
                });

                return;
            }

            if (
                navigator.clipboard &&
                typeof navigator.clipboard.writeText === "function"
            ) {
                await navigator.clipboard.writeText(texto);

                mostrarAviso(
                    "Escalação copiada! Agora é só colar onde quiser."
                );

                return;
            }

            // Alternativa para navegadores sem compartilhamento
            // ou acesso à área de transferência.
            const campoTexto = document.createElement("textarea");

            campoTexto.value = texto;
            campoTexto.setAttribute("readonly", "");
            campoTexto.style.position = "fixed";
            campoTexto.style.left = "-9999px";

            document.body.appendChild(campoTexto);
            campoTexto.select();

            const copiou = document.execCommand("copy");

            campoTexto.remove();

            if (copiou) {
                mostrarAviso(
                    "Escalação copiada! Agora é só colar onde quiser."
                );
            } else {
                mostrarAviso(
                    "Não foi possível copiar automaticamente neste navegador."
                );
            }
        } catch (erro) {
            if (erro.name === "AbortError") {
                return;
            }

            console.error("Erro ao compartilhar:", erro);

            mostrarAviso(
                "Não foi possível compartilhar. Tente novamente."
            );
        }
    }

    // =====================================================
    // 14. REINICIAR A ESCALAÇÃO
    // =====================================================

    function abrirConfirmacao() {
        if (dialogo && typeof dialogo.showModal === "function") {
            if (!dialogo.open) {
                dialogo.showModal();
            }
        } else {
            const confirmou = window.confirm(
                "Deseja realmente reiniciar sua seleção?"
            );

            if (confirmou) {
                limparSelecao();
            }
        }
    }

    function limparSelecao() {
        escalação = {};
        posicaoAtiva = null;

        resultado.hidden = true;
        resumoResultado.textContent = "";

        try {
            localStorage.removeItem(CHAVE_STORAGE);
        } catch (erro) {
            console.error("Erro ao remover a seleção salva:", erro);
        }

        if (dialogo && dialogo.open) {
            dialogo.close();
        }

        renderizarTudo();
        mostrarAviso("Sua seleção foi reiniciada!");
    }

    // =====================================================
    // 15. TROCAR A FORMAÇÃO TÁTICA
    // =====================================================

    function trocarFormacao() {
        const novaFormacao = formacaoSelect.value;

        if (!formacoes[novaFormacao]) {
            mostrarAviso("Formação inválida.");
            formacaoSelect.value = formacaoAtual;
            return;
        }

        formacaoAtual = novaFormacao;

        const posicoesValidas = formacoes[formacaoAtual];
        const jogadoresMantidos = {};
        const jogadoresUsados = new Set();

        // Preserva os jogadores que continuam compatíveis
        // com as posições da nova formação.
        posicoesValidas.forEach((posicao) => {
            const idJogador = escalação[posicao.id];
            const jogador = obterJogador(idJogador);

            if (
                jogador &&
                jogadorPodeJogar(jogador, posicao) &&
                !jogadoresUsados.has(jogador.id)
            ) {
                jogadoresMantidos[posicao.id] = jogador.id;
                jogadoresUsados.add(jogador.id);
            }
        });

        escalação = jogadoresMantidos;

        if (
            !posicoesValidas.some(
                (posicao) => posicao.id === posicaoAtiva
            )
        ) {
            posicaoAtiva = null;
        }

        resultado.hidden = true;

        renderizarTudo();

        mostrarAviso(
            `Formação alterada para ${formacaoAtual}. Confira as posições do time.`
        );
    }

    // =====================================================
    // 16. ATUALIZAR A INTERFACE
    // =====================================================

    function renderizarTudo() {
        renderizarCampo();
        renderizarListaJogadores();
        atualizarPainel();
        atualizarProgresso();
    }

    // =====================================================
    // 17. EVENTOS DOS BOTÕES E CONTROLES
    // =====================================================

    formacaoSelect.addEventListener("change", trocarFormacao);

    botaoSalvar.addEventListener("click", salvarSelecao);

    botaoCompartilhar.addEventListener(
        "click",
        compartilharSelecao
    );

    botaoLimpar.addEventListener("click", abrirConfirmacao);

    if (botaoCancelarLimpeza) {
        botaoCancelarLimpeza.addEventListener("click", () => {
            if (dialogo && dialogo.open) {
                dialogo.close();
            }
        });
    }

    if (botaoConfirmarLimpeza) {
        botaoConfirmarLimpeza.addEventListener(
            "click",
            limparSelecao
        );
    }

    // =====================================================
    // 18. INICIALIZAÇÃO
    // =====================================================

    carregarSelecao();
    renderizarTudo();

    console.log("CBF História: Seleção Histórica inicializada!");
});


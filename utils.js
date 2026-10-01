// Usado por dashboard.js, finish.js e calendario.js.

// HISTÓRICO

function lerHistorico() {
    return JSON.parse(localStorage.getItem("historico")) || [];
}

function salvarHistorico(historico) {
    localStorage.setItem("historico", JSON.stringify(historico));
}

// formata uma data (objeto Date) como "AAAA-MM-DD", no fuso LOCAL do dispositivo
function formatarData(date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
}


function dataDeHoje() {
    return formatarData(new Date());
}

// calcula quantos dias seguidos (até hoje ou ontem) o usuário tem registro no histórico. Conta "uso do app", não desempenho — um dia com progresso baixo ainda conta pro streak, desde que o dia tenha sido finalizado.
function calcularStreak() {
 
    const historico = lerHistorico();
    const datasComRegistro = new Set(historico.map(function (item) {
        return item.data;
    }));
 
    let streak = 0;
    const cursor = new Date();
 
    // se hoje ainda não foi finalizado, começa a contagem a partir de ontem, assim o streak não "quebra" só porque o dia de hoje ainda não acabou)
    if (!datasComRegistro.has(formatarData(cursor))) {
        cursor.setDate(cursor.getDate() - 1);
    }
 
    while (datasComRegistro.has(formatarData(cursor))) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }
 
    return streak;
}

function saudacaoPorHorario() {
 
    const hora = new Date().getHours();
 
    if (hora >= 5 && hora < 12) return "Bom dia!";
    if (hora >= 12 && hora < 18) return "Boa tarde!";
    return "Boa noite!";
}

// PERSONAGEM

function lerPersonagem() {

    const salvo = localStorage.getItem("personagem");

    if (salvo === null) {
        // primeira vez que o app roda, o personagem começa com HP cheio
        return { hp: 100, estadoDerrota: false, tarefasParaRecuperar: 0 };
    }

    return JSON.parse(salvo);
}

function salvarPersonagem(personagem) {
    localStorage.setItem("personagem", JSON.stringify(personagem));
}

// desempenho do dia -> variação de HP
function calcularVariacaoHP(progresso) {

    if (progresso === 100) return 5;
    if (progresso >= 90) return 3;
    if (progresso >= 80) return 1;
    if (progresso >= 70) return 0;
    if (progresso >= 60) return -5;
    if (progresso >= 40) return -10;
    if (progresso >= 20) return -20;
    return -30; // 0-19%
}

// HP -> { emoji, texto } do estado atual
function obterEstadoPersonagem(hp) {

    if (hp === 0) return { emoji: "☠️", texto: "Derrotado" };
    if (hp <= 20) return { emoji: "💀", texto: "Estado crítico" };
    if (hp <= 40) return { emoji: "😰", texto: "Gravemente ferido" };
    if (hp <= 60) return { emoji: "😣", texto: "Ferido" };
    if (hp <= 80) return { emoji: "😐", texto: "Cansado" };
    return { emoji: "😊", texto: "Saudável" };
}

// aplica a variação de HP do dia (chamado 1x, ao finalizar o dia)
function atualizarHPDoDia(progresso) {

    const personagem = lerPersonagem();

    // se está em recuperação, a tabela normal de HP não se aplica
    if (personagem.estadoDerrota) {
        return { variacao: 0, novoHP: personagem.hp, emRecuperacao: true };
    }

    const variacao = calcularVariacaoHP(progresso);

    let novoHP = personagem.hp + variacao;

    // nunca deixa passar de 100 nem ficar negativo
    if (novoHP > 100) novoHP = 100;
    if (novoHP < 0) novoHP = 0;

    personagem.hp = novoHP;

    // entra em estado de derrota
    if (novoHP === 0) {
        personagem.estadoDerrota = true;
        personagem.tarefasParaRecuperar = 0;
    }

    salvarPersonagem(personagem);

    return { variacao, novoHP, emRecuperacao: false };
}

// META_RECUPERACAO tarefas concluídas em estado de derrota = revive
const META_RECUPERACAO = 3;
const HP_AO_REVIVER = 20;

function avancarRecuperacao() {

    const personagem = lerPersonagem();

    if (!personagem.estadoDerrota) {
        return personagem; // só faz algo se o personagem estiver derrotado
    }

    personagem.tarefasParaRecuperar += 1;

    if (personagem.tarefasParaRecuperar >= META_RECUPERACAO) {
        // reviveu!
        personagem.estadoDerrota = false;
        personagem.hp = HP_AO_REVIVER;
        personagem.tarefasParaRecuperar = 0;
    }

    salvarPersonagem(personagem);

    return personagem;
}

// CALENDÁRIO

// progresso do dia -> { cor, emoji } pra pintar a célula do calendário
function classificarDia(progresso) {

    if (progresso >= 80) return { cor: "verde", emoji: "🟢" };
    if (progresso >= 60) return { cor: "amarelo", emoji: "🟡" };
    if (progresso >= 40) return { cor: "laranja", emoji: "🟠" };
    return { cor: "vermelho", emoji: "🔴" };
}
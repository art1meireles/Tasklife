const progress = Number(localStorage.getItem("finalProgress"));

const title = document.getElementById("result-title");
const result = document.getElementById("result-progress");
const backButton = document.getElementById("back-btn");

if (progress === 100) {
    title.textContent = "Missão dada é missão cumprida!";
} else if (progress >= 50) {
    title.textContent = "Um passo de cada vez!";
} else if (progress < 50) {
    title.textContent = "Amanhã será melhor!";
}

result.textContent = `${Math.round(progress)}%`;

backButton.addEventListener("click", function () {
    window.location.href = "index.html";
});

const personagem = lerPersonagem();
const estado = obterEstadoPersonagem(personagem.hp);
 
document.getElementById("personagem-emoji").textContent = estado.emoji;
document.getElementById("personagem-hp").textContent = `❤️ ${personagem.hp}/100`;
 
if (personagem.estadoDerrota) {
 
    const faltam = META_RECUPERACAO - personagem.tarefasParaRecuperar;
 
    document.getElementById("personagem-estado").textContent =
        "Seu personagem foi derrotado.";
 
    document.getElementById("personagem-variacao").textContent =
        `Complete ${faltam} tarefa(s) para recuperá-lo. `
        + `[ ${personagem.tarefasParaRecuperar} / ${META_RECUPERACAO} ]`;
 
} else {
 
    document.getElementById("personagem-estado").textContent =
        `Seu personagem está ${estado.texto.toLowerCase()}.`;
 
    // mostra a variação de HP do dia (lida do último registro salvo)
    const historico = lerHistorico();
    const ultimoRegistro = historico[historico.length - 1];
 
    if (ultimoRegistro) {
        const variacao = calcularVariacaoHP(ultimoRegistro.progresso);
        const sinal = variacao > 0 ? "+" : "";
        document.getElementById("personagem-variacao").textContent =
            variacao === 0 ? "" : `${sinal}${variacao} HP`;
    }
}
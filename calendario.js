const hoje = new Date();
const ano = hoje.getFullYear();
const mes = hoje.getMonth(); // 0 = Janeiro

document.getElementById("calendario-titulo").textContent =
    `${NOMES_MESES[mes]} de ${ano}`;

// ALTERADO: a montagem da grade agora é uma função compartilhada em utils.js
// (usada também pelo mini calendário da tela inicial)
construirGradeCalendario(document.getElementById("calendario-grade"), ano, mes);

document.getElementById("voltar-btn").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});
const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", function () {
    window.location.href = "dashboard.html";
});

document.getElementById("saudacao").textContent = saudacaoPorHorario();

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = hoje.getMonth();
 
document.getElementById("mini-calendario-titulo").textContent =
    `${NOMES_MESES[mes]} de ${ano}`;
 
construirGradeCalendario(
    document.getElementById("mini-calendario-grade"),
    ano,
    mes
);
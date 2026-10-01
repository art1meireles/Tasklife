const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", function () {
    window.location.href = "dashboard.html";
});

document.getElementById("saudacao").textContent = saudacaoPorHorario();

const streakAtual = calcularStreak();
const streakEl = document.getElementById("streak");

if (streakAtual > 0) {
 
    const plural = streakAtual > 1 ? "s" : "";
 
    streakEl.textContent =
        `Você já usou o app ${streakAtual} dia${plural} seguido${plural} 🔥`;
 
    streakEl.classList.add("visivel");
} // se streakAtual for 0, o parágrafo fica vazio (sem classe "visivel") e some do layout

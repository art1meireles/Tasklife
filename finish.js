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
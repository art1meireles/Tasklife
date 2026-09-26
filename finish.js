const progress = Number(localStorage.getItem("finalProgress"));
const title = document.getElementById("result-title");
const result = document.getElementById("result-progress");

if (progress === 100) {
 title.textContent = "Você concluiu tudo!";
} else {
 title.textContent = "Continue tentando!";
}

result.textContent = `${Math.round(progress)}%`;

const historico = lerHistorico();

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = hoje.getMonth(); // 0 = Janeiro

const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

document.getElementById("calendario-titulo").textContent =
    `${nomesMeses[mes]} de ${ano}`;

// quantos dias tem esse mês
const diasNoMes = new Date(ano, mes + 1, 0).getDate();

// em que dia da semana o mês começa (0 = Domingo -> ajustamos pra 0 = Segunda)
const primeiroDiaSemana = (new Date(ano, mes, 1).getDay() + 6) % 7;

const grade = document.getElementById("calendario-grade");

// células vazias antes do dia 1, pra alinhar com o dia da semana certo
for (let i = 0; i < primeiroDiaSemana; i++) {
    const vazio = document.createElement("div");
    vazio.classList.add("dia-vazio");
    grade.appendChild(vazio);
}

// um dia do mês por vez
for (let dia = 1; dia <= diasNoMes; dia++) {

    const dataFormatada =
        `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

    // procura no histórico se existe um registro pra esse dia
    const registro = historico.find(function (item) {
        return item.data === dataFormatada;
    });

    const celula = document.createElement("div");
    celula.classList.add("dia-calendario");

    const numero = document.createElement("span");
    numero.classList.add("dia-numero");
    numero.textContent = dia;

    const marcador = document.createElement("span");
    marcador.classList.add("dia-marcador");

    if (registro) {
        const classificacao = classificarDia(registro.progresso);
        celula.classList.add(`dia-${classificacao.cor}`);
        marcador.textContent = classificacao.emoji;
        celula.title = `${registro.concluidas}/${registro.totalTarefas} tarefas (${registro.progresso}%)`;
    } else {
        celula.classList.add("dia-sem-registro");
        marcador.textContent = "⚪";
    }

    celula.appendChild(numero);
    celula.appendChild(marcador);
    grade.appendChild(celula);
}

document.getElementById("voltar-btn").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});
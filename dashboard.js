const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const finishButton = document.getElementById("finish-btn");

let tasks = [];

function createTaskElement(task) {

    //era <p>, virou <div> pra caber o texto e o botão lado a lado
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    //o texto da tarefa agora é um <span> dentro da div (antes era o próprio <p> que guardava o texto)
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task;

    // botão de editar
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "editar"
    editButton.title = "Editar tarefa";

    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);

    // clicar no texto marca/desmarca como concluída igual antes, só que agora quem recebe a classe "completed" é o taskItem, não o texto
    taskText.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
        updateProgress();
    });

    // clicar no lápis entra em modo de edição
    editButton.addEventListener("click", function (event) {
        event.stopPropagation(); // NOVO: não deixa o clique "vazar" pro taskText
        startEditing(taskItem, taskText);
    });

    return taskItem;
}

// troca o texto por um campo de input,     deixa o usuário digitar, e salva de volta no array "tasks".

function startEditing(taskItem, taskText) {

    const currentText = taskText.textContent;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = currentText;

    // troca o <span> pelo <input> dentro do mesmo item
    taskItem.replaceChild(editInput, taskText);
    editInput.focus();
    editInput.select();

    function saveEdit() {

        const newText = editInput.value.trim();

        // encontra a posição dessa tarefa dentro da lista, pra saber qual índice do array "tasks" precisa ser atualizado
        const index = Array.from(taskList.children).indexOf(taskItem);

        if (newText === "") {
            taskText.textContent = currentText; // não deixa salvar tarefa vazia; mantém o texto anterior
        } else {
            taskText.textContent = newText;
            tasks[index] = newText; // atualiza o array também
        }

        taskItem.replaceChild(taskText, editInput);
    }

    editInput.addEventListener("blur", saveEdit);

    editInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            editInput.blur(); // Enter confirma (dispara o "blur" acima)
        }

        if (event.key === "Escape") {
            editInput.value = currentText; // Esc cancela a edição
            editInput.blur();
        }
    });
}

addTaskButton.addEventListener("click", function () {

    const task = taskInput.value;

    if (task.trim() === "") {
        return; // ignora tarefa vazia
    }

    if (tasks.length >= 7) {
        return; // limite de 7 tarefas
    }

    tasks.push(task);

    // antes criava o <p> aqui direto; agora chama a função nova, que já monta o item com texto + botão de editar
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);

    taskInput.value = "";

    updateProgress();
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

function updateProgress() {

    const completedTasks = document.querySelectorAll(".completed").length;
    const totalTasks = tasks.length;

    if (totalTasks === 0) {
        progressBar.value = 0;
        progressText.textContent = "0%";
        return;
    }

    const progress = (completedTasks / totalTasks) * 100;

    progressBar.value = progress;
    progressText.textContent = `${Math.round(progress)}%`;
}

const date = new Date();

const weekdays = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
];

const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

document.getElementById("weekday").textContent = weekdays[date.getDay()];
document.getElementById("day").textContent = date.getDate();
document.getElementById("month").textContent = months[date.getMonth()];


finishButton.addEventListener("click", function () {

    localStorage.setItem("finalProgress", progressBar.value);

    window.location.href = "finish.html";

});
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = [];

addTaskButton.addEventListener("click", function () {
 const task = taskInput.value;
 
 if (task.trim() === "") { //trim remove espaços em branco no início e no final da string
    return; //ignora tarefas vazias
 }
 
 if (tasks.length >= 7) {
 return; // limite de 7 tarefas
 }
 
 tasks.push(task); //adiciona a tarefa ao array de tarefas
 
 const taskElement = document.createElement("p"); //cria um elemento <p> para a tarefa
 taskElement.textContent = task; //coloca o conteudo de task no elemento <p>
 taskList.appendChild(taskElement);// põe o elemento <p> dentro do elemento taskList

 taskElement.addEventListener("click", function () {
   taskElement.classList.toggle("completed");
   updateProgress();
 });

 taskInput.value = "";
 updateProgress();
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

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

const weekdays = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const weekday = weekdays[date.getDay()]; // 0 = Domingo ... 6 = Sábado
const day = date.getDate();
const month = months[date.getMonth()];

document.getElementById("weekday").textContent = weekday;
document.getElementById("day").textContent = day;
document.getElementById("month").textContent = month;

const finishButton = document.getElementById("finish-btn");

finishButton.addEventListener("click", function () {
 
    localStorage.setItem("finalProgress", progressBar.value);
 
    window.location.href = "finish.html";
 
});
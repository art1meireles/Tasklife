const voltarBtn = document.getElementById("voltar-instrucoes-btn");

voltarBtn.addEventListener("click", function () {

    // volta pra página anterior (index).
    // Se não houver histórico de navegação (ex: abriu o link direto), cai no index.html como padrão.
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
});
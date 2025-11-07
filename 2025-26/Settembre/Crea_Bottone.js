let btnGioca = document.createElement("button");
    btnGioca.id = "btnGioca";
    btnGioca.textContent = "Avvia gioco!";
    btnGioca.addEventListener("click", function () {
        btnGioca.disabled = true;
        random = setInterval(giraECrea, 500);
    })
    body.appendChild(btnGioca);
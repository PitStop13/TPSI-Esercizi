const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5],
    [8, "8 e mezzo", false, "20-05-2025", 5],
    [9, "Oppenheimer", true, "19-05-2025", 5]
];

window.addEventListener("load", function () {
    LoadFilmTable();

    const btnAdd = document.getElementById("btn-add");
    btnAdd.addEventListener("click", BtnAddClick);

    const btnClear = document.getElementById("btn-clear");
    btnClear.addEventListener("click", BtnClearClick);

    const btnReload = document.getElementById("btn-reload");
    btnReload.addEventListener("click", BtnReloadClick);

    const btnCount = document.getElementById("btn-count");
    btnCount.addEventListener("click", BtnCountClick);

    const btnLogin = document.getElementById("btn-login");
    btnLogin.addEventListener("click", BtnLoginClick);
});

/*
<tr>
    <td>1</td>
    <td>Pulp Fiction</td>
    <td>
        <input type="checkbox" checked />
    </td>
    <td>
        10-03-2024
    </td>
    <td>
        <i class="bi bi-star-fill"></i>
        ...
        <i class="bi bi-star"></i>
    </td>
</tr>
*/
function LoadFilmTable() {
    const filmTableTBody = document.querySelector("#film-table > tbody");

    for (const film of films) {
        // New row
        const tr = document.createElement("tr");

        // td
        let td = document.createElement("td");
        td.textContent = film[0];

        tr.appendChild(td);

        // Title
        td = document.createElement("td");
        td.textContent = film[1];

        tr.appendChild(td);

        // Favorite
        td = document.createElement("td");

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.checked = film[2];
        chk.disabled = true;

        td.appendChild(chk);
        tr.appendChild(td);

        // Watch Date
        td = document.createElement("td");
        td.textContent = film[3];

        tr.appendChild(td);

        // Rating
        td = document.createElement("td");

        for (let i = 1; i <= 5; i++) {
            const icon = document.createElement("i");
            
            // Se sono al di sotto del rating devo agg. stella piena
            if (i <= film[4]) {
                icon.classList.add("bi-star-fill");
            }
            else {
                icon.classList.add("bi-star");
            }

            td.appendChild(icon);
        }

        tr.appendChild(td);

        filmTableTBody.appendChild(tr);
    }
}

function BtnAddClick() {
    const filmTableTBody = document.querySelector("#film-table > tbody");

    // New row
    const tr = document.createElement("tr");

    // Id
    let td = document.createElement("td");
    td.textContent = Math.floor(Math.random() * 100) + 1;

    tr.appendChild(td);

    // Title
    td = document.createElement("td");
    td.textContent = "Nuovo Film";

    tr.appendChild(td);

    // Favorite
    td = document.createElement("td");

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = false;
    chk.disabled = true;

    td.appendChild(chk);
    tr.appendChild(td);

    // Watch Date
    td = document.createElement("td");
    td.textContent = "Oggi";

    tr.appendChild(td);

    // Rating
    td = document.createElement("td");
    const rating = Math.floor(Math.random() * 5) + 1;

    for (let i = 1; i <= 5; i++) {
        const icon = document.createElement("i");
        icon.classList.add("bi");

        // Se sono al di sotto del rating devo agg. stella piena
        if (i <= rating) {
            icon.classList.add("bi-star-fill");
        }
        else {
            icon.classList.add("bi-star");
        }

        td.appendChild(icon);
    }

    tr.appendChild(td);

    filmTableTBody.appendChild(tr);
}

function BtnClearClick() {
    const filmTableTBody = document.querySelector("#film-table > tbody");
    filmTableTBody.innerHTML = "";
}

function BtnReloadClick() {
    BtnClearClick();
    LoadFilmTable();
}

function BtnCountClick() {
    const nRows = document.querySelectorAll("#film-table > tbody > tr").length;

    const countFilmModal = new bootstrap.Modal("#count-film-modal");

    document.getElementById("span-n-films").textContent = nRows;

    countFilmModal.show();
}

function BtnLoginClick() {
    // Rimuovo d-none --> Mostro l'alert
    document.getElementById("alert-login").classList.remove("d-none");

    // Setto un timer che dopo 4000 ms (4 s) chiamerà la funzione hideAlertLogin
    setTimeout(hideAlertLogin, 4000);
}

function hideAlertLogin() {
    document.getElementById("alert-login").classList.add("d-none");
}
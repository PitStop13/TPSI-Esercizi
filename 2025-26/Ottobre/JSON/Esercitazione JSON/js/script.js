let jsonDoc;

window.onload = function () {
    let json = localStorage.getItem("jsonRegistro");
    if (json != null) {
        jsonDoc = JSON.parse(json); //trasformo stringa in oggetto
    } else {
        jsonDoc = [];
    };
    aggiungiaTabella();
}

function salva() {
    let registro = {};
    registro.data = document.getElementById("dataSelezione").value;
    registro.materia = document.getElementById("txtMateria").value;
    registro.voto = document.getElementById("txtVoto").value;

    const tipoSelezionato = document.querySelector('input[name="btnradio"]:checked');
    let tipoTesto = '';
    if (tipoSelezionato) {
        const labelTipo = document.querySelector(`label[for="${tipoSelezionato.id}"]`);
        tipoTesto = labelTipo ? labelTipo.textContent : '';
    }
    registro.tipo = tipoTesto;

    if (!registro.data || !registro.materia || !registro.voto || !registro.tipo) {
        alert("Devi compilare tutti i campi prima di inserire un voto....");
        return;
    }

    jsonDoc.push(registro);
    let json = JSON.stringify(jsonDoc);
    localStorage.setItem("jsonRegistro", json);

    annulla()
    aggiungiaTabella();
}

function aggiungiaTabella() {
    const tabellaBody = document.getElementById('subjectTableBody');
    tabellaBody.innerHTML = '';

    jsonDoc.forEach((voto, index) => {
        const nuovaRiga = document.createElement('tr');
        nuovaRiga.innerHTML = `
            <td>${formattaData(voto.data)}</td>
            <td>${voto.materia}</td>
            <td>${voto.voto}</td>
            <td>${voto.tipo}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminaVoto(${index})">
                    Elimina
                </button>
            </td>
        `;

        tabellaBody.appendChild(nuovaRiga);
    });
}

function formattaData(dataString) {
    if (!dataString) return '';
    const [anno, mese, giorno] = dataString.split('-');
    return `${giorno}/${mese}/${anno}`;
}

function eliminaVoto(indice) {
    jsonDoc.splice(indice, 1);

    let json = JSON.stringify(jsonDoc);
    localStorage.setItem("jsonRegistro", json);

    aggiungiaTabella();
}

function annulla() {
    document.getElementById('form').reset();
}
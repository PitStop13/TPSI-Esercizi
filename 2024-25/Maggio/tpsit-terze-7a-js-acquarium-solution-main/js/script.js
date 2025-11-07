const rows = [
  ["Biglietto bambini", 20, 199],
  ["Biglietto base", 35, 999],
  ["Biglietto normale", 40, 599],
  ["Biglietto deluxe", 50, 999],
  ["Biglietto luxury + 1 notte in albergo", 195, 9],
];

function populateTable() {
  const table_body = document.querySelector("#acquarium-table > tbody");

  for (let i = 0; i < rows.length; i++) {
    const tr = document.createElement("tr");

    // Adding first row (# = i + 1)
    let td = document.createElement("td");

    td.innerText = i + 1;

    tr.appendChild(td);

    for (let j = 0; j < rows[i].length; j++) {
      td = document.createElement("td");

      td.innerText = rows[i][j];

      tr.appendChild(td);
    }

    table_body.appendChild(tr);
  }
}

function alertAvgPrice() {
  let average = 0;

  for (let i = 0; i < rows.length; i++) {
    // j = 1 -> ticket price for that row
    const ticket_price = parseFloat(rows[i][1]);
    average += ticket_price;
  }

  average /= rows.length;

  alert("Costo medio biglietto = " + average + "€");
}

function showTermsOfService() {
  const tos = document.getElementById("tos");
  tos.classList.remove("hide");
}

function hideTermsOfService() {
  const tos = document.getElementById("tos");
  tos.classList.add("hide");
}

window.addEventListener("load", function() {
  const calculate_avg_btn = document.getElementById("calculate-avg-btn");
  calculate_avg_btn.addEventListener("click", alertAvgPrice);

  const show_tos_btn = document.getElementById("show-tos-btn");
  show_tos_btn.addEventListener("click", showTermsOfService);

  const tos = document.getElementById("tos");
  tos.addEventListener("click", hideTermsOfService);

  populateTable();
});
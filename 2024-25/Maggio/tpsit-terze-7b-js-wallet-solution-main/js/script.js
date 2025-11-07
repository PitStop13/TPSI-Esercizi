const rows = [
  ["mifVK6cxWM1RCkCP6fYd4Ez2x13sEeRw3V", 0.0001],
  ["n35wQdJmdXmh6MVDLBhtCCgbhtUgkUPhij", 0.00027],
  ["ms1dVEVjCdXtR1qB3XY6ja6GSzCroHwctw", 0.1],
  ["mo9L9i232CoD7rCokGfcqH4diWwoP2BkRX", 1],
];

// 1 BTC = 24900 €
const btc_eur_value = 24900;

// This is the professor very own BTC address
const professor_wallet_address = "1LQoWist8KkaUXSPKZHNvEyfrEkPHzSsCd";

function populateTable() {
  const table_body = document.querySelector("#transactions-table > tbody");

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

    // Adding last row (countervalue)
    td = document.createElement("td");

    const btc_transaction_value = parseFloat(rows[i][1]);
    td.innerText = btc_transaction_value * btc_eur_value;

    tr.appendChild(td);

    table_body.appendChild(tr);
  }
}

function sendBTC() {
  const table_body = document.querySelector("#transactions-table > tbody");

  const new_tx_tr = document.createElement("tr");

  let td = document.createElement("td");
  td.innerText = "in attesa...";
  new_tx_tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = professor_wallet_address;
  new_tx_tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = 1;
  new_tx_tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = btc_eur_value;
  new_tx_tr.appendChild(td);

  table_body.appendChild(new_tx_tr);

  // remove 1 BTC from balance
  const btc_balance_txt = document.getElementById("btc-balance");
  btc_balance_txt.innerText = parseFloat(btc_balance_txt.innerText) - 1;
}

function showDisclaimer() {
  const disclaimer = document.getElementById("disclaimer");
  disclaimer.classList.remove("hide");
}

function hideDisclaimer() {
  const disclaimer = document.getElementById("disclaimer");
  disclaimer.classList.add("hide");
}

window.addEventListener("load", function() {
  const send_btc_btn = document.getElementById("send-btc-btn");
  send_btc_btn.addEventListener("click", sendBTC);

  const show_tos_btn = document.getElementById("show-disclaimer-btn");
  show_tos_btn.addEventListener("click", showDisclaimer);

  const disclaimer = document.getElementById("disclaimer");
  disclaimer.addEventListener("click", hideDisclaimer);

  populateTable();
});
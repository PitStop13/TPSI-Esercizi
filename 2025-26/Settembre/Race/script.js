const ROWS = 20;
const COLS = 30;

window.onload = function () {
  createGrid();
  bombe();
}

function createGrid() {
  let _wrapper = document.getElementById("wrapper");
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.id = `btn-${i}-${j}`;
      _wrapper.appendChild(btn);
    }
  }
}

document.getElementById("btnStart").addEventListener("click", () => {
  startRace();
  startRun();
  const btn = document.getElementById("btnStart");
  btn.disabled = true;
});

function bombe() {
  let bombe = new Set();
  while (bombe.size < 25) {
    let r = Math.floor(Math.random() * ROWS);      // riga casuale 0-19
    let c = Math.floor(Math.random() * (COLS - 1)) + 1; // colonna casuale 1-29 (esclude colonna 0)

    let key = `${r}-${c}`;
    if (!bombe.has(key)) {
      bombe.add(key);
      let cell = document.getElementById(`btn-${r}-${c}`);
      cell.style.backgroundColor = "red";
    }
  }
}

let giocatore1riga, giocatore2riga;
function startRace() {
  giocatore1riga = Math.floor(Math.random() * 15);

  //sec riga con alm 4 di distanza
  do {
    giocatore2riga = Math.floor(Math.random() * 15);
  } while (
    (giocatore2riga - giocatore1riga > -4) &&
    (giocatore2riga - giocatore1riga < 4)
    );

  document.getElementById(`btn-${giocatore1riga}-0`).style.backgroundColor = "blue";
  document.getElementById(`btn-${giocatore2riga}-0`).style.backgroundColor = "green";

}

let pos1 = 0, pos2 = 0;
function startRun() {
  //li faccio muovere
  const interval = setInterval(() => {
    //gioc 1
    if (Math.random() < 0.7) { // 70% probabilità di avanzare
      let nextCol = pos1 + 1;

      if (nextCol < COLS) {
        let nextCell = document.getElementById(`btn-${giocatore1riga}-${nextCol}`);

        if (nextCell.style.backgroundColor === "red") {
          giocatore1riga++;
          let newCell = document.getElementById(`btn-${giocatore1riga}-${pos1}`);
          if (newCell) {
            newCell.style.backgroundColor = "blue";
          }
        } else {
          nextCell.style.backgroundColor = "blue";
          pos1 = nextCol;
        }
      }
    }

    //gioc 2
    if (Math.random() < 0.7) {
      let nextCol = pos2 + 1;

      if (nextCol < COLS) {
        let nextCell = document.getElementById(`btn-${giocatore2riga}-${nextCol}`);

        if (nextCell.style.backgroundColor === "red") {
          giocatore2riga++;
          let newCell = document.getElementById(`btn-${giocatore2riga}-${pos2}`);
          if (newCell) {
            newCell.style.backgroundColor = "green";
          }
        } else {
          nextCell.style.backgroundColor = "green";
          pos2 = nextCol;
        }
      }
    }

    if (pos1 === COLS - 1 || pos2 === COLS - 1) {
      clearInterval(interval);
      alert(pos1 === COLS - 1 ? "Giocatore 1 ha vinto!" : "Giocatore 2 ha vinto!");
    }

  }, 150);


}
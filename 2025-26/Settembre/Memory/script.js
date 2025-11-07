const board = document.getElementById("game-board");
const BOARD_SIZE = 36; // 6x6
const COPPIE = 18;
const LOCK_TIME = 500;

let values = [];
let firstIndex = null;
let lock = false;
let matched = new Set();
let btnMatrix = []; 

function Mischia(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function init() {
  values = [];
  for (let i = 1; i <= COPPIE; i++) {
    values.push(i, i);
  }
  Mischia(values);

  firstIndex = null;
  lock = false;
  matched = new Set();

  // reset griglia
  board.innerHTML = "";
  btnMatrix = [];

  for (let r = 0; r < 6; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    let rowBtns = [];
    for (let c = 0; c < 6; c++) {
      const idx = r * 6 + c;
      const btn = document.createElement("button");
      btn.className = "card";
      btn.dataset.index = idx;
      btn.textContent = values[idx];
      btn.style.width = "60px";
      btn.style.height = "60px";
      btn.style.marginRight = c < 5 ? "8px" : "0";
      btn.style.marginBottom = r < 5 ? "8px" : "0";
      btn.addEventListener("click", onClick);
      rowDiv.appendChild(btn);
      rowBtns.push(btn);
    }
    board.appendChild(rowDiv);
    btnMatrix.push(rowBtns);
  }
}

function getBtn(idx) {
  const r = Math.floor(idx / 6);
  const c = idx % 6;
  return btnMatrix[r][c];
}

function onClick() {
  if (lock) return;

  const btn = this;
  const idx = Number(btn.dataset.index);

  if (matched.has(idx)) return;
  if (firstIndex === idx) return;

  scopri(idx);

  if (firstIndex === null) {
    firstIndex = idx;
    return;
  }

  lock = true;
  bloccaClick();

  const secondIndex = idx;
  setTimeout(() => {
    controllore(firstIndex, secondIndex);
  }, LOCK_TIME);
}

function scopri(idx) {
  const btn = getBtn(idx);
  btn.classList.add("revealed");
}

function copri(idx) {
  const btn = getBtn(idx);
  btn.classList.remove("revealed");
}

function uguali(idx) {
  const btn = getBtn(idx);
  btn.classList.remove("revealed");
  btn.classList.add("matched");
  btn.disabled = true;
}

function controllore(a, b) {
  if (values[a] === values[b]) {
    uguali(a);
    uguali(b);
    matched.add(a);
    matched.add(b);
  } else {
    copri(a);
    copri(b);
  }
  abilitaNonUguali();

  firstIndex = null;
  lock = false;

  if(matched.size=== BOARD_SIZE){
    alert("Hai vinto!! :)")
  }
}

function bloccaClick() {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      btnMatrix[r][c].disabled = true;
    }
  }
}

function abilitaNonUguali() {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const idx = r * 6 + c;
      if (!matched.has(idx)) btnMatrix[r][c].disabled = false;
    }
  }
}

init();

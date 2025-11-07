"use strict"

const RIGHE = 6;
const COLONNE = 7;

const GRIGIO = "gray";
const GIALLO = "yellow";
const ROSSO = "red";

window.onload = function () {
    caricaWrapper();
    const nextPlayer = document.getElementById("nextPlayer");
    nextPlayer.classList.add("pedina");
    nextPlayer.style.backgroundColor = GIALLO;
};

function caricaWrapper() {
    const wrapper = document.querySelector("#wrapper");
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            const div = document.createElement("div");
            div.classList.add("pedina");
            div.id = `div-${i}-${j}`;
            wrapper.appendChild(div);

            if (i == 5) {
                div.addEventListener("click", pedinaClick);
            }
        }
    }
}

function pedinaClick() {
    const turno = recuperaTurno();
    
    if (turno == "G") {
        this.style.backgroundColor = GIALLO;
    } else {
        this.style.backgroundColor = ROSSO;
    }
    this.removeEventListener("click", pedinaClick);

    // Aggiorno e rendo cliccabile la cella superiore
    const rSup = parseInt(this.id.split("-")[1]) - 1;
    const cSup = parseInt(this.id.split("-")[2]);
    if (rSup >= 0) {
        const cellaSup = document.getElementById(`div-${rSup}-${cSup}`);
        cellaSup.addEventListener("click", pedinaClick);
    }

    // Aggiorno il colore della pedina in basso in base al turno
    const nextPlayer = document.getElementById("nextPlayer");
    if (turno == "G") {
        nextPlayer.style.backgroundColor = ROSSO;
    } else {
        nextPlayer.style.backgroundColor = GIALLO;
    }

    const vittoria = controllaVittoria(this);

    if (vittoria) {
        const colore = turno == "G" ? "GIALLO" : "ROSSO";
        setTimeout(function() {
            alert(`Il giocatore ${colore} ha vinto!`);
        }, 100);
        disabilitaPedine();
    }
}

function disabilitaPedine() {
    const pedine = document.querySelectorAll(".pedina");
    for (const pedina of pedine) {
        pedina.removeEventListener("click", pedinaClick);
    }
}

function controllaVittoria(pedinaC) {
    // Check verticale
    let cont = 1;
    let stopSu = false, stopGiu = false;
    let i = 1;

    do {
        const c = parseInt(pedinaC.id.split("-")[2]);

        // Verso l'alto
        if (!stopSu) {
            const rSu = parseInt(pedinaC.id.split("-")[1]) - i;
            if (rSu >= 0) {
                const cellaAlto = document.getElementById(`div-${rSu}-${c}`);
                if (cellaAlto.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopSu = true;
                }
            } else {
                stopSu = true;
            }
        }

        // Verso il basso
        if (!stopGiu) {
            const rGiu = parseInt(pedinaC.id.split("-")[1]) + i;
            if (rGiu < RIGHE) {
                const cellaBasso = document.getElementById(`div-${rGiu}-${c}`);
                if (cellaBasso.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopGiu = true;
                }
            } else {
                stopGiu = true;
            }
        }

        i++;
    } while ((!stopSu || !stopGiu) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    // Check orizzontale
    cont = 1;
    let stopSx = false, stopDx = false;
    i = 1;

    do {
        const r = parseInt(pedinaC.id.split("-")[1]);

        // Verso sinistra
        if (!stopSx) {
            const csX = parseInt(pedinaC.id.split("-")[2]) - i;
            if (csX >= 0) {
                const cellaSx = document.getElementById(`div-${r}-${csX}`);
                if (cellaSx.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopSx = true;
                }
            } else {
                stopSx = true;
            }
        }

        // Verso destra
        if (!stopDx) {
            const cdX = parseInt(pedinaC.id.split("-")[2]) + i;
            if (cdX < COLONNE) {
                const cellaDx = document.getElementById(`div-${r}-${cdX}`);
                if (cellaDx.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopDx = true;
                }
            } else {
                stopDx = true;
            }
        }

        i++;
    } while ((!stopSx || !stopDx) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    // Check diagonale \ (alto-sx → basso-dx)
    cont = 1;
    let stopSxAlto = false, stopDxBasso = false;
    i = 1;

    do {
        // Verso alto-sinistra
        if (!stopSxAlto) {
            const rSxAlto = parseInt(pedinaC.id.split("-")[1]) - i;
            const cSxAlto = parseInt(pedinaC.id.split("-")[2]) - i;
            if (rSxAlto >= 0 && cSxAlto >= 0) {
                const cellaSxAlto = document.getElementById(`div-${rSxAlto}-${cSxAlto}`);
                if (cellaSxAlto.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopSxAlto = true;
                }
            } else {
                stopSxAlto = true;
            }
        }

        // Verso basso-destra
        if (!stopDxBasso) {
            const rDxBasso = parseInt(pedinaC.id.split("-")[1]) + i;
            const cDxBasso = parseInt(pedinaC.id.split("-")[2]) + i;
            if (rDxBasso < RIGHE && cDxBasso < COLONNE) {
                const cellaDxBasso = document.getElementById(`div-${rDxBasso}-${cDxBasso}`);
                if (cellaDxBasso.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopDxBasso = true;
                }
            } else {
                stopDxBasso = true;
            }
        }

        i++;
    } while ((!stopSxAlto || !stopDxBasso) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    // Check diagonale / (basso-sx → alto-dx)
    cont = 1;
    let stopSxBasso = false, stopDxAlto = false;
    i = 1;

    do {
        // Verso basso-sinistra
        if (!stopSxBasso) {
            const rSxBasso = parseInt(pedinaC.id.split("-")[1]) + i;
            const cSxBasso = parseInt(pedinaC.id.split("-")[2]) - i;
            if (rSxBasso < RIGHE && cSxBasso >= 0) {
                const cellaSxBasso = document.getElementById(`div-${rSxBasso}-${cSxBasso}`);
                if (cellaSxBasso.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopSxBasso = true;
                }
            } else {
                stopSxBasso = true;
            }
        }

        // Verso alto-destra
        if (!stopDxAlto) {
            const rDxAlto = parseInt(pedinaC.id.split("-")[1]) - i;
            const cDxAlto = parseInt(pedinaC.id.split("-")[2]) + i;
            if (rDxAlto >= 0 && cDxAlto < COLONNE) {
                const cellaDxAlto = document.getElementById(`div-${rDxAlto}-${cDxAlto}`);
                if (cellaDxAlto.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopDxAlto = true;
                }
            } else {
                stopDxAlto = true;
            }
        }

        i++;
    } while ((!stopSxBasso || !stopDxAlto) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    return false;
}

function recuperaTurno() {
    const nextPlayer = document.getElementById("nextPlayer");
    if (nextPlayer.style.backgroundColor == GIALLO || nextPlayer.style.backgroundColor == "yellow") {
        return "G";
    } else {
        return "R";
    }
}

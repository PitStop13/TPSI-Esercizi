const DIM = 10;
let livello = -1;
let timerID;

window.onload= function(){
    let _wrapper = document.getElementById("wrapper");
    timerID = setInterval(reset, 500);
    for (let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++){
            const div = document.createElement("div");


            div.classList.add("cella");
            div.id = `div-${i}-${j}`;


            _wrapper.appendChild(div);
        }
    }

    const stop = document.getElementById("stop").addEventListener("click",BtnStopClick);
    
}  

function BtnStopClick(){
    clearInterval(timerID);
}


function reset(){
    if(livello != -1)
    {
        for (let i = livello; i < DIM-livello; i++) {
            //riga sopra
            const upperDiv = document.getElementById(`div-${livello}-${i}`);
            upperDiv.style.backgroundColor = "#CCC";


            //riga sotto
            const lowerDiv = document.getElementById(`div-${DIM-1-livello}-${i}`);
            lowerDiv.style.backgroundColor = "#CCC";
        }
        for (let i = livello+1; i < DIM-livello-1; i++) {
            //riga rx
            const upperDiv = document.getElementById(`div-${i}-${livello}`);
            upperDiv.style.backgroundColor = "#CCC";


            //riga sotto
            const lowerDiv = document.getElementById(`div-${i}-${DIM-1-livello}`);
            lowerDiv.style.backgroundColor = "#CCC";
        }
    }


    livello++;
    if(livello == 5)
    {
        livello = 0;
    }


    for (let i = livello; i < DIM-livello; i++) {
        //riga sopra
        const upperDiv = document.getElementById(`div-${livello}-${i}`);
        upperDiv.style.backgroundColor = "#F00";


        //riga sotto
        const lowerDiv = document.getElementById(`div-${DIM-1-livello}-${i}`);
        lowerDiv.style.backgroundColor = "#F00";
    }
    for (let i = livello+1; i < DIM-livello-1; i++) {
        //riga rx
        const upperDiv = document.getElementById(`div-${i}-${livello}`);
        upperDiv.style.backgroundColor = "#F00";


        //riga sotto
        const lowerDiv = document.getElementById(`div-${i}-${DIM-1-livello}`);
        lowerDiv.style.backgroundColor = "#F00";
    }


}


function generaNumero(min, max){
    let rnd = Math.floor((max - min) * Math.random()) + min;  
    return rnd;
}


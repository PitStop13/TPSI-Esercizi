const  DIM = 10;

window.addEventListener("load", function(){
    const wrapper = document.getElementById("wrapper");
    for(let i = 0; i < DIM; i++){
        for(let j = 0; j < DIM; j++){
            const button = document.createElement("button");

            button.classList.add("btnStyle");
            button.addEventListener("click", btnClick);
            button.id = `btn${i}-${j}`;

            wrapper.appendChild(button);
        }
    }
});

function btnClick(){
    const split = this.id.split("-");

    const iR = split[0].substring(3);
    const iC = split[1];

    this.textContent = `${iR}-${iC}`;
    this.style.backgroundColor = "red";
    this.disabled = true;
}
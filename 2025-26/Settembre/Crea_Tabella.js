let DIM = 10;

let random;

window.onload = function () {
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");

    body.appendChild(table);

    for (let i = 0; i < DIM; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < DIM; j++) {
            let td = document.createElement("td");
            td.style.padding = "2px";
            tr.appendChild(td);
            let btn = document.createElement("button");
            td.appendChild(btn);
            btn.id = i + "," + j;
            btn.style.width = "30px";
            btn.style.height = "30px";
            btn.addEventListener("click", changeColor);
        }
    }
    
    
}
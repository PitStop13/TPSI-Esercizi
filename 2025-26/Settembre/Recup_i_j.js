function btnClick() {
    let id = this.id; // "btn-5-3"
    let parti = id.split("-"); // ["btn", "5", "3"]
    let i = parseInt(parti[1]); // 5
    let j = parseInt(parti[2]); // 3
    
    alert("Hai cliccato riga " + i + " colonna " + j);
}

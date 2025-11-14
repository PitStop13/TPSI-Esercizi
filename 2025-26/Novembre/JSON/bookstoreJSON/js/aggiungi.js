let jsonDoc;

window.onload = function () {
    
    let json = localStorage.getItem("jsonLibri");
    if (json != null) {
        jsonDoc = JSON.parse(json); //trasformo stringa in oggetto
    } else {
        jsonDoc = [];
    };
}

function salva(){
    let libro = {};
    libro ["category"]=document.getElementById("txtCategoria").value;
    libro ["title"]=document.getElementById("txtTitolo").value;
    libro ["lang"]=document.getElementById("txtLingua").value;
    libro ["author"]=document.getElementById("txtAutore").value;
    libro ["year"]=document.getElementById("txtAnno").value;
    //libro ["price"]=document.getElementById("txtPrezzo").value;
    libro.price = document.getElementById("txtPrezzo").value;

    //aggiungo al vettore il valore del json
    jsonDoc[jsonDoc.length]=libro;

    let json = JSON.stringify(jsonDoc);
    localStorage.setItem("jsonLibri",json);
    ritorna();
}

function ritorna(){
    window.location.href = "index.html";
}
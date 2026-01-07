"use strict";

window.onload = function () {
    let richiesta = new XMLHttpRequest();

    let url = "https://randomuser.me/api?results=5";
    //1) metodo 2)risorsa(url) 3)async (true o false,noi usiamo SEMPRE true)
    richiesta.open("GET", url, true);
    richiesta.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    richiesta.onreadystatechange = ottieniDati;//----->call back
    richiesta.send(null);

    function ottieniDati() {
        if (richiesta.readyState == 4 && richiesta.status == 200) //200 è un codice di stato che indica che la richiesta è andata a buon fine
        //4 è un codice di stato che indica che la richiesta è stata completata
        {
            console.log(richiesta.responseText);
        }
    }
}

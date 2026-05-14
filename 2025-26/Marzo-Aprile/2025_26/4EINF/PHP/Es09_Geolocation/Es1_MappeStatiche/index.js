"use strict"
const keyX = "AIzaSyD3sbpfCzqO7Ezn2lvNszqrzi3rxlomvn8";
const url = "https://maps.googleapis.com/maps/api/staticmap?";
const tipoMappa = ["roadmap", "satellite", "hybrid", "terrain", "streetview"];
const params = {
    "center": "via+san+michele+68,+fossano",
    "zoom": 17,
    "size": "800x600",
    "key": keyX,
    "markers": "color:red|size:big|label:V|via+san+michele+68,+fossano"
}

window.onload = function () {
    let _wrapper = document.getElementById("pulsanti");
    let _img = document.getElementById("imgBox");

    for (let i = 0; i < tipoMappa.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = tipoMappa[i];
        btn.addEventListener("click", visualizzaMappa);
        _wrapper.appendChild(btn);
    }

    document.getElementsByTagName("button")[0].style.backgroundColor = "rgb(255,255,0)";
    let path = url + addParams() + "maptype=" + tipoMappa[0];
    console.log(path);
    _img.src = path;
}

function addParams() {
    let queryString = "";
    for (let key in params) {
        queryString += key + "=" + params[key] + "&";
    }
    return (queryString);
}

function visualizzaMappa() {
    //Al click sui tasti delle frecce sulla tastiera mi sposto lo street view a destra, sinistra, su o giù di 10 pixel
    
    let _img = document.getElementById("imgBox");
    let path;
    if (this.textContent != "streetview") {
        path = url + addParams() + "maptype=" + this.textContent;
        _img.src = path;
    }
    else
    {
        path=url+addParams();
        path=path.replace("staticmap","streetview");
        path=path.replace("center","location");
        path=path+"heading=-35&pitch=7&fov=40"
        _img.src = path;
    }
    let btns=document.getElementsByTagName("button");
    for (let i = 0; i < btns.length; i++) {
       btns[i].style.backgroundColor="";
       this.style.backgroundColor="rgb(255,255,0)";
    }
}














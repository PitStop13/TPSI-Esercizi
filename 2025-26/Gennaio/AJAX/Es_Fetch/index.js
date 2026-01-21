"use strict"

window.onload = function () {
    fetch("https://randomuser.me/api?results=3")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return (console.log(json));
        })
        .catch(function (error) {
            console.log(error);
        });

    //Oppure posso scriverlo in modo più conciso:
    // fetch("https://randomuser.me/api?results=3")
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    //     .catch(error => console.log(error))
}
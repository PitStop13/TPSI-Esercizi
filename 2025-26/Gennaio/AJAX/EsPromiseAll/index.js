"use strict";

window.onload = function () {
    function inviaRichiesta(val) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(val);
            }, Math.random() * 2000);
        })
    }
    let values = [1, 0, 0, 1, 0, 2, 0, 0, 3, 0];
    let promises = [];

    for (let i = 0; i < values.length; i++) {
        let promise = inviaRichiesta(values[i]);
        promises.push(promise);
    }

    Promise.all(promises)
        .then(function (resultPromises) {
            let totale = 0;
            for (let i = 0; i < resultPromises.length; i++) {
                totale += parseInt(resultPromises[i]);
            }
            alert("il totale della somma delle mie promesse è : " + totale)
        })
        .catch(function (error) {
            console.log(error);
        })
}
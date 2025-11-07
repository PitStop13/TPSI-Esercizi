const url = "https://randomuser.me/api?results=10&gender=female";
window.onload = function(){
    //è una libreira js che serve a fare richieste http
    //verso server o api
    //gestisco la richiesta http utilizzando la get

    //con la get effettuo una "promessa",in informatica si chiama (PROMISE)
    //la PROMISE è un oggetto che rappresenta un risultato futuro
    //in questo caso una risposta da parte del server
    //quando una richiesta va a buon fine la PROMISE viene risolta e scatta il .then
    axios.get(url).then(function(response){
        //Viene eseguito solo se la richiesta ha successo
        //console.log(response);
        let users = response.data.results;
        console.log(users);//restituisce un JSON per prendere ni dati basta quindi andare a scomporlo e il gioco è fatto

        let list = document.getElementById("userList");
        for(let i = 0;i<users.length;i++){
            let img = document.createElement("img");
            img.src = `${users[i].picture.large}`
            let li = document.createElement("li");
            li.innerText=`${users[i].name.first} ${users[i].name.last} ${users[i].email}`;
            list.appendChild(img);
            list.appendChild(li);
        }
    }).catch(function(error){
        //Viene eseguito solo se la richiesta NON ha successo,per errore(no rete,url sbagliato, ecc..)
        console.log("Errore durante il recuper degli utenti: ",error);
    });


}
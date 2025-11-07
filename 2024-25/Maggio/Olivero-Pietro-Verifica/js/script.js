const songs = [
    // Id, Name, Author, Album, Duration(s), Streams
    [1, "m.A.A.d. city", "Kendrick Lamar", "good kid, m.A.A.d. city", 244, 12000000],
    [2, "Blinding Lights", "The Weeknd", "After Hours", 200, 1500000000],
    [3, "Torcida", "Bresh", "Torcida", 174, 5000000],
    [4, "Somebody (2024)", "Gotye & Fisher & Kimbra", "Somebody (2024)", 154, 7000000000],
    [5, "2minuti", "Calcutta", "RELAX", 214, 34000000],
    [6, "Anime Libere", "Tedua & Rkomi & Bresh", "La divina commedia", 173, 28000000],
    [7, "Black Dogs' Old Blues", "I Belli da Vedere", "Cambiare Vita", 164, "Veramente troppe"],
    [8, "Aglio e olio", "Fulminacci & Willie Peyote", "Tante care cose e altri successi", 226, 5000000],
    [9, "Intro", "The xx", "xx", 128, 640000000],
    [10, "LA CANZONE NOSTRA", "MACE & Blanco & Salmo", "OBE", 237, 130000000]
];

window.addEventListener("load", function() {
    const spanSongs = document.getElementById("span-song-number");
    spanSongs.innerText = songs.length
    CaricaCanzoni();
});

function CaricaCanzoni(){
    let div = document.getElementById("songs");
    for(let i = 0; i < songs.length; i++)
    {
        let row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("m-4");

        let immagineCover = document.createElement("div")
        immagineCover.classList.add("container")
        immagineCover.classList.add("col-md-3");
        

        let img = document.createElement("img");
        img.src = `img/cover${i+1}.jpg`;
        img.classList.add("col-12")

        let Dati = document.createElement("div");
        Dati.classList.add("col-md-9");
        
        let titolo_scritta = document.createElement("h1");
        titolo_scritta.innerText = `${songs[i][1]} - ${songs[i][2]}`;
        Dati.appendChild(titolo_scritta);

        let Artista = document.createElement("div");
        Artista.innerText = `Artista: ${songs[i][2]}`;
        Dati.appendChild(Artista);

        let album = document.createElement("div");
        album.innerText = `Album: ${songs[i][3]}`;
        Dati.appendChild(album);

        let Minuti = parseInt((songs[i][4] / 60));
        let Secondi = parseInt(songs[i][4] % 60);
        let canzone_durata = document.createElement("div");
        canzone_durata.innerText = `Durata: ${Minuti} m ${Secondi}s`;
        Dati.appendChild(canzone_durata);
            
        let streams = document.createElement("div");
        streams.innerText = `Streams: ${songs[i][5]}`;
        Dati.appendChild(streams);

        let btn = document.createElement("div");
        btn.classList.add("btn");
        btn.classList.add("btn-secondary");
        btn.innerText = "Play";
        btn.id = `btn-${i}`;
        btn.addEventListener("click", btnClick);
        Dati.appendChild(btn);

        immagineCover.appendChild(img);
        row.appendChild(immagineCover);
        row.appendChild(Dati);
        div.appendChild(row);
    }
}

function btnClick(){
    const modale = new bootstrap.Modal("#modale");
    const canzone = document.getElementById("song");
    canzone.innerText = songs[parseInt(this.id.split('-')[1])][1];

    const artista = document.getElementById("artist");
    artista.innerText = songs[parseInt(this.id.split('-')[1])][2];
    modale.show();
}
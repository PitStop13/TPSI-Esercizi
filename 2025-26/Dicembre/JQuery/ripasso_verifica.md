# Ripasso Verifica jQuery (Prime 14 Pagine e Esercizi)

Questo documento raccoglie possibili domande teoriche/pratiche e snippet di codice utili per la verifica, basandosi sugli esercizi svolti (`Es_01` - `Es_07`).

---

## 📚 Parte 1: Domande e Risposte (Teoria e Metodi)

### **Introduzione e Sintassi Base**

**D: Cos'è jQuery e qual è il simbolo che lo contraddistingue?**
**R:** jQuery è una libreria JavaScript che semplifica la manipolazione del DOM, la gestione degli eventi e le animazioni. Il simbolo scorciatoia (alias) per l'oggetto jQuery è il dollaro **`$`**.

**D: A cosa serve `$(document).ready(function() { ... });`?**
**R:** Serve ad assicurarsi che tutto il codice jQuery venga eseguito solo **dopo** che il DOM (la struttura HTML della pagina) è stato completamente caricato. È fondamentale per evitare errori se si cerca di manipolare elementi non ancora esistenti.

**D: Qual è la differenza tra `window.onload` e `$(document).ready()`?**
**R:** `$(document).ready()` parte appena la struttura HTML è pronta (molto veloce). `window.onload` attende che *tutto* sia caricato, incluse immagini pesanti e stili esterni.

---

### **Selettori (Selectors)**

**D: Come si selezionano elementi per ID, Classe e Tag?**
**R:**
- **ID:** `$("#mioId")` (seleziona un solo elemento).
- **Classe:** `$(".miaClasse")` (seleziona una collezione di elementi).
- **Tag:** `$("div")` (seleziona tutti i div).

**D: Come seleziono elementi in base agli attributi?**
**R:** Usando le parentesi quadre. Esempio: `$("input[type=text]")` seleziona tutti gli input di tipo testo.

**D: Come seleziono l'n-esimo elemento di una collezione?**
**R:** Usando il metodo **`.eq(indice)`**. Ricorda che l'indice parte da 0.
Esempio: `$("li").eq(2)` seleziona il terzo elemento `<li>`.

---

### **Manipolazione del DOM e CSS**

**D: Quali metodi si usano per leggere o modificare il contenuto?**
**R:**
- **`.text()`**: Legge o scrive solo il testo (ignora i tag HTML).
- **`.html()`**: Legge o scrive il contenuto compreso l'HTML.
- **`.val()`**: Fondamentale per i **Form**. Legge o scrive il valore di input, select, textarea.

**D: Come si modificano gli stili CSS?**
**R:** Con il metodo **`.css()`**.
- Una proprietà: `.css("color", "red")`
- Più proprietà (oggetto):
  ```javascript
  $(".box").css({
      "color": "red",
      "background-color": "#ccc",
      "font-size": "14pt"
  });
  ```

**D: Come si aggiungono o rimuovono classi CSS?**
**R:**
- **`.addClass("nomeClasse")`**
- **`.removeClass("nomeClasse")`**
- **`.toggleClass("nomeClasse")`** (aggiunge se non c'è, toglie se c'è).

---

### **Eventi ed Effetti**

**D: Come si gestisce il click su un elemento?**
**R:**
```javascript
$("#bottone").on("click", function() {
    // codice
});
// Oppure la scorciatoia:
$("#bottone").click(function() { ... });
```

**D: Come si realizzano animazioni di comparsa/scomparsa?**
**R:**
- **.hide() / .show()**: Nasconde/Mostra istantaneamente (o con ritardo se specificato).
- **.fadeIn() / .fadeOut()**: Dissolvenza.
- **.slideDown() / .slideUp()**: Comparsa/Scomparsa a tendina.
*Nota*: Questi metodi accettano spesso una durata (es. 1000ms) e una **callback** da eseguire alla fine.

---

### **Attraversamento e Iterazione**

**D: Come scansionare una collezione di elementi (es. tutti gli `<li>`)?**
**R:** Usando il metodo **`.each()`**.
```javascript
$("li").each(function(index, element) {
    console.log($(element).text()); // element è l'oggetto JS nativo, $(element) lo trasforma in jQuery
});
```

**D: Come filtro gli elementi figli?**
**R:**
- **`.children()`**: Prende solo i figli diretti.
- **`.find("selettore")`**: Cerca in tutta la discendenza (figli, nipoti...).
- **`.filter("selettore")`**: Filtra la collezione corrente (es. `filter(":checked")`).

---

## 💻 Parte 2: Snippet di Codice per Esercizi

Ecco esempi di codice simili a quelli che potresti dover scrivere nella verifica.

### **1. Accendi/Spegni Lampadina (Logica Base + CSS)**
*Riferimento: 01 Es_Lampadina*

**Richiesta:** Al click su "Accendi", cambia l'immagine e mostra un bordo giallo. Al click su "Spegni", ripristina.

```javascript
/* HTML presunto:
   <img id="lamp" src="spenta.png">
   <button id="btnOn">Accendi</button>
   <button id="btnOff">Spegni</button>
*/

$(document).ready(function() {
    let lamp = $("#lamp");

    $("#btnOn").click(function() {
        lamp.prop("src", "accesa.png"); // Cambio attributo src
        lamp.addClass("accesa");        // Aggiungo classe per ombra/bordo
        // Oppure .css("border", "2px solid yellow");
    });

    $("#btnOff").click(function() {
        lamp.prop("src", "spenta.png");
        lamp.removeClass("accesa");
    });
});
```

### **2. Visualizzatore Immagini (Galleria)**
*Riferimento: 04 Es_Visualizzatore_Immagini*

**Richiesta:** Pulsanti "Avanti" e "Indietro" per scorrere immagini `img1.jpg`, `img2.jpg`... con effetto dissolvenza.

```javascript
$(document).ready(function() {
    let n = 1; // Contatore immagine corrente
    let maxImg = 5;

    // Disabilita inizialmente indietro se siamo alla 1
    $("#btnIndietro").prop("disabled", true);

    $("#btnAvanti").click(function() {
        n++;
        aggiornaImmagine();
        if(n == maxImg) $(this).prop("disabled", true);
        $("#btnIndietro").prop("disabled", false);
    });

    $("#btnIndietro").click(function() {
        n--;
        aggiornaImmagine();
        if(n == 1) $(this).prop("disabled", true);
        $("#btnAvanti").prop("disabled", false);
    });

    function aggiornaImmagine() {
        // FadeOut prima di cambiare, poi cambio src, poi FadeIn
        $("#img").fadeOut(400, function() {
            $(this).prop("src", "img/img" + n + ".jpg");
            $(this).fadeIn(400);
        });
    }
});
```

### **3. Gestione Form e Controlli**
*Riferimento: 06 ES_Form_e_Controlli*

**Richiesta:** Leggere quali Checkbox sono state selezionate e scrivere il risultato in un div.

```javascript
/* HTML presunto:
   <input type="checkbox" value="Sport"> Sport
   <input type="checkbox" value="Musica"> Musica
   <button id="btnInvia">Invia</button>
   <div id="risultato"></div>
*/

$("#btnInvia").click(function() {
    let scelte = "";
    
    // Seleziono solo le checkbox 'checked'
    // Uso input[type=checkbox] oppure :checkbox
    $("input[type=checkbox]:checked").each(function(i, elem) {
        scelte += $(elem).val() + " "; 
    });

    if(scelte === "") {
        $("#risultato").text("Nessuna selezione");
    } else {
        $("#risultato").text("Hai scelto: " + scelte);
    }
});
```

### **4. Scansione e Filtri (Pari/Dispari)**
*Riferimento: 05 ES_Scasione_Elementi*

**Richiesta:** Colorare di rosso tutti gli elementi di una lista in posizione pari.

```javascript
$("#btnColora").click(function() {
    // Nota: nth-child parte da 1 in CSS/selector
    // nth-child(even) = pari, nth-child(odd) = dispari
    
    $("#lista li").css("color", "black"); // Resetta prima
    
    // Filtro e applico CSS
    $("#lista li").filter(":nth-child(even)").css("color", "red");
    
    // Alternativa con slice (0-based)
    // $("#lista li").slice(1, 4).css("color", "blue");
});
```

### **5. Hover e Slide (Menu a tendina)**
*Riferimento: 01 Es_Lampadina (parte finale)*

**Richiesta:** Al passaggio del mouse su un titolo, mostrare una descrizione con effetto slide.

```javascript
/* Gestione hover con mouseover e mouseout */
$("#titolo").on("mouseover", function() {
    $("#descrizione").slideDown(500);
});

$("#titolo").on("mouseout", function() {
    $("#descrizione").slideUp(500);
});
```

### Consigli per la verifica:
1.  **Attenzione alle parentesi**: jQuery è pieno di `});` alla fine dei blocchi. Controllale sempre.
2.  **`$(this)`**: Quando sei dentro un evento (es. click) o un ciclo (`each`), usa `$(this)`per riferirti all'elemento corrente.
3.  **Virgolette**: Ricorda le virgolette per i selettori (`"#id"`) e per le proprietà CSS (`"color"`).
4.  **Prop vs Attr**: Per proprietà booleane come `checked`, `disabled`, `selected` usa **`.prop()`** (es. `.prop("checked", true)`), non `.attr()`.

window.addEventListener("load", function () {
    loadCatalog();
});


//funzione che carica il catalogo dei prodotti 
function loadCatalog() {
    const catalogContainer = document.getElementById("catalog-container");

    //scorro tutto il prodotto per i cataloghi
    for (let i = 0; i < product_ids.length; i++) {
        /*
        <div class="card">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card Title</div>
                <p class="card-text">...</p>
                <a href="#" class="btn btn-primary">...</a>
            </div>
        </div>
        */

        const catalogElement = document.createElement("div");
        catalogElement.classList.add("col-md-4", "p-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top");
        cardImg.src = `img/store-products/${product_images[i][0]}`;
        cardImg.alt = `${product_names[i]} (foto)`;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.textContent = product_names[i];

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = `${product_prices[i]} €`;

        const cardBtn = document.createElement("a");
        cardBtn.classList.add("btn", "btn-primary");
        cardBtn.textContent = "Vedi";
        cardBtn.href = `product.html?id=${product_ids[i]}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardBtn);

        card.appendChild(cardImg);
        card.appendChild(cardBody);

        catalogElement.appendChild(card);
        catalogContainer.appendChild(catalogElement);
    }
}
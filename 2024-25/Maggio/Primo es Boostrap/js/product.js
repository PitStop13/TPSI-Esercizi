window.addEventListener("load", function () {
    const queryString = new URLSearchParams(window.location.search);

    if (!queryString.has("id")) {
        alert("Id non fornito");
        this.open("index.html", "_self");
        return;
    }

    const productId = queryString.get("id");

    const productPos = FindProductById(productId);
    if (productPos == -1) {
        alert("Prodotto con id " + productId + " non fornito");
        this.open("index.html", "_self");
        return;
    }

    LoadProduct(productPos);

    const buyButton = document.getElementById("buy-button");
    buyButton.addEventListener("click", BuyButtonClick);
});

function FindProductById(id) {
    let i = 0;
    let trovato = false;

    do {
        if (product_ids[i] == id) {
            trovato = true;
        }
        else {
            i++;
        }
    } while (!trovato && i < product_ids.length);

    if (!trovato) {
        return -1;
    }
    else {
        return i;
    }
}

function LoadProduct(pos) {
    const productName = product_names[pos];
    const productImages = product_images[pos];
    const productPrice = product_prices[pos];

    document.getElementById("product-img").src =
        `img/store-products/${productImages[0]}`;

    document.getElementById("product-price").textContent =
        `${productPrice} €`;

    document.getElementById("product-name").textContent = productName;
}

function BuyButtonClick() {
    const productName = document.getElementById("product-name");
    document.getElementById("modal-product-name").textContent = productName.textContent;

    const myModal = new bootstrap.Modal("#buy-modal");
    myModal.show();
}
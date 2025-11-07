window.addEventListener("load", function() {
    const lstSiti = document.getElementById("lstSiti");
    lstSiti.selectedIndex = -1;//non seleziona neussun elemento
    lstSiti.addEventListener("change", changeLstSiti);
});

function changeLstSiti(){
    const link = this.value;//Link
    open(link);
}
"use strict"
function converti() {
    let xml = dati;
    localStorage.setItem("book.xml", xml);

    let divXml = document.getElementById("xml");
    divXml.innerText = xml;
    let divJson = document.getElementById("json");

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");

    let root = xmlDoc.documentElement;

    let vetJson = [];

    for (let i = 0; i < root.children.length; i++) {
        let book = root.children[i];
        let obj = {};
        if (book.hasAttribute("category")) {
            obj.category = book.getAttribute("category");
        }
        for (let j = 0; j < book.children.length; j++) {
            if (book.children[j].nodeName in obj) {

            }
            else {
                if (book.children[j].nodeName == "author") {
                    obj["author"] = [];
                    obj["author"].push(book.children[j].textContent);
                }
                else {
                    obj[book.children[j].nodeName] = book.children[j].textContent;
                }
            }
        }
    }
}
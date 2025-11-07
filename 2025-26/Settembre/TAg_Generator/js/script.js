window.addEventListener("load", function() {
  const btnCreate = document.getElementById("btn-create");
  btnCreate.addEventListener("click", createTags);

  const btnClear = document.getElementById("btn-clear");
  btnClear.addEventListener("click", clearDynamicArea);
});

function createTags() {
  const lstTag = document.getElementById("lst-tag");
  const tag = lstTag.value;

  const txtNumberTags = document.getElementById("txt-number-tags");
  const nTags = parseInt(txtNumberTags.value.trim());

  const txtContent = document.getElementById("txt-content");
  const content = txtContent.value.trim();

  if(isNaN(nTags)) {
    alert("Numero di tag inserito non valido");
    return;
  }
  if(nTags <= 0) {
    alert("Numero di tag inserito <= 0");
    return;
  }

  const dynamicArea = document.getElementById("dynamic-area");
  
  for(let i=1; i<= nTags;i++) {
    const newTag = document.createElement(tag);
    newTag.innerText = `${content} - ${i}`;

    if(tag == "a") {
      newTag.href = "#";
    }
    
    dynamicArea.appendChild(newTag);
  }
}

function clearDynamicArea() {
  const dynamicArea = document.getElementById("dynamic-area");
  dynamicArea.innerHTML = "";
}
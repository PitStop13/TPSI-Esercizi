window.addEventListener("load", function(){
    document.getElementById("btn-add-to").addEventListener("click", clickBtnAddTo);
    document.getElementById("btn-reset-todo-list").addEventListener("click", clickBtnResetTodoList);
});

function clickBtnAddTo(){
    //recupero riferimenti textbox e list ul
    const newTodo = document.getElementById("new-todo");
    const todoList = document.getElementById("todo-list");

    //creo un nuovo list item
    const li = document.createElement("li");

    //preparo li prima di appenderlo
    li.textContent = newTodo.value.trim();

    //appendo li alla lista
    todoList.appendChild(li);

    //pulisco textbox
    newTodo.value = "";
}

function clickBtnResetTodoList(){
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
}
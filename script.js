const classNames = {
    TODO_ITEM: "todo-container",
    TODO_CHECKBOX: "todo-checkbox",
    TODO_TEXT: "todo-text",
    TODO_DELETE: "todo-delete",
}

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");
let todoList = [];

// add new todo
function newTodo() {
    let text = prompt("Enter new task to do", "Pass exam");
    // create new todo object
    const todo = {
        text, checked: false, id: Date.now(),
    };
    // add newly created todo object to array
    todoList.push(todo);
    renderTodo(todo);
}
    // toggle todo   checkbox
function toggleTodo(id) {
    // find item in array by id and change its checked property
    todoList = todoList.map((it) => {
        if (it.id !== id) return it
        return {...it, checked: !it.checked}
    });
    submitChanges();
}

// visualize changes
function renderTodo(it) {
    // create li element
    const li = document.createElement("li");
    li.setAttribute("id", `${it.id}`);
    li.setAttribute("class", `${classNames.TODO_ITEM}`)
    li.innerHTML = `<input class="${classNames.TODO_CHECKBOX}" onClick="toggleTodo(${it.id})" type="checkbox" ${it.checked ? "checked" : ""}>
                  <label class="${classNames.TODO_TEXT}"><span>${it.text}</span></label>
                  <button class="${classNames.TODO_DELETE}" onClick="deleteTodo(${it.id})">delete</button>`;
    // add created li to our page list
    list.appendChild(li);
    submitChanges();
}

// delete todo
function deleteTodo(id) {
    // find li element by key
    const li = document.getElementById(`${id}`);
    // delete node
    li?.remove();
    // update our todo list
    todoList = todoList.filter(it => it.id !== Number(id));
    submitChanges();
}

// update local storage
function updateStorage(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// update header counters
function updateNumbers(){
    itemCountSpan.textContent = todoList.length.toString();
    uncheckedCountSpan.textContent = todoList.filter((todoEl) => !todoEl.checked).length.toString();
}

// update local storage & counters together
function submitChanges() {
    updateStorage();
    updateNumbers();
}

// on page load get items from local storage if they exist
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoList');
    if (!ref) return;
    todoList = JSON.parse(ref);
    todoList.forEach(it => {
        renderTodo(it);
    });
});
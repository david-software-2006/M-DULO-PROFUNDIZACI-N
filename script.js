const input = document.querySelector('#input');
const button = document.querySelector('#btn');
const list = document.querySelector('#list');

button.addEventListener('click', addHomework);
list.addEventListener('click', adminHomework);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addHomework();
    }
});

function addHomework() {
    const texto = input.value.trim();
    if (texto === "") {
        alert("Debes escribir una tarea");
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto;

    const buttonD = document.createElement("button");
    buttonD.textContent = "X";
    buttonD.classList.add("delete-btn");

    li.appendChild(buttonD);
    list.appendChild(li);
    input.value = "";
}

function adminHomework(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    } else {
        e.target.classList.toggle('done');
    }
}

// pegando os elemento da pagina html
const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
let tasks = []; // [{title: 'Tarefa 1, done: false}, ...]

// Adicionado a nova tarefa no html
function renderTaskOnHTML(taskTitle, done = false) {
  const li = document.createElement("li");

  // criando input e set o tipo do input
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  input.addEventListener("change", (event) => {
    const liTotoggle = event.target.parentElement;
    const spanToToggle = liTotoggle.querySelector("span");
    const done = event.target.checked;

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("task", JSON.stringify(tasks));
  });

  input.checked = done;

  //criando um span para cada tarefa
  const span = document.createElement("span");
  span.textContent = taskTitle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";

  // criando o botao de remover tarefa

  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;
    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((tarefa) => tarefa.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);
    localStorage.setItem("task", JSON.stringify(tasks));
  });

  // criando os elementos na pagina html de forma dinâmica
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  // colocando os itens criados dentro do html
  todoListUl.appendChild(li);
}

window.onload = () => {
  const taskOnLocalStorage = localStorage.getItem("task");
  if (!taskOnLocalStorage) return;
  tasks = JSON.parse(taskOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  // Evita o comportamento padrão de recarregar a pagina ao submeter o formulário
  event.preventDefault();

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caratere");
    return;
  }
  // adicionado a nova tarefa no array de task
  tasks.push({
    title: taskTitle,
    done: false,
  });

  localStorage.setItem("task", JSON.stringify(tasks));

  renderTaskOnHTML(taskTitle);
  taskTitleInput.value = "";
});

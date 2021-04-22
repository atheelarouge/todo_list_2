// Data

const todos = [{
  text: 'Order the cat food',
  completed: false,
  color: 'white',
}, {
  text: 'Clear Kitchen',
  completed: true,
  color: 'white'
}, {
  text: 'Buy food',
  completed: false,
  color: 'white'
}, {
  text: 'Do work',
  completed: true,
  color: 'white'
}, {
  text: 'Do exercies',
  completed: true,
  color: 'white'}
];

// UI Elements
const form = document.querySelector('.add_form');
const form_input = document.querySelector('.add_input');
const form_button = document.querySelector('.form_btn');
const list = document.querySelector('.list');
const err = document.querySelector('.error');

// Initialize Data
const IntData = () => {
  let div;

  todos.forEach(function(todo) {
    div = document.createElement('div');
    div.style.backgroundColor = todo.color;
    div.className = "list_item";
    div.innerHTML = `
    <div class="items_all">
      <h4><span></span> ${todo.text}</h4>
      <div>
        <a><i class="far fa-check-circle"></a></i>
        <a><i class="fas fa-trash"></i></a>
      </div>
    </div>`;
    list.appendChild(div);
  })
} 

// Add Item
const addItem = (e) => {
  if(form_input.value !== '') {
    todos.push({text: form_input.value, completed: false, color: 'white'});
    console.log(todos)
    form_input.value = '';
    clearAll();
    IntData();
  } else {
    const error = document.createElement('h4');
    error.textContent = 'Please writedown a task';
    err.appendChild(error)
    setTimeout( () => {
      error.remove();
    }, 2000);
  }
  e.preventDefault();
}

// Clear All
function clearAll() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// Remove A Task
function removeTask(e) {
  if (e.target.classList.contains("fa-trash")) {
      const delItem = e.target.parentElement.parentElement.parentElement.textContent;
      const deleteToDo = function(todos, delItem){
        const index = todos.findIndex(function (todo) {
          return todo.text === delItem.trim();
        })
        if(index > -1) {
          todos.splice(index, 1)
        }
      }
      deleteToDo(todos, delItem);
      clearAll();
      IntData();
  }
}

function checkToDo(e) {
  if(e.target.classList.contains("fa-check-circle")) {
    const check = e.target.parentElement.parentElement.parentElement.textContent;
    const checkColor = function(todos, check) {
      const index = todos.findIndex(function(todo) {
        return todo.text === check.trim();
      })
      if(index > -1) {
        const target = e.target.parentElement.parentElement.parentElement.parentElement;
        todos[index].color = 'var(--second-green)';
      }
    }
  checkColor(todos, check);
  clearAll();
  IntData();
  }
}



loadAllEventListeners();

// Event listeners
function loadAllEventListeners() {
  // DOM loader
  window.addEventListener('DOMContentLoaded', IntData)
  // Event Listener
  form.addEventListener('submit', addItem);
  // Remove Task
  list.addEventListener('click', removeTask);
  // Checked
  list.addEventListener('click', checkToDo)
}











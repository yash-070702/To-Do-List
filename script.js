const inputField=document.querySelector(".input-field textarea");
const todoList=document.querySelector(".todoLists");
const pendingNum=document.querySelector(".pending-num");
const clearButton=document.querySelector("clear-button");

//we will call this function while deleting adding checking and unchecking the to do points

function allTasks(){
    let tasks=document.querySelectorAll(".pending");
    pendingNum.innerHTML=tasks.length===0 ?"No" : tasks.length;

    let allLists=document.querySelectorAll(".list");
    if(allLists.length>0)
    {
        todoList.style.marginTop="20px";
        return;
    }
    todoList.style.marginTop="0px";
    return;
} 

function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos")==="null"){  // function to get something from local storage
    todos=[];
    } 
    else{
        todos=JSON.parse(localStorage.getItem("todos")); // parse will convert value to the object
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos)); // function will set something to the local storage
    };

inputField.addEventListener("keyup",(e)=>{
    let inputVal=inputField.value.trim();

    // jab hi enter hogi value jb enter key press hogi aur value m km se km ek letter hoga
    if(e.key==="Enter" && inputVal.length>0){
      let liTag=` <li class="list pending" onclick="handleStatus(this)"> 
      <input type="checkbox"/>
      <span class="task">${inputVal}</span>
      <i class="material-symbols-outlined delete" onclick="deleteTask(this)">
          delete
      </i>
  </li>`;  //this in handlestatus help to select that li only without using a particular id for it 
  
  // aur ye pendingf class isilie di  hai kyuki add krte tym hr to do pending hi hoga
 
  saveLocalStorage(inputVal);
  inputField.value="";
  todoList.insertAdjacentHTML("beforeend",liTag);
  allTasks();
    }
});

function getTodosFromLocalStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
todos=JSON.parse(localStorage.getItem("todos"));
todos.forEach((todo)=>{
    let liTag=` <li class="list pending" onclick="handleStatus(this)"> 
    <input type="checkbox"/>
    <span class="task">${todo}</span>
    <i class="material-symbols-outlined delete" onclick="deleteTask(this)">
        delete
    </i>
</li>`; 
todoList.insertAdjacentHTML("beforeend",liTag);
allTasks();

})
    }
}; // this function is used to local all thge todos from the localstorage 




function handleStatus(e){
    const checkbox=e.querySelector("input");
   //yeh pura function ye kr rha h ki checked click krne pr pending class add kr rha hai ya fir delete kr rha hai
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
}

function clearAll(){
    todoList.innerHTML="";
    pendingNum.innerHTML= "No";
    clearLocalTodos();
    allTasks();
}

function deleteTask(e){
e.parentElement.remove();
deleteLocalTodos(e.parentElement);
allTasks();
}

// to dlt totdos from localstorage
function deleteLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
todos=JSON.parse(localStorage.getItem("todos"));
}
let todoText=todo.children[1].innerHTML;
let todoIndex=todos.indexOf(todoText);
todos.splice(todoIndex,1);
localStorage.setItem("todos",JSON.stringify(todos));

};
function clearLocalTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
todos=JSON.parse(localStorage.getItem("todos"));
}
todos=[];
localStorage.setItem("todos",JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded",getTodosFromLocalStorage); //all todos will automatically after even after refresh of the page

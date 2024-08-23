const inputbox = document.getElementById("task")
const addbtn = document.getElementById("addbtn")
const listContainer = document.getElementById("list-container")
const listPlaceholder = document.querySelector(".list")

function addTask(){
    if(inputbox.value === ""){
        alert("Please enter a task")
    } else {
        let newTask = document.createElement("li")
        newTask.innerHTML = inputbox.value;

        let deleteBtn = document.createElement("span")
        deleteBtn.innerHTML = "X"
        deleteBtn.className = "delete-btn"

        newTask.appendChild(deleteBtn)

        deleteBtn.onclick = function() {
            newTask.classList.add('delete-transition');
            setTimeout(() => {
                newTask.classList.add('deleted');
            }, 100);
            setTimeout(() => {
                newTask.remove();
                if (listContainer.children.length === 1) {
                    listPlaceholder.style.display = "block";
                }
            }, 300);
        }

        listContainer.appendChild(newTask)
        inputbox.value = "";

        if (listContainer.children.length > 1) {
            listPlaceholder.style.display = "none";
        }
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete-btn")) {
        e.target.parentElement.classList.add("delete-transition");
        setTimeout(function() {
            e.target.parentElement.remove();
            saveData();
        }, 500);
    }
});

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}

function showTask(){
    const storedData = localStorage.getItem("data");
    if (storedData) {
        listContainer.innerHTML = storedData;
        listPlaceholder.style.display = "none";
    } else {
        listPlaceholder.style.display = "block";
    }
}
showTask()
addbtn.onclick = addTask;
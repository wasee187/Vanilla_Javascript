//importing http module 
import { http } from "./http";

//importing UI module
import { ui } from "./ui";

//getting Tasks after DOM loaded
document.addEventListener('DOMContentLoaded',getTasks);
//Eidt task/complete task event listener
document.querySelector('.task-continer').addEventListener('click', stateCheck);
//update task eventlistener
document.querySelector('.update-task').addEventListener('click',updateTask);
//add task event listener taskhhandle
document.querySelector('.add-Task').addEventListener('click', addTask);
//Delete task event listener
document.querySelector('.delete-task').addEventListener('click', deleteTask);
//back button event listener
document.querySelector('.back-btn').addEventListener('click',backState);

//function fo completed tasks
function completedTask(e){
    const taskID = e.target.parentElement.id.split('-')[1];
    http
        .get(`http://localhost:3000/Tasks/${taskID}`)
        .then(data => {
            const updatedTask ={
                title : data.title,
                complete : !data.complete,
            }
            http
                .update(`http://localhost:3000/Tasks/${taskID}`, updatedTask)
                .then(task =>{
                    if(task.complete === true){
                        ui.showAlertMessage(`${task.title} completed`,'alert alert-info');
                    }else{
                        ui.showAlertMessage(`${task.title} is incomplete`,'alert alert-secondary');
                    }
                    getTasks();
                });
        });
    
}
//function for check state
function stateCheck(e){
    //event deligation
    if(e.target.parentElement.classList.contains('Edit-task')){
        editTask(e);
    }else if(e.target.parentElement.classList.contains('completed-task')){
        completedTask(e);
    }
}

//function for back state
function backState(){
    //clearing field
    ui.clearFiled();
    //getting task
    getTasks();
}
//function for delete task
function deleteTask(e){
    const taskID = document.getElementById('id').value;
    http
        .delete(`http://localhost:3000/Tasks/${taskID}`)
        .then(task=>{
            //clearing field
            ui.clearFiled();
            //showing message
            ui.showAlertMessage('Task deleted','alert alert-warning');
            //getting task
            getTasks();
        })
}
//function for update task
function updateTask(e){ 
    e.preventDefault();
    const taskTitle = document.querySelector('.task-title').value;
    const taskID = document.getElementById('id').value;
    if(taskTitle.trim()=== ''){
        ui.showAlertMessage('Please enter valid information','alert alert-danger');
    }else{
        const updatedTask = {
            title : taskTitle,
            complete: false,
        }
        http
            .update(`http://localhost:3000/Tasks/${taskID}`, updatedTask)
            .then(task => {
                //clearing form field
                ui.clearFiled();
                //showing message
                ui.showAlertMessage('Task updated successfully','alert alert-success');
                //getting data
                getTasks();
            });
    }
}
//function for edit task
function editTask(e){
    ui.showEidtState();
    const id = e.target.parentElement.id.split('-')[1];
    http
        .get(`http://localhost:3000/Tasks/${id}`)
        .then(data => {
        ui.fillForm(data);
    });
}
//function for add new Task
function addTask(e){
    
    e.preventDefault();
    const taskTitle = document.querySelector('.task-title').value;
    const taskID = document.getElementById('id').value;
    if(taskTitle.trim()=== ''){
        ui.showAlertMessage('Please enter valid information','alert alert-danger');
        //console.log('Please enter valid information');
    }else{
        const data = {
        title : taskTitle,
        complete : false, 
    }
    http.post('http://localhost:3000/Tasks',data)
        .then(data=>{
                ui.clearFiled();
                //showing message
                ui.showAlertMessage('New Task added successfully','alert alert-success');
                //getting tasks
                getTasks();
            });
        }
    
}
//getting tasks to UI
function getTasks(){
    http
    .get('http://localhost:3000/Tasks')
    .then(tasks => {
      
            //showing tasks in ui
            ui.showTasks(tasks);
            //showing total task in ui
            ui.showTotalTasks(tasks);
            //getting complited task 
            ui.getCompletedTaskCount(tasks);
        
    })
    .catch(err=> console.log(err));
    //showing add State
     ui.showAddState()
};

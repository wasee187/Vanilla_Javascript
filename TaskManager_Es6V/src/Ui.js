class UI{
    constructor(){
        this.taskContainer = document.querySelector('.task-continer');
        this.addTask = document.querySelector('.add-Task');
        this.updateTask = document.querySelector('.update-task');
        this.deleteTask = document.querySelector('.delete-task');
        this.backBtn = document.querySelector('.back-btn');
        this.completedTask = document.querySelector('.completed-tasks');
        this.totalTasks = document.querySelector('.total-tasks');
        this.taskTitleInput = document.querySelector('.task-title');
        this.idInput = document.getElementById('id');
        
    }
    showTasks(tasks){
        let output = " ";
        tasks.forEach(task => {
            const {id,title,complete} = task;
            output += `

                    <div class="task-item mb-2">
                    <div class="row">
                        <div class="col-sm-6">
                            <h5 class = ${complete === true ? 'completed-task' : ''}>${title}</h5>
                        </div>
                        <div class="col-sm-6">
                            <a href="#" class="Edit-task float-right" id="task-${id}">
                                <i class="fas fa-pencil-alt"></i>
                            </a>
                            <a href="#" class="completed-task float-right mr-3" id="task-${id}">
                                <i class="fas fa-check"></i>
                            </a>

                        </div>
                    </div>
                </div>
                `
        });
        this.taskContainer.innerHTML = output;
    }
    clearFiled(){
        this.taskTitleInput.value = '';
        
    }
    showEidtState(){
        this.addTask.style.display = 'none';
        this.updateTask.style.display = 'inline-block';
        this.deleteTask.style.display = 'inline-block';
        this.backBtn.style.display = 'inline-block';
    }
    showAddState(){
        this.addTask.style.display = 'inline-block';
        this.updateTask.style.display = 'none';
        this.deleteTask.style.display = 'none';
        this.backBtn.style.display = 'none';
    }
    fillForm({title,id}){
        this.taskTitleInput.value = title;
        this.idInput.value = id;
    }
    showTotalTasks(tasks){
        const count = tasks.length;
        this.totalTasks.textContent = count;
    }
    getCompletedTaskCount(tasks){
       let count = tasks.reduce((acc,task) =>{
           if(task.complete){
               acc ++;
               return acc;
           }else{
               return acc;
           }
       },0);
       this.completedTask.textContent = count;
    }
    showTaskContainer(){
        this.taskContainer.style.display = 'block';
    }
    hideTaskContainer(){
        this.taskContainer.style.display = 'none';
    }
    showAlertMessage(msg,className){
        
        const div = document.createElement('div');
        div.className = className;
        div.textContent = msg;
        this.taskContainer.insertAdjacentElement('beforebegin', div);
        setTimeout(()=>{
            this.clearAlert();
        },2000);
    }
    clearAlert(){
        if(document.querySelector('.alert')){
            document.querySelector('.alert').remove();
        }
    }
}

export const ui = new UI;
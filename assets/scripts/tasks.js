class TaskView {
    static withoutTasks(mainSel) {
        mainSel.innerHTML = `
            <div id="without-tasks">
                <h1>Without tasks</h1>
                <button class="add-btn">Add Tasks</button>
            </div>
        `
        this.addBtn(mainSel);
    }

    static addBtn(mainSel) {
        mainSel.querySelector('.add-btn').addEventListener('click', () => {
            history.pushState({}, "", "?screen=task-form");
            renderScreen();
        })
    }

    static tasksForm(mainSel, tasks, renderScreen) {
        mainSel.innerHTML =  `
            <form id="add-task-form">
                <label for="name">Nome da tarefa:</label>
                <input id="name" name="name">
                <input type="submit" value="Adicionar">
            </form>
        `

        mainSel.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            const data = this.getTaskData();
            if(tasks.getDataStructuredClone().some(task => task.name === data.name))
                return alert('Erro task já existente')
            tasks.commitChanges([ ...tasks.getDataStructuredClone(), data ])
            history.pushState({}, "", window.location.pathname);
            renderScreen();
        })
    }

    static getTaskData() {
        const id = generateUUID();
        const inputName = document.querySelector('#add-task-form > input#name');

        return {
            id,
            name: inputName.value
        }
    }

    static preTaskList() {
        return `
            <div>
                <button class="add-btn task-list">Add Tasks</button>
                <div id="task-container"></div>
            </div>
        `
    }

    static getTaskList(taskList, mainSel, tasks) {
        const div = document.createElement('div');

        for(let task of taskList) {
            const taskWrapper = document.createElement("div");
            const taskName = document.createElement('label');
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = task.name;
            checkBox.addEventListener('change', () => {
                task.checkedDate = checkBox.checked ? getTodayDate() : null;
                tasks.commitChanges(taskList);
            })
            taskName.setAttribute('for', task.name);
            checkBox.checked = task.checkedDate === getTodayDate();
            console.log(checkBox.value)
            taskName.textContent = task.name;
            taskWrapper.append(checkBox, taskName)
            div.append(taskWrapper);
        }

        mainSel.innerHTML = this.preTaskList();

        mainSel.querySelector('#task-container').append(div);

        this.addBtn(mainSel)
    }
}
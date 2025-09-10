class TaskView {
    static withoutTasks() {
        return `
        <div id="without-tasks">
            <h1>Without tasks</h1>
            <button class="add-btn">Add Tasks</button>
        </div>
    `
    }

    static tasksForm() {
        return `
            <form id="add-task-form">
                <label for="name">Nome da tarefa:</label>
                <input id="name" name="name">
                <input type="submit" value="Adicionar">
            </form>
        `
    }

    static getTaskData() {
        const id = generateUUID();
        const inputName = document.querySelector('#add-task-form > input#name');

        return {
            id,
            name: inputName.value
        }
    }
}
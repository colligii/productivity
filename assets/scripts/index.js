const tasks = new LocalDataBase('tasks');

const mainSel = document.querySelector('#main');

if(!tasks.getDataStructuredClone()?.length) {
    mainSel.innerHTML = `
        <div id="without-tasks">
            <h1>Without tasks</h1>
            <button class="add-btn">Add Tasks</button>
        </div>
    `
}
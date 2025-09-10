const tasks = new LocalDataBase('tasks');

const mainSel = document.querySelector('#main');

tasks.onChange(mainSelBg)

function mainSelBg() {
    mainSel.style.background = calculateColor(tasks.getDataStructuredClone().length || 1, tasks.getDataStructuredClone().filter(task => task.checkedDate).length);
}

function renderScreen() {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');
    
    if(!screen && !tasks.getDataStructuredClone()?.length) {
        TaskView.withoutTasks(mainSel);
    } else if(!screen && tasks.getDataStructuredClone()?.length) {
        TaskView.getTaskList(tasks.getDataStructuredClone(), mainSel, tasks);
    } else if(screen === 'task-form') {
        TaskView.tasksForm(mainSel, tasks, renderScreen);
    } else {
        history.pushState({}, "", window.location.pathname);
        renderScreen();
    }

    mainSelBg();
}

renderScreen();
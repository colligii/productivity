const tasks = new LocalDataBase('tasks');

const mainSel = document.querySelector('#main');

tasks.onChange(mainSelBg)

function mainSelBg() {
    const completedTasks = tasks.getDataStructuredClone().filter(task => task.checkedDate === getTodayDate()).length;
    const allTasks = tasks.getDataStructuredClone().length;
    mainSel.style.background = calculateColor(allTasks || 1, completedTasks);
    if(allTasks && allTasks === completedTasks) {
        alert('Todas as tasks foram completas');
    }
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
const tasks = new LocalDataBase('tasks');

const mainSel = document.querySelector('#main');

function calculateColor(total, completed) {
  let percent = completed / total;

  let red = [233, 84, 84];
  let orange = [245, 166, 35];
  let green = [88, 236, 108];

  let r, g, b;

  if (percent <= 0.5) {
    let p = percent / 0.5; 
    r = Math.round(red[0] + (orange[0] - red[0]) * p);
    g = Math.round(red[1] + (orange[1] - red[1]) * p);
    b = Math.round(red[2] + (orange[2] - red[2]) * p);
  } else {
    let p = (percent - 0.5) / 0.5; 
    r = Math.round(orange[0] + (green[0] - orange[0]) * p);
    g = Math.round(orange[1] + (green[1] - orange[1]) * p);
    b = Math.round(orange[2] + (green[2] - orange[2]) * p);
  }

  return `rgb(${r}, ${g}, ${b})`;
}

function renderScreen() {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');
    
    if(!screen && !tasks.getDataStructuredClone()?.length) {
        TaskView.withoutTasks(mainSel);
    } else if(!screen && tasks.getDataStructuredClone()?.length) {
        TaskView.getTaskList(tasks.getDataStructuredClone(), mainSel);
    } else if(screen === 'task-form') {
        TaskView.tasksForm(mainSel, tasks, renderScreen);
    } else {
        history.pushState({}, "", window.location.pathname);
        renderScreen();
    }

    mainSel.style.background = calculateColor(1,0);
}

renderScreen();
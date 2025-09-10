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

tasks.onAdd(() => {

})


function renderScreen() {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');
    
    if(!screen && !tasks.getDataStructuredClone()?.length) {
        mainSel.innerHTML = TaskView.withoutTasks();

        mainSel.querySelector('.add-btn').addEventListener('click', () => {
            history.pushState({}, "", "?screen=task-form");
            renderScreen();
        })
    } else if(screen === 'task-form') {
        mainSel.innerHTML = TaskView.tasksForm();

        mainSel.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            const data = TaskView.getTaskData();
            console.log(data);
        })
    } else {
        history.pushState({}, "", window.location.pathname);
        renderScreen();
    }

    mainSel.style.background = calculateColor(1,0);
}

if(!tasks.getDataStructuredClone()?.length)
    renderScreen();
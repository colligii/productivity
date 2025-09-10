function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getTodayDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}


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

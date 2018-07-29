if (Notification.permission !== 'granted') {
  const requestPermission = document.getElementById('request-permission');
  requestPermission.hidden = false;
  requestPermission.addEventListener('click', event => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        requestPermission.hidden = true;
      }
    });
  });
}

if (!localStorage.allowed) {
  localStorage.allowed = JSON.stringify([]);
}
const allowed = JSON.parse(localStorage.allowed);
for (const origin of allowed) {
  display(origin);
}

function add(origin) {
  if (!/^https?:\/\/\w+(\.\w+)*$/.test(origin)) {
    return;
  }
  if (allowed.includes(origin)) {
    return;
  }
  allowed.push(origin);
  localStorage.allowed = JSON.stringify(allowed);
  display(origin);
}
function display(origin) {
  const ul = document.getElementById('origins-ul');
  const li = document.createElement('li');
  li.textContent = `${origin} `;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Remove';
  button.addEventListener('click', event => {
    document.getElementById('origins-ul')
      ul.removeChild(li);
    allowed.splice(allowed.indexOf(origin), 1);
    localStorage.allowed = JSON.stringify(allowed);
  });
  li.appendChild(button);
  document.getElementById('origins-ul')
    ul.appendChild(li);
}

document.getElementById('add-button').addEventListener('click', event => {
  add(document.getElementById('origin-input').value);
});

document.getElementById('origin-input').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    add(event.target.value);
  }
});
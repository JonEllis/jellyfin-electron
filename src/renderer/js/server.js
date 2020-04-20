const {remote, ipcRenderer} = require('electron');
const config = require('../../config');

ipcRenderer.on('select-server-response', function(event, response) {
  if (response[0] == false) {
      alert(response[1]);
  }

  serverForm.classList.remove('hidden');
  serverSpinner.classList.add('hidden');
});

var serverUrl = document.getElementById('server-url'),
    serverGo = document.getElementById('server-go'),
    serverForm = document.getElementById('server-form'),
    serverSpinner = document.getElementById('server-spinner');

serverUrl.value = config.get('server', '');

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function go() {
  if (serverGo.disabled) {
    return;
  }

  serverForm.classList.add('hidden');
  serverSpinner.classList.remove('hidden');

  result = ipcRenderer.send('select-server', serverUrl.value);
}

serverUrl.addEventListener('keyup', function(e) {
  if (event.key === "Enter") {
    go();
  }

  serverGo.disabled = !validURL(this.value);
});

serverGo.addEventListener('click', go);

serverGo.disabled = !validURL(serverUrl.value);

const {app, globalShortcut} = require('electron');
const config = require('./config');

const ServerWindow = require('./windows/server');

let serverWindow;
let playerWindow;

function createServerWindow() {
  if (serverWindow) {
    serverWindow.show();
    return;
  }

  serverWindow = new ServerWindow();

  serverWindow.on('server-selected', (serverUrl) => {
    config.set('server', serverUrl);
    createPlayerWindow();
  });

  serverWindow.on('closed', () => {
    serverWindow = null;
  });
}

function createPlayerWindow() {
  alert('creating player window');
}



app.on('ready', () => {
  createServerWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (serverWindow === null) {
    createServerWindow();
  }
});

const {app, globalShortcut} = require('electron');
const config = require('./config');

const ServerWindow = require('./windows/server');
const PlayerWindow = require('./windows/player');

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
    serverWindow.hide();
  });

  serverWindow.on('closed', () => {
    serverWindow = null;
  });
}

function createPlayerWindow() {
  if (playerWindow) {
    playerWindow.show();
    return;
  }

  playerWindow = new PlayerWindow();

  playerWindow.on('closed', () => {
    playerWindow = null;
    createServerWindow();
  });

  playerWindow.on('new-track', (trackData) => {
    // todo: show notifications
  });
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

const {app, globalShortcut} = require('electron');
const config = require('./config');

const ServerWindow = require('./windows/server');
const PlayerWindow = require('./windows/player');
const AboutWindow = require('./windows/about');

const ApplicationMenu = require('./menus/application');
const DockMenu = require('./menus/dock');

let applicationMenu;
let dockMenu;

let serverWindow;
let playerWindow;
let aboutWindow;



// Create windows

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

function createAboutWindow() {
  if (aboutWindow) {
    aboutWindow.show();
    return;
  }

  aboutWindow = new AboutWindow();
  aboutWindow.on('closed', () => {
    aboutWindow = null;
  });
}



// Create menus

function createApplicationMenu() {
  applicationMenu = new ApplicationMenu();
  bindMenuEvents(applicationMenu);
}

function createDockMenu() {
  dockMenu = new DockMenu();
  bindMenuEvents(dockMenu);
}

function bindMenuEvents(menu) {
  menu.on('show-server-window', () => {
    createServerWindow();

    if (playerWindow) {
      playerWindow.hide();
    }
  });

  menu.on('show-about-window', createAboutWindow);

  menu.on('playback-command', (command) => {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand(command);
    }
  });
}



// App setup

app.on('ready', () => {
  createDockMenu();
  createApplicationMenu();
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

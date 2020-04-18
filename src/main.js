const {app, globalShortcut} = require('electron');
const config = require('./config');

const ServerWindow = require('./windows/server');
const PlayerWindow = require('./windows/player');
const PreferencesWindow = require('./windows/preferences');
const AboutWindow = require('./windows/about');

const ApplicationMenu = require('./menus/application');
const DockMenu = require('./menus/dock');

let applicationMenu;
let dockMenu;

let serverWindow;
let playerWindow;
let preferencesWindow;
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

function createPreferencesWindow() {
  if (preferencesWindow) {
    preferencesWindow.show();
    return;
  }

  preferencesWindow = new PreferencesWindow(config);

  preferencesWindow.on('closed', function () {
    preferencesWindow = null;
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

  menu.on('show-preferences-window', createPreferencesWindow);

  menu.on('show-about-window', createAboutWindow);

  menu.on('playback-command', (command) => {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand(command);
    }
  });
}



// Global shortcuts

function unbindGlobalShortcuts() {
  globalShortcut.unregister('MediaStop');
  globalShortcut.unregister('MediaPlayPause');
  globalShortcut.unregister('MediaNextTrack');
  globalShortcut.unregister('MediaPreviousTrack');
}

function bindGlobalShortcuts() {
  globalShortcut.register('MediaStop', function() {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand('stop');
    }
  });

  globalShortcut.register('MediaPlayPause', function() {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand('playPause');
    }
  });

  globalShortcut.register('MediaNextTrack', function() {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand('nextTrack');
    }
  });

  globalShortcut.register('MediaPreviousTrack', function() {
    if (playerWindow) {
      playerWindow.sendPlaybackCommand('previousTrack');
    }
  });
}



// App setup

app.on('ready', () => {
  createDockMenu();
  createApplicationMenu();

  if (!config.get('startWithServerWindow') && config.get('server')) {
    createPlayerWindow();
  } else {
    createServerWindow();
  }

  if (config.get('bindMediaKeys')) {
    bindGlobalShortcuts();
  }
});

app.on('window-all-closed', () => {
  unbindGlobalShortcuts();
  app.quit();
});

app.on('activate', () => {
  if (!config.get('startWithServerWindow') && config.get('server')) {
    createPlayerWindow();
  } else {
    createServerWindow();
  }
});

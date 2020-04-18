const {BrowserWindow} = require('electron');
const EventEmitter = require('events');

class PreferencesWindow extends EventEmitter {

  constructor() {
    super();
    this.createWindow();
  }

  createWindow() {
    this.window = new BrowserWindow({
      // icon: __dirname + '../renderer/icons/emby.icns',
      width: 1600,
      height: 600,
      center: true,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#101010',
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: true,
      }
    });

    this.window.webContents.openDevTools();

    this.window.loadFile('src/renderer/html/preferences.html');

    this.window.on('closed', (...args) => {
      this.window = null;
      this.emit('closed', ...args);
    });
  }

  show() {
    this.window.show();
  }

  hide() {
    this.window.hide();
  }

}

module.exports = PreferencesWindow;

const {BrowserWindow} = require('electron');
const EventEmitter = require('events');

class PreferencesWindow extends EventEmitter {

  constructor() {
    super();
    this.createWindow();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#101010',
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: true,
      }
    });

    this.window.setMenu(null);
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

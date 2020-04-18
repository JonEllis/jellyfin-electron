const {BrowserWindow} = require('electron');
const EventEmitter = require('events');

class AboutWindow extends EventEmitter {

  constructor() {
    super();
    this.createWindow();
  }

  createWindow() {
    this.window = new BrowserWindow({
      // icon: __dirname + '../renderer/icons/emby.icns',
      width: 525,
      height: 350,
      center: true,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#202124',
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false
      }
    });

    this.window.loadFile('src/renderer/html/about.html');

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

module.exports = AboutWindow;

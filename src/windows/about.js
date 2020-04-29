const {BrowserWindow, nativeImage} = require('electron');
const EventEmitter = require('events');

class AboutWindow extends EventEmitter {

  constructor() {
    super();
    this.createWindow();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 525,
      height: 350,
      center: true,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#101010',
      titleBarStyle: 'hiddenInset',
      icon: nativeImage.createFromPath(__dirname + '/../../icons/png/128x128.png'),
    });

    this.window.setMenu(null);
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

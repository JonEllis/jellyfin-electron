const electron = require('electron');
const {BrowserWindow, ipcMain} = require('electron');
const EventEmitter = require('events');
const config = require('../config');
const path = require('path');

class PlayerWindow extends EventEmitter {

  constructor() {
    super();

    this.nowPlaying = null;

    this.createWindow();
    this.handleIpc();
  }

  createWindow() {
    let display = electron.screen.getPrimaryDisplay();

    this.window = new BrowserWindow({
      // icon: __dirname + '../renderer/icons/emby.icns',
      useContentSize: true,
      backgroundColor: '#101010',
      width: display.bounds.width * 0.75,
      height: display.bounds.height * 0.75,
      center: true,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, '../renderer/js/integration.js')
      }
    });

    this.window.loadURL(config.get('server'));

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

  handleIpc() {
    ipcMain.on('new-track', (event, nowPlaying) => {
      this.nowPlaying = nowPlaying;
      this.emit('new-track', nowPlaying);
    });
  }

  getNowPlaying() {
    return this.nowPlaying;
  }

  sendPlaybackCommand(command) {
    this.window.webContents.send('playback-command', command);
  }

}

module.exports = PlayerWindow;

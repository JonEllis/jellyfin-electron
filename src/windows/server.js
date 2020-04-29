const {BrowserWindow, ipcMain, nativeImage} = require('electron');
const EventEmitter = require('events');
const got = require('got');

class ServerWindow extends EventEmitter {

  constructor() {
    super();

    this.createWindow();
    this.handleIpc();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      resizable: true,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#101010',
      titleBarStyle: 'hiddenInset',
      icon: nativeImage.createFromPath(__dirname + '/../../icons/png/128x128.png'),
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.setMenu(null);
    this.window.loadFile('src/renderer/html/server.html');

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
    ipcMain.on('select-server', (event, serverUrl) => {
      serverUrl = serverUrl.replace(/\/+$/, '');

      // todo: find a way to determine whether this is a Jellyfin server
      event.reply('select-server-response', [true, 'success']);
      this.emit('server-selected', serverUrl);
      return;
      // todo: then the above can be removed

      let pingURL = serverUrl + '/System/Ping';

      got.post(pingURL)
        .then((response) => {
          if (response.body != 'Jellyfin Server') {
            throw serverUrl + ' does not look like a jellyfin server.';
          }

          event.reply('select-server-response', [true, 'success']);
          this.emit('server-selected', serverUrl);
        })
        .catch((e) => {
          console.log(e);

          let error;

          if (typeof e == 'string') {
            error = e;
          } else {
            error = 'Could not determine if ' + serverUrl + ' is a Jellyfin server.';
          }

          event.reply('select-server-response', [false, error]);
        });
    });
  }

}

module.exports = ServerWindow;

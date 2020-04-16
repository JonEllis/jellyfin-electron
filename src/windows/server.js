const {BrowserWindow, ipcMain} = require('electron');
const EventEmitter = require('events');
const got = require('got');

class ServerWindow extends EventEmitter {

  constructor() {
    super();

    this.window = new BrowserWindow({
      // icon: __dirname + '../renderer/icons/jellyfin.icns',
      width: 800,
      height: 600,
      resizable: true,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: '#101010',
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadFile('src/renderer/html/server.html');
    this.handleIpc();
  }

  handleIpc() {
    ipcMain.on('select-server', (event, serverUrl) => {
      serverUrl = serverUrl.replace(/\/+$/, '');

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

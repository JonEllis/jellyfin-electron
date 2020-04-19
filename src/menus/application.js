const {app, Menu, shell} = require('electron');
const JellyfinMenu = require('./jellyfin');

class ApplicationMenu extends JellyfinMenu {

  constructor() {
    super();
    this.createMenu();
  }

  createMenu() {
    let mainMenuName = process.platform === 'darwin' ? app.name : 'File';

    let menu = Menu.buildFromTemplate([
      {
        label: mainMenuName,
        submenu: [
          {
            label: 'About ' + app.name,
            click: () => {
              this.emit('show-about-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Preferences',
            accelerator: 'Super+,',
            click: () => {
              this.emit('show-preferences-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Show Server Window',
            click: () => {
              this.emit('show-server-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Quit ' + app.name,
            accelerator: 'Super+Q',
            click: () => {
              app.quit();
            }
          }
        ]
      },
      { role: 'fileMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
      this.createPlaybackMenuTemplate(),
      {
        role: 'help',
        submenu: [
          {
            label: 'View on GitHub',
            click: () => {
              shell.openExternalSync('https://github.com/JonEllis/jellyfin-electron');
            }
          }
        ]
      }
    ]);

    Menu.setApplicationMenu(menu);
  }

}

module.exports = ApplicationMenu;

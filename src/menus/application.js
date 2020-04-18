const {app, Menu, shell} = require('electron');
const JellyfinMenu = require('./jellyfin');

class ApplicationMenu extends JellyfinMenu {

  constructor() {
    super();
    this.createMenu();
  }

  createMenu() {
    let mainMenuName = process.platform === 'darwin' ? app.getName() : 'File';

    let menu = Menu.buildFromTemplate([
      {
        label: mainMenuName,
        submenu: [
          {
            label: 'About ' + app.getName(),
            click: function() {
              self.emit('show-about-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Preferences',
            accelerator: 'Super+,',
            click: function() {
              self.emit('show-preferences-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Show Server Window',
            click: function() {
              self.emit('show-server-window');
            }
          },
          {
            type:'separator'
          },
          {
            label: 'Quit ' + app.getName(),
            accelerator: 'Super+Q',
            click: function() {
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
            click: function() {
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

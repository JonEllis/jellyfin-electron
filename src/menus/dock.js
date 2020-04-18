const {app, Menu} = require('electron');
const JellyfinMenu = require('./jellyfin');

class DockMenu extends JellyfinMenu {

  constructor() {
    super();
    this.createMenu();
  }

  createMenu() {
    let menu = Menu.buildFromTemplate([
      {
        label: 'Show Server Window',
        click: () => {
          self.emit('show-server-window');
        }
      },
      this.createPlaybackMenuTemplate()
    ]);

    app.dock.setMenu(menu);
  }

}

module.exports = DockMenu;

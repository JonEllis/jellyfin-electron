const {app, Menu, shell} = require('electron');
const EventEmitter = require('events');

class JellyfinMenu extends EventEmitter {

  createPlaybackMenuTemplate() {
    let self = this;

    return {
      label: 'Playback',
      submenu: [
        {
          label: 'Stop',
          click: function() {
            self.emit('playback-command', 'stop');
          }
        },
        {
          label: 'Play/Pause',
          click: function() {
            self.emit('playback-command', 'playPause');
          }
        },
        {
          label: 'Next Track',
          click: function() {
            self.emit('playback-command', 'nextTrack');
          }
        },
        {
          label: 'Previous Track',
          click: function() {
            self.emit('playback-command', 'previousTrack');
          }
        }
      ]
    }
  }

}

module.exports = JellyfinMenu;

(function() {

  const {ipcRenderer} = require('electron');
  const validCommands = ['stop', 'playPause', 'nextTrack', 'previousTrack'];

  function waitForRequire() {
    return new Promise(function(resolve, reject) {
      let requireInterval = setInterval(function() {
        if (typeof window.require == 'function') {
          clearInterval(requireInterval);
          resolve();
        }
      }, 500);
    });
  }

  function waitForModule(moduleName) {
    return new Promise(function(resolve, reject) {
      let moduleInterval = setInterval(function() {
        try {
          let module = window.require(moduleName);
          clearInterval(moduleInterval);
          resolve(module);
        } catch(err) {}
      }, 500);
    });
  }

  function waitForDependencies() {
    return waitForRequire().then(function() {
      return Promise.all([
        waitForModule('events'),
        waitForModule('playbackManager')
      ]);
    });
  }

  waitForDependencies().then(function(values){
    events = values[0];
    playbackManager = values[1];

    bindControls();
    bindPlayerManagerEvents(events, playbackManager);
  });

  function bindControls() {
    ipcRenderer.on('playback-command', function(event, command) {
      if (validCommands.indexOf(command) === -1) {
        console.log('Invalid command', command);
        return;
      }

      playbackManager[command]();
    });
  }

  function bindPlayerManagerEvents(events, playbackManager) {
    events.on(playbackManager, 'playerchange', function(e, player) {
      events.on(player, 'playbackstart', function(e, state) {
        ipcRenderer.send('new-track', state.NowPlayingItem);
      });
    })
  }

}());

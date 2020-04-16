const Store = require('electron-store');

let schema = {
  lastServer: {
    type: 'string',
    format: 'url',
    default: 'https://app.emby.media/'
  },
  startWithServerWindow: {
    type: 'boolean',
    default: true
  },
  bindMediaKeys: {
    type: 'boolean',
    default: true
  },
  showNotifications: {
    type: 'boolean',
    default: true
  },
  showNotificationImages: {
    type: 'boolean',
    default: true
  }
};

let config = new Store({schema});

module.exports = config

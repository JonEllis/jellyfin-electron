const Store = require('electron-store');

let schema = {
  server: {
    type: 'string',
    format: 'url',
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

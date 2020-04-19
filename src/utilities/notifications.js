const {Notification, nativeImage} = require('electron');
const got = require('got');
const config = require('../config');

let imageSize = 70;
let imageQuality = 90;

function notifyTrackChange(trackData) {
  let trackName = trackData.Name;
  let albumName = trackData.Album;
  let albumArtist = trackData.AlbumArtist;
  let imagePromise = Promise.resolve(null);

  if (config.get('showNotificationImages')) {
    let image;

    if (image = getTrackImage(trackData)) {
      imagePromise = createNativeImage(image);
    } else if (image = getAlbumImage(trackData)) {
      imagePromise = createNativeImage(image);
    }
  }

  imagePromise
    .then(function(image) {
      createTrackNotification(trackName, albumName, albumArtist, image);
    })
    .catch(function(e) {
      console.log('Could not use image', e);
      createTrackNotification(trackName, albumName, albumArtist, null);
    })
    .catch(function(e) {
      console.log('Could not create notification', e);
    });
}

function getTrackImage(trackData) {
  let trackId = trackData.Id;
  let imageTags = trackData.ImageTags;
  let imageTagName, imageTagValue, imageURL;

  if (imageTags.hasOwnProperty('Primary')) {
    imageTagName = 'Primary';
    imageTagValue = imageTags.Primary;
  } else if (Object.keys(imageTags).length > 0) {
    imageTagName = imageTags.keys()[0];
    imageTagValue = imageTags[imageTagName];
  }

  if (!imageTagName || !imageTagValue) {
    return null;
  }

  return buildImageURL(trackId, imageTagName, imageTagValue)
}

function getAlbumImage(trackData) {
  let albumId = trackData.AlbumId;
  let albumImageTag = trackData.AlbumPrimaryImageTag;

  if (!albumId || !albumImageTag) {
    return null;
  }

  return buildImageURL(albumId, 'Primary', albumImageTag);
}

function buildImageURL(objectId, imageType, imageTag) {
  let imageParams = {
    tag: imageTag,
    quality: imageQuality,
    height: imageSize
  };

  let queryString = Object.keys(imageParams)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(imageParams[k]))
    .join('&');

  return config.get('server') + '/Items/' + objectId + '/Images/' + imageType + '?' + queryString;
}

function createNativeImage(imageURL) {
  return new Promise(function(resolve, reject) {
    got(imageURL, {
      responseType: 'buffer'
    }).then(function(response) {
      let image = nativeImage.createFromBuffer(response.body);
      resolve(image);
    }).catch(function(e) {
      console.log('Could not load image', e);
      resolve(null);
    });
  });
}

function createTrackNotification(trackName, albumName, artistName, image) {
  let notification = new Notification({
    title: trackName,
    subtitle: artistName,
    body: albumName,
    icon: image,
    silent: true
  });

  notification.on('click', function() {
    notification.close();
  });

  notification.on('close', function() {
    notification = null;
  });

  notification.show();
}

module.exports = notifyTrackChange;

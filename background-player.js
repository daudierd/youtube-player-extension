import PlayerManager from './src/player-manager.js'

let playerManager = new PlayerManager();
playerManager.start();

browser.runtime.onMessage.addListener(function(message) {
  switch (message.command) {
    case 'play':
      playerManager.playVideo(message.payload); //if undefined, will play the current video
      break;
    case 'pause':
      playerManager.pauseVideo();
      break;
    case 'stop':
      playerManager.stopVideo();
      break;
    case 'previous':
      playerManager.playPreviousVideo();
      break;
    case 'next':
      playerManager.playPreviousVideo();
      break;
    default:
      console.error(message.command + ' is not a valid command');
  }
});

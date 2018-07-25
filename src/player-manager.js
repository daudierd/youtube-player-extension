import { get } from './utils.js';

/**
* PlayerManager class is provides additional functionality to
* the standard YouTube Player
*/
export default class PlayerManager {
  start() {
    console.log("Starting PlayerManager...");
    let script = document.createElement('script');
    script.id = 'iframeApi'
    script.src = 'https://www.youtube.com/iframe_api';

    window.onYouTubeIframeAPIReady = () => {
      new YT.Player('player', {
        events: { 'onReady': ((event) => {
            this.player = event.target;
            console.log("PlayerManager started!");
          })}
      });
    }
    document.body.appendChild(script);
  }

  stop() {
    console.log("Stopping PlayerManager...");
    this.player.destroy();
    this.player = undefined;
    let script = document.getElementById('iframeApi');
    script.parentNode.removeChild(script);
    console.log("PlayerManager has stopped");
  }

  playVideo(videoId) {
    videoId
      ? this.player.loadVideoById(videoId)
      : this.player.playVideo();
  }

  pauseVideo() {
    //TODO
  }

  stopVideo() {
    this.player.stopVideo();
  }

  playNextVideo() {
    //TODO
  }

  playPreviousVideo() {
    //TODO
  }

  getVideoId() {
    let regex = /https?:\/\/www\.youtube\.com\/watch\?v=(.+)/
    let result = regex.exec(this.player.getVideoUrl());

    return (result) ? result[1] : null;
  }

  getVideoTitle(videoId) {
    //TODO
  }
}

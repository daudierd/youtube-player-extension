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
        events: {
          'onReady': ((event) => {
            this.player = event.target;
            console.log("PlayerManager started!");
          }),
          'onStateChange': ((event) => { this.onPlayerStateChange(event.data); })
        }
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
    this.player.pauseVideo();
  }

  stopVideo() {
    this.player.stopVideo();
  }

  playNextVideo() {
    this.player.nextVideo();
  }

  playPreviousVideo() {
    this.player.previousVideo();
  }

  getVideoId() {
    let regex = /https?:\/\/www\.youtube\.com\/watch\?(.+&)?v=(.+)/
    let result = regex.exec(this.player.getVideoUrl());

    return (result) ? result[2] : null;
  }

  getVideoTitle(videoId) {
    const currVideoId = this.getVideoId();
    // Rule out case where videoId is empty AND no video is loaded yet
    if (videoId == undefined && !currVideoId)
      throw Error("No valid videoId provided to the function.");

    let videoURL = "https://www.youtube.com/watch?v=".concat(
      (videoId == undefined) ? currVideoId : videoId);

    let metadata = JSON.parse(get("https://www.youtube.com/oembed?url=" + videoURL + "&format=json"));
    return metadata.title;
  }

  onPlayerStateChange(state) {
    browser.storage.local.set({
      player: {
        state,
        currentTitle: this.getVideoTitle()
      }
    })
  }
}

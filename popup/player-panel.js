const titleBar = document.querySelector('#titlebar');
const searchBar = document.querySelector('#searchbar');

const previousButton = document.querySelector('#previous-button');
const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
const nextButton = document.querySelector('#next-button');
const notFavoriteButton = document.querySelector('#not-favorite-button');
const favoriteButton = document.querySelector('#favorite-button');

function toggleButton(buttonToHide, buttonToShow, callback) {
  return function(event) {
    buttonToHide.classList.add("hidden");
    buttonToShow.classList.remove("hidden");
    if(callback) {
      callback(event);
    }
  }
}

function makeSendCommand(command, payload) {
  return function() {
    browser.runtime.sendMessage({ command, payload })
  }
}

let videoId;
initialize();

function initialize() {
  browser.storage.local.set({
    favorites: []
  });
  browser.storage.local.get(['player', 'favorites']).then((res) => {
    if(res.player){
      titleBar.innerHTML = (res.player.currentTitle) ? res.player.currentTitle : '';
      videoId = res.player.videoId;
      if(res.player.state == 1) // Playing
        toggleButton(playButton, pauseButton)();
      if(videoId && res.favorites && res.favorites.includes(videoId))
        toggleButton(notFavoriteButton, favoriteButton)();
    }
  });

  playButton.onclick = toggleButton(playButton, pauseButton, makeSendCommand('play'));
  pauseButton.onclick = toggleButton(pauseButton, playButton, makeSendCommand('pause'));
  stopButton.onclick = toggleButton(pauseButton, playButton, makeSendCommand('stop'));
  previousButton.onclick = makeSendCommand('previous');
  nextButton.onclick = makeSendCommand('next');

  notFavoriteButton.onclick = function() {
    if(videoId) {
      browser.storage.local.get('favorites').then((res) => {
        console.log(res.favorites);
        res.favorites.push(videoId);
      })
    }
  }

  favoriteButton.onclick = function() {
    if(videoId) {
      browser.storage.local.get('favorites').then((res) => {
        console.log(res.favorites);
        res.favorites.splice(res.favorites.findIndex(videoId), 1);
      })
    }
  }
}

browser.storage.onChanged.addListener(function(changes, areaName) {
  if(areaName == 'local') {
    if(changes.player){
      if(changes.player.newValue.currentTitle)
        titleBar.innerHTML = changes.player.currentTitle;
      if(changes.player.newValue.state == 1) {
        toggleButton(playButton, pauseButton)();
      } else {
        toggleButton(pauseButton, playButton)();
      }
      videoId = changes.player.newValue.videoId;
    }
    if(changes.favorites) {
      if(videoId && changes.favorites.includes(videoId)) {
        toggleButton(notFavoriteButton, favoriteButton)();
      } else {
          toggleButton(favoriteButton, notFavoriteButton)();
      }
    }
  }
})

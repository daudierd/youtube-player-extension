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

initialize();

function initialize() {
  browser.storage.local.get('player').then((res) => {
    titleBar.innerHTML = (res.player.currentTitle) ? res.player.currentTitle : "No title";
    if(res.player.state == 1) // Playing
      toggleButton(playButton, pauseButton)();
  });

  playButton.onclick = toggleButton(playButton, pauseButton, makeSendCommand('play'));
  pauseButton.onclick = toggleButton(pauseButton, playButton, makeSendCommand('pause'));
  stopButton.onclick = toggleButton(pauseButton, playButton, makeSendCommand('stop'));
  previousButton.onclick = makeSendCommand('previous');
  nextButton.onclick = makeSendCommand('next');

  notFavoriteButton.onclick = toggleButton(notFavoriteButton, favoriteButton);
  favoriteButton.onclick = toggleButton(favoriteButton, notFavoriteButton);
}

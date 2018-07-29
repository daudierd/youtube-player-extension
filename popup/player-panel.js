var previousButton = document.querySelector('#previous-button');
var playButton = document.querySelector('#play-button');
var pauseButton = document.querySelector('#pause-button');
var stopButton = document.querySelector('#stop-button');
var nextButton = document.querySelector('#next-button');
var notFavoriteButton = document.querySelector('#not-favorite-button');
var favoriteButton = document.querySelector('#favorite-button');

function toggleButton(buttonToHide, buttonToShow, callback) {
  return function(event) {
    buttonToHide.classList.add("hidden");
    buttonToShow.classList.remove("hidden");
    if(callback) {
      callback(event);
    }
  }
}

playButton.onclick = toggleButton(playButton, pauseButton);
pauseButton.onclick = toggleButton(pauseButton, playButton);
notFavoriteButton.onclick = toggleButton(notFavoriteButton, favoriteButton);
favoriteButton.onclick = toggleButton(favoriteButton, notFavoriteButton);

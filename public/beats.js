var songs = ["hDXMgmZllA8", "-Fi7RtIaFSc", "L9KvZ3jKjI0"];
var currentSongIndex = 0;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
  height: '390',
  width: '640',
  videoId: songs[0],
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
console.log("player state change called with event: " + event.data);

if (event.data == YT.PlayerState.ENDED) {
  currentSongIndex++;
  if (currentSongIndex === songs.length) {
    currentSongIndex = 0;
  }
  player.loadVideoById(songs[currentSongIndex]);
}
}

function stopVideo() {
  player.stopVideo();
}

// Generate song list.
$(function() {
  $.getJSON( "songs.json", function(songs) {
    $.each(songs, function(i) {
      var li = $('<li/>').appendTo($('#playlist'));
      var a = $('<a/>').text(songs[i].title).attr("href", "#").appendTo(li);
      a.click(function(e) { e.preventDefault(); player.loadVideoById(songs[i].id); });
    });
  });
});
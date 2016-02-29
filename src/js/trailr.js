var videoLoaded = false, infoLoaded = false;

// start by inserting the api script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    videoId: 'LjLamj-b0I8',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
  console.log('player is ready');
  startLoading($('.navLink').first());
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if(event.data == 5) {
    videoLoaded = true;
    finishLoading();
  }
}

function stopVideo() {
  player.stopVideo();
}



var movies = [
  {
    name: 'Godzilla',
    youtube: 'KNmk4uTZ6vI',
    imdb: 'tt0047034'
  },
  {
    name: 'Ju-On',
    youtube: 'e8R1dODSbzU',
    imdb: 'tt0364385'
  },
  {
    name: 'Moon',
    youtube: 'twuScTcDP_Q',
    imdb: 'tt1182345'
  },
  {
    name: 'Alien',
    youtube: 'LjLamj-b0I8',
    imdb: 'tt0078748'
  },
  {
    name: 'Deadpool',
    youtube: '9vN6DHB6bJc',
    imdb: 'tt1431045'
  },
  {
    name: 'Die Hard',
    youtube: '2TQ-pOvI6Xo',
    imdb: 'tt0095016'
  }
];


$(document).ready(function() {
  $('.navLink').click(function(event) {
    startLoading($(this));
  });
});

function getMovie(name) {
  for(var i = 0; i < movies.length; i++) {
    if(movies[i].name == name) {
      return movies[i];
    }
  }
}

function startLoading(clickedElement) {
  videoLoaded = false;
  infoLoaded = false;
  event.preventDefault();
  $('#loading').fadeIn('fast').css({'display': 'flex'});
  var result = getMovie(clickedElement.text());
  player.cueVideoById(result.youtube, 0, 'large');
  $.get('http://www.omdbapi.com/?i='+result.imdb, function(data) {
    infoLoaded = true;
    $('.output .title').text(data.Title + ' ('+data.Year+')');
    $('.output .desc').text(data.Plot);
    finishLoading();
  });

}

function finishLoading() {
  if(videoLoaded && infoLoaded) {
    $('#loading').fadeOut();
  }
}

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

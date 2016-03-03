/*******************************
**      GLOBAL VARIABLES      **
*******************************/
var videoLoaded = false, infoLoaded = false, player;
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




/*******************************
**      INITIALIZE YT API     **
*******************************/
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    videoId: 'KNmk4uTZ6vI',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Event handlers for the player
function onPlayerReady(event) {
  startLoading($('.navLink').first());
}

function onPlayerStateChange(event) {
  if(event.data == 5) {
    videoLoaded = true;
    finishLoading();
  }
}




/*******************************
**      APPLICATION LOGIC     **
*******************************/
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
  $('#loading').fadeIn('fast').css({'display': 'flex'});
  var result = getMovie(clickedElement.text());
  player.cueVideoById(result.youtube, 0, 'large');
  $.get('http://www.omdbapi.com/?i='+result.imdb, function(data) {
    infoLoaded = true;
    $('.output .title').text(data.Title + ' ('+data.Year+')');
    $('.output .desc').text(data.Plot);
    $('.output .meta .genre').text(data.Genre);
    $('.output .meta .rating').text('Rating: '+ data.imdbRating + ' with ' + data.imdbVotes + ' votes');
    finishLoading();
  });

}

function finishLoading() {
  if(videoLoaded && infoLoaded) {
    $('#loading').fadeOut();
  }
}



/*******************************
**   CLICK HANDLERS & MISC    **
*******************************/
$(document).ready(function() {
  $('.offCanvas').html($('.mainNav').html());

  $('.navLink').click(function(event) {
    if($(this).parent().hasClass('offCanvas')) {
      $('.burg').click();
    }
    startLoading($(this));
  });

  $('.burg').click(function(event) {
    var offCanMenu = $('.offCanvas');
    if(offCanMenu.hasClass('out')) {
      $('.burg').removeClass('open');
      offCanMenu.animate({'left' : '-101vw'}, function(){
        $(this).removeClass('out');
      });
    } else {
      $('.burg').addClass('open');
      offCanMenu.animate({'left' : 0}, function(){
        $(this).addClass('out');
      });
    }
  });
});

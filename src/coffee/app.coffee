videoLoaded = false
infoLoaded = false
player = {}

# insert youtube api script
tag = document.createElement('script')
tag.src = 'http://www.youtube.com/iframe_api'
firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

# set up the player element, and connect it up with the API
# also create event listeners for the new player

onYouTubeIframeAPIReady = ->
  player = new YT.Player('ytplayer', {
    videoId: 'KNmk4uTZ6vI',
    events : {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })

onPlayerReady = (event) ->
  console.log "player is ready"
  firstLink = document.getElementById('first')
  startLoading(firstLink)

onPlayerStateChange = (event) ->
  if event.data == 5
    videoLoaded = true
    finishLoading()


# array of objects that contains youtube and imdb IDs
movies = [
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
]

# get the appropriate object out of the movie array using a name
# name will = the text inside of a navLink
getMovie = (name) ->
  for movie in movies
    if movie.name == name
      return movie

# begin loading video + info, and set app state to loading
startLoading = (element) ->
  console.log element
  # set the global loading values to false, since we're about to begin our loads
  videoLoaded = false
  infoLoaded = false
  # fade in the loading container, and make sure it's set to display: flex after!
  $('#loading').fadeIn('fast').css({'display': 'flex'})
  # grab the info for the movie that was clicked
  result = getMovie(element.innerText)
  console.log result
  # send the youtube id to the player from the API
  player.cueVideoById(result.youtube, 0, 'large')
  # ajax GET request to grab info based on the imdb ID
  $.get("http://www.omdbapi.com/?i=#{result.imdb}", (data) ->
    infoLoaded = true
    $('.output .title').text(data.Title + " (#{data.Year})")
    $('.output .desc').text(data.Plot)
    finishLoading()
  )

# check global loading variables, if both are true, we're done loading
finishLoading = ->
  if videoLoaded and infoLoaded
    $('#loading').fadeOut();

# addEventListeners to the nav links
navLinks = document.getElementsByClassName('.navLink')
for navLink, i in navLinks
  navLink.addEventListener('click', (event) -> startLoading(navLink))


# $(document).ready(() ->
#   $('.navLink.preset').click((event) ->
#     startLoading($(this))
#   )
# )

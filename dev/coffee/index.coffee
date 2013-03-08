_gaq = _gaq || []
_gaq.push ['_setAccount', 'UA-37161265-5']
_gaq.push ['_trackPageview']

do ->
  ga = document.createElement('script')
  ga.type = 'text/javascript'
  ga.async = true
  ga.src = (if 'https:' == document.location.protocol then 'https://ssl' else 'http://www') + '.google-analytics.com/ga.js'
  s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s)

$ ->
  btnPlay = $ '#play'
  audio = new Audio()
  time =
    timeAll: null,
    timeStop: null

  play = () ->
    audio.play()

    _gaq.push(['_trackEvent', 'Shake', 'Play']);

  stop = () ->
    audio.pause()
    audio.currentTime = 0

    _gaq.push(['_trackEvent', 'Shake', 'Stop']);

  audio.src = 'multimedia/harlem_shake.' + if navigator.userAgent.indexOf('Firefox')>0 then 'ogg' else 'm4a';
  audio.preload = "auto";
  audio.addEventListener 'loadeddata', () ->
    btnPlay.on('click', play)
    _gaq.push(['_trackEvent', 'Multimedia', 'Loaded']);

  audio.addEventListener 'play', () ->
    $('body').attr('class','status-start')
    $(audio).on 'timeupdate', () ->
      if audio.currentTime > 15.5
        $('body').attr('class','status-all')
        $(audio).off 'timeupdate'
    _gaq.push(['_trackEvent', 'Multimedia', 'Play']);

  audio.addEventListener 'error', (e) ->
    $('body').attr('class','status-ready')
    _gaq.push(['_trackEvent', 'Multimedia', 'Error', e]);

  audio.addEventListener 'pause', () ->
    $('body').attr('class','status-ready')

    _gaq.push(['_trackEvent', 'Multimedia', 'Pause']);

  audio.addEventListener 'ended', () ->
    $('body').attr('class','status-end')
    _gaq.push(['_trackEvent', 'Multimedia', 'Ended']);

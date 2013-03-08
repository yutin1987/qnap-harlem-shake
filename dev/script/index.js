// Generated by CoffeeScript 1.4.0
var _gaq;

_gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-37161265-5']);

_gaq.push(['_trackPageview']);

(function() {
  var ga, s;
  ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  s = document.getElementsByTagName('script')[0];
  return s.parentNode.insertBefore(ga, s);
})();

$(function() {
  var audio, btnPlay, play, stop, time;
  btnPlay = $('#play');
  audio = new Audio();
  time = {
    timeAll: null,
    timeStop: null
  };
  play = function() {
    audio.play();
    return _gaq.push(['_trackEvent', 'Shake', 'Play']);
  };
  stop = function() {
    audio.pause();
    audio.currentTime = 0;
    return _gaq.push(['_trackEvent', 'Shake', 'Stop']);
  };
  audio.src = 'multimedia/harlem_shake.' + (navigator.userAgent.toLowerCase().indexOf("msie") > 0 ? 'mp3' : 'ogg');
  audio.preload = "auto";
  audio.addEventListener('loadeddata', function() {
    btnPlay.on('click', play);
    $('body').attr('class', 'status-ready');
    return _gaq.push(['_trackEvent', 'Multimedia', 'Loaded']);
  });
  audio.addEventListener('play', function() {
    $('body').attr('class', 'status-start');
    $(audio).on('timeupdate', function() {
      if (audio.currentTime > 15.5) {
        $('body').attr('class', 'status-all');
        return $(audio).off('timeupdate');
      }
    });
    return _gaq.push(['_trackEvent', 'Multimedia', 'Play']);
  });
  audio.addEventListener('error', function(e) {
    $('body').attr('class', 'status-ready');
    return _gaq.push(['_trackEvent', 'Multimedia', 'Error', e]);
  });
  audio.addEventListener('pause', function() {
    $('body').attr('class', 'status-ready');
    return _gaq.push(['_trackEvent', 'Multimedia', 'Pause']);
  });
  return audio.addEventListener('ended', function() {
    $('body').attr('class', 'status-end');
    return _gaq.push(['_trackEvent', 'Multimedia', 'Ended']);
  });
});

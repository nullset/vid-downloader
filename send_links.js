function sanitize(text) {
  return text.replace(/\/|\?|:/, '');
}

var source = document.querySelector('video source');
if (source) {
  var title = sanitize(document.querySelector('.video-player-wrap .title').innerHTML.replace('Now Playing: ', ''));
  var list = document.querySelectorAll('.video-nav-list .video-nav-item');
  var number;
  for (var i = 0; i < list.length; i++) {
    var li = list[i];
    var liTitle = sanitize(li.querySelector('.title').innerHTML);
    if (liTitle === title) {
      var str = (i + 1).toString();
      number = ('000' + str).substring(str.length);
      title = number + " " + title;
    }
  }
  filename = [
    window.location.host,
    sanitize(document.querySelector('title').innerHTML),
    title + '.' + source.src.split('.').slice(-1)[0]
  ].join('/');

  title += '.' + source.src.split('.').slice(-1)[0];
  
  chrome.extension.sendMessage({
    src: source.src,
    filename: filename
  });
}


function sanitize(text) {
  return text.replace(/\/|\?|:|\<|\>/g, '');
}

function frontendmasters() {
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
    
    initiateDownload({
      src: source.src,
      filename: filename
    });
  }
}

function egghead() {
  var video = document.querySelector('video');
  var filename = [window.location.host];
  var src;
  
  if (video) {
    
    // Is it part of a series?
    var seriesTitle = document.querySelector('.series-title');
    var seriesNumber;
    if (seriesTitle) {
      filename.push(sanitize(seriesTitle.innerText));
      var lessons = document.querySelectorAll('.playlist-lessons-list > *');
      for (var i = 0; i < lessons.length; i++) {
        if (lessons[i].querySelector('.current')) {
          seriesNumber = (i + 1).toString();
          seriesNumber = ('000' + seriesNumber).substring(seriesNumber.length);
        }
      }
    }
    
    var title = sanitize(document.querySelector('title').innerText).split(' - ');
    title.pop();
    if (seriesNumber) {
      title = seriesNumber + ' ' + title.join(' - ');
    }
    filename.push(sanitize(title) + '.mp4');
    
    
    if (video.hasAttribute('src')) {
      var downloadLink = document.querySelector('.fa-download').parentNode;
      downloadLink.click();
      src = downloadLink.nextElementSibling.href;
    } else {
      src = video.querySelector('source').src;
    }
    
    initiateDownload({
      src: src,
      filename: filename.join('/')
    });
  }
}

function initiateDownload(options) {
  chrome.extension.sendMessage(options);
}

var site = window.location.host.split('.');
site.pop();

// Dynamically build the method name and call it.
window[site.join('.')]();


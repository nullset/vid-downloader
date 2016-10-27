// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

// var links = [].slice.apply(document.getElementsByTagName('a'));
// links = links.map(function(element) {
//   // Return an anchor's href attribute, stripping any URL fragment (hash '#').
//   // If the html specifies a relative path, chrome converts it to an absolute
//   // URL.
//   var href = element.href;
//   var hashIndex = href.indexOf('#');
//   if (hashIndex >= 0) {
//     href = href.substr(0, hashIndex);
//   }
//   return href;
// });
// 
// links.sort();
// 
// // Remove duplicates and invalid URLs.
// var kBadPrefix = 'javascript';
// for (var i = 0; i < links.length;) {
//   if (((i > 0) && (links[i] == links[i - 1])) ||
//       (links[i] == '') ||
//       (kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length))) {
//     links.splice(i, 1);
//   } else {
//     ++i;
//   }
// }
// 
// chrome.extension.sendRequest(links);

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
  
  chrome.extension.sendRequest({
    src: source.src,
    // filename: title
    filename: filename
  });
}


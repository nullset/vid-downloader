chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "send_links.js"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.downloads.download({
      url: request.src,
      filename: request.filename
    });
  }
);
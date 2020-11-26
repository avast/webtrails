
document.addEventListener('DOMContentLoaded', function () {

    // open a new tab with history
    chrome.windows.getCurrent(function (win) {
      chrome.tabs.create({
        'url': chrome.runtime.getURL("history.html")
      });
      window.close(); // close the Chrome extension pop-up
    });

}, false);

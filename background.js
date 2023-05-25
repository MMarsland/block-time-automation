chrome.action.onClicked.addListener(function(activeTab) {
    chrome.scripting.executeScript({
      target : {tabId : activeTab.id},
      files : [ "content.js" ],
    });
});
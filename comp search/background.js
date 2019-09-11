// Beginning background.js
//---------------------------------------%%% Rightly Extension %%%-----------------------------------------
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //find the active tab
        var activeTab = tabs[0];
        //send a message to the runtime that the browser action is clicked
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
    });
});

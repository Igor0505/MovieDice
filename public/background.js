chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "chrome://newtab" },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
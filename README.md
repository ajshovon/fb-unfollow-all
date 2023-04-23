# Unfollow All Following People From Your Facebook Profile

WARNING: This will remove everyone you follow on Facebook. So proceed with coition. This is not supposed to remove any page from the following list. Method 1 is considered safer than method 2 as it is much slower and more humane. Either way, I take no responsibility if anything happens to your account.


## REQUIREMENT: First Unsend All Sent Friend Requests

- Go to this link on Facebook (it’s a mobile site link).
    - https://m.facebook.com/friends/center/requests/outgoing/#friends_center_main

- Scroll to the very end till all requests you sent are loaded.

- Open Chrome Inspector/DevTools by right-clicking on the page anywhere and selecting Inspect or just press ⌘ + ⌥ + J on Mac for Chrome.

- Paste the following script just to unsend all and press enter
```
javascript: var inputs = document.getElementsByClassName('_54k8 _56bs _56bt');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].click();
}
```

## METHOD 1: Complex, Slower but Safer

### Requirements

- Chrome Browser
- Bulk Link Opener Chrome Extension: https://chrome.google.com/webstore/detail/bulk-url-opener-extension/hgenngnjgfkdggambccohomebieocekm
- Tab Wrangler Opener Chrome Extension: https://chrome.google.com/webstore/detail/tab-wrangler/egnjhciaieeiiohknchakcodbpgjnchh
- Violentmonkey or any user script manager: https://violentmonkey.github.io


### How to

- Goto https://www.facebook.com/{yourUserName}/following or manually by going to profile -> friends -> following
- Scroll down till the full following list is loaded. Paste this in the console.
```
const allAs = document.getElementsByTagName("a");
const arr = Array.from(allAs).map(element => element.href);
const filteredArr = arr.filter((element) => {
  return /^https:\/\/www\.facebook\.com\/((\w|\d|\_|\.)+|(profile\.php\?id=\d+))$/.test(element);
});
let uniqueFilteredArr = [...new Set(filteredArr)];
let text = uniqueFilteredArr.join("\n");
prompt("Please copy links:", text);
```
- Copy the links, keep them in a notepad

- Configure Bulk Link Opener like this:

    - Tab Creation Delay: 15
    - How to handle non-urls: Completely ignore the string

- Configure Tab Wrangler like this:
    - Close inactive tabs after:1 min 30 sec

- Open Violentmonkey and add this user script. Please enable the script only when you are automating facebook unfollow
```
// ==UserScript==
// @name        Unfollow People - Facebook
// @namespace   Violentmonkey Scripts
// @match       https://www.facebook.com/*
// @grant       none
// @version     1.0
// @run-at      document-idle
// @author      shovon668
// @description Automate unfollowing a profile in facebook
// ==/UserScript==


function getFollowSettingsBtn() {
    var xpath = "//span[text()='Following']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement;
}
function getUnfollowTab() {
    var xpath = "//span[text()='Unfollow']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement;
}

function unFlwG() {
  getFollowSettingsBtn().click()
}
// initial time to wait before going into Unfollow tab, you can tweak this considering your hardware spec and internet connection
setTimeout(unFlwG, 7000);

function unFlw() {
  getUnfollowTab().click();
}

// time to wait before start clicking Unfollow, you can tweak this considering your hardware spec and internet connection. Advised to keep it a higher value so that it is run after the unfollow tab is loaded
setTimeout(unFlw, 18000);

```

- Open bulk link opener by clicking the icon on Chrome, click Clear current links, paste the links from the notepad, click Open Links 
- Click the Tab Wrangler icon, go to Tab Lock, and lock the tab named Opening New Tabs
- Wait for it to finish. It is advised to run this in a dedicated window. You may use the internet as usual on another browser window. Do not use Facebook while running it.


## Method 2: Simple, Faster But May Not Be Safe

The original script is taken from here https://gist.github.com/renestalder/c5b77635bfbec8f94d28

It is modified to unfollow people. You may need to change the classes name in the script if it does not work as Facebook ciphers the CSS classes.

- Goto https://www.facebook.com/{yourUserName}/following or manually by going to profile -> friends -> following
- Scroll down till the full following list is loaded
- Press f12 and paste the script into the console
```
(async () => {
    var selectors = getSelectors();
    var pages = document.querySelector(selectors.followList).children;
    for (let i = 0; i < pages.length; i++) {
        try {
            // Mousedown on page (wait 500ms)
            const page = pages[i].firstChild.firstChild;
            //console.log(page);
            simulateMousedown(page);
            await wait(1500);
            // Press "Following" (wait 100s)
            document.body.querySelector(selectors.followBtn).click();
            await wait(800);
            // Press "Unfollow" (wait 800s)
			getUnfollowTab().click();
			await wait(300);
            document.body.click();
			console.log('done');
        }
        catch (error) {
            console.error(error);
        }
    }
})();
function getSelectors() {
    return {
        followList: "[class=\"x78zum5 x1q0g3np x1a02dak x1qughib\"]",
        followBtn: `[aria-label="Following"]`,
        moreActions: `[aria-label="More actions"]`,
        updateBtn: `[aria-label="Update"]`,
    };
}
function simulateMousedown(targetNode) {
    function triggerMouseEvent(targetNode, eventType) {
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent(eventType, true, true);
        targetNode.dispatchEvent(clickEvent);
    }
    ["mouseover", "mousedown"].forEach(function (eventType) {
        triggerMouseEvent(targetNode, eventType);
    });
}
function getFollowSettingsBtn() {
    var xpath = "//span[text()='Following']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement;
}
function getUnfollowTab() {
    var xpath = "//span[text()='Unfollow']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement;
}
async function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, milliseconds);
    });
}
```
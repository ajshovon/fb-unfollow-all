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
// initial time to wait before going into Unfollow tab, you tweak this considering your hardware spec and internet connection
setTimeout(unFlwG, 7000);

function unFlw() {
  getUnfollowTab().click();
}

// time to wait before start clicking Unfollow, you tweak this considering your hardware spec and internet connection. Advised to keep it a higher value so that it is run after the unfollow tab is loaded
setTimeout(unFlw, 18000);

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
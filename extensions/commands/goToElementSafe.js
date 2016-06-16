'use strict';

/**
 * Wait while element is visible and click on it
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .goToElementSafe('#selector')
 * };
 *
 *
 * @method goToElementSafe
 * @param {string} selector The selector used to locate the element.
 * @api commands
 */

var goToElementSafe = function(selector) {
    this.waitForElementVisible(selector, function(result) {
        if(result.value) {
            this
                .moveToElement(selector, 10, 10)
                .click(selector);
        }
    });
};

exports.command = goToElementSafe;

'use strict';

/**
 * Waits for an element to be present, not present, visible or not visible and it's defaulted
 * to log a failure but continue on with test execution
 * @example
 * this.demoTest = function (browser) {
 *      return browser.waitForElement('#selector', 'visible', false, function(){});
 * };
 *
 *
 * this.demoTest = function (browser) {
 *      return browser.waitForElement('#selector', 'visible');
 * };
 *
 *
 * @method waitForElement
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {string} expected - What the element is expected to be (present, not present, visible, not visible)
 * @param {boolean} failTest - Continue the test or fail it when an element is not found
 * @param {callback) callback - Optional callback function to be called when the command finishes.
 * @api commands
 */

var waitForElement = function(selector, expected, failTest, callback) {

    failTest = failTest || false;

    //this.element(selector)

    switch (expected) {
        case 'present':
            return this.waitForElementPresent(selector, this.globals.waitForConditionTimeout, failTest, callback);
        case 'not present':
            return this.waitForElementNotPresent(selector, this.globals.waitForConditionTimeout, failTest, callback);
        case 'visible':
            return this.waitForElementVisible(selector, this.globals.waitForConditionTimeout, failTest, callback);
        case 'not visible':
            return this.waitForElementNotVisible(selector, this.globals.waitForConditionTimeout, failTest, callback);
    }
};

exports.command = waitForElement;


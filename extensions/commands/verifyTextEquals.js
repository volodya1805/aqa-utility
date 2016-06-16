'use strict';

var util = require('util');

/**
 * Verify the text from an element on the page matches the expected text
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.verifyTextEquals('#selector', expected);
 * };
 *
 *
 * @method verifyTextEquals
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {string} expected - The Expected text to be compared
 * @api commands
 */

var verifyTextEquals = function(selector, expected) {
    this.waitForElement(selector, 'visible', false, function() {
        this.getText(selector, function (result) {
            var actual = result.value;
            var msg = null;
            if(actual === expected){
                msg = util.format('Actual value %s is equal to expected value %s', actual, expected);
                return this.verify.equal(actual, expected, msg);
            }
            else{
                msg = util.format('Actual value %s is not equal to expected value %s', actual, expected);
                return this.verify.ok(actual === expected, msg);
            }
        });
    });
};

exports.command = verifyTextEquals;

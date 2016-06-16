'use strict';

/**
 * Asserts if an element is visble on the page
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .assertElementVisible('#selector');
 * };
 *
 *
 * @method assertElementVisible
 * @param {string} selector - The selector used to locate the element.
 * @api commands
 */

exports.command = function(selector) {
    this.assert.visible(selector);
};

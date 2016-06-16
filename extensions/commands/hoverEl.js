'use strict';

/**
 * Move cursor to a specified element
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .hoverEl('#selector'); or .hover('#selector', 10,10);
 * };
 *
 *
 * @method hover
 * @param {string} selector The selector used to locate the element.
 * @param {int} x - x-axis of where should the cursor go.
 * @param {int} y - y-axis of where should the cursor go.
 * @api commands - this command can be chained
 */

exports.command = function(selector, x, y, callback) {
    x = x || 0;
    y = y || 0;
    return this.moveToElement(selector, x, y, callback);
};

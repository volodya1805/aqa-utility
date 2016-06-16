'use strict';

/**
 * Simulates a scroll on a window through x and y axis.
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .scrollTo(0, 3000);
 * };
 *
 *
 * @method assertElementVisible
 * @param {int} x - X axis to scroll to.
 * @param {int} y - Y axis to scroll to.
 * @api commands
 */

exports.command = function(x, y) {
    return this.execute('scrollTo(' + x + ' , ' + y + ')');
};


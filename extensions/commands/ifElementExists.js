'use strict';

/**
 * Check if element exists by specified selector
 *
 * @example
 *  browser.ifElementExists(searchStrategy.byClassName, '#selector', function (isExists) {
 *      if(isExists) {
 *          browser.getText("#main ul li a.first", function(result) {
 *               this.assert.equal(result.value, "nightwatchjs.org");
 *          });
 *      }
 *  });
 *
 *
 *
 * @method ifElementExists
 * @param {string} searchStrategy The search strategy how to locate the element.
 * @param {string} selector The selector used to locate the element.
 * @param {function} [callback] Callback function to be called when the command finishes.
 * @api commands
 */

var ifElementExists = function(searchStrategy, selector, callback) {
    var self = this;

    this.element(searchStrategy, selector, function (result) {
        if (typeof callback === 'function') {
            callback.call(self, result.status != -1);
        }
    });
    return this; // allows the command to be chained.
};

exports.command = ifElementExists;

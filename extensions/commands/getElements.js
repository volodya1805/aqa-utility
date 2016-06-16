'use strict';

/**
 * Get list of elements by specified selector
 *
 * @example
 *  browser.getElements(searchStrategy.byClassName, '#selector', function (result) {
 *      this.assert.equal(result.value.length, 10);
 *  });
 *
 *
 *
 * @method getElements
 * @param {string} searchStrategy The search strategy how to locate the element.
 * @param {string} selector The selector used to locate the element.
 * @param {function} [callback] Callback function to be called when the command finishes.
 * @api commands
 */

var getElements = function(searchStrategy, selector, callback) {
    var self = this;
    this.elements(searchStrategy, selector, function (result) {
        if (typeof callback === 'function') {
            callback.call(self, result);
        }
    });
    return this; // allows the command to be chained.
};

exports.command = getElements;


'use strict';

/**
 * Fetches requests from window.performance for use in testing.
 *
 * @example
 *  browser.getRequests(function (results) {
 *      console.log(results);
 *  });
 *
 *
 *
 * @method getRequests
 * @param {function} [callback] Callback function to be called when the command finishes.
 * @api commands
 */

var getRequests = function(callback) {
    var self = this;
    this.execute(
        function() { // execute application specific code
            return window.performance.getEntries();
        },

        [], // arguments array to be passed

        function(result) {
            if (typeof callback === 'function') {
                callback.call(self, result);
            }
        }
    );
    return this;
};

exports.command = getRequests;

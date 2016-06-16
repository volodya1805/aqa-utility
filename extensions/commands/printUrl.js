'use strict';

/**
 * NOTE - Parameter is passed because of a nightwatch issue where if a param isn't passed to custom command
 * it throws a toString Error.
 *
 * Print current URL to console.
 *
 *
 *
 * @example
 * this.printURl();
 *
 * @method printUrl
 */

var printUrl = function(self) {

    self.url(function(urlResult){
        console.log(urlResult);
        console.log('Current URL = ' + urlResult.value);
    });
    return self;
};
exports.command = printUrl;

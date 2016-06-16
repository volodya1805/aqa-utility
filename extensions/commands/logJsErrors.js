'use strict';

/**
 * Logs javascript errors messages
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .logJsErrors();
 * };
 *
 *
 * @method logJsErrors
 * @api commands
 */

var logJsErrors = function () {
    this.sessionLog('browser', function (result) {
        //console.log(result);
        var severeFound = false;
        for (var index in result.value) {
            var error = result.value[index];
            if (error.level === 'SEVERE') {
                severeFound = true;
                console.log('Logging Javsacript Error: ');
                this.verify.ok(false, error.message);
            }
        }
        if (severeFound) {
            this.url(function (urlResult) {
                console.log('Javascript errors were detected on: ' + urlResult.value);
            });
        }
        return this;
    });
};

exports.command = logJsErrors;

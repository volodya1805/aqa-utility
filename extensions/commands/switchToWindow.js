'use strict';

/**
 * Change focus to another window.
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .switchToWindow(0);
 * };
 *
 *
 * @method switchToWindow
 * @param {int} windowNumber The window number to change focus.
 * @api commands
 */

var switchToWindow = function(windowNumber) {
    var browser = this;

    browser.windowHandles(function(result) {
        var numOfWindows = result.value.length;

        if(result.value.length > windowNumber){
            this.verify.ok(true, 'PASS - # of windows ' + numOfWindows + ' is greater than selected window number ' + windowNumber);
            browser.switchWindow(result.value[windowNumber]);
        }
        else{
            this.verify.ok(false, 'FAIL - # of windows ' + numOfWindows + ' is less than selected window number ' + windowNumber);
        }
    });

    return browser;
};

exports.command = switchToWindow;

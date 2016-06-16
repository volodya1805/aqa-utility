'use strict';

var util = require('util');
var events = require('events');

var modules = require('../../../../modules');
var actions = modules.actionType;


/**
 * This custom command allows to locate an HTML element on the page and then wait until the value of a specified
 * attribute/text matches the provided expression. It retries executing the checker function
 * every 100ms until either it evaluates to true or it reaches maxTimeInMilliseconds (which fails the test).
 *
 * This can be helpful when a JS event changes the content of a page
 * but the DOM structure remains largely the same.
 *
 * @example
 *     browser.waitFor("#section-footer", "data-section", actionType.attribute, function(section) {
 *            return section === "footer";
 *      });
 *
 *      browser.waitFor("#section-title", "", actionType.text, function(section) {
 *            return section === "NFL";
 *      });
 *      it will compare the url passed in to the url on the browser
 *      browser.waitFor('', 'http://newUrl.com', actionType.url, function (result) {
 *          return result === 'http://newUrl.com';
 *      });
 *
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {String} value - attribute/text to be checked
 * @param {String} actionType - attribute / text
 * @param {Function} checker - function that must return true if the attribute matches, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 */

function WaitFor() {
    events.EventEmitter.call(this);
    this.startTimeInMilliseconds = null;
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = function (element, value, actionType, checker, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();

    if (typeof timeoutInMilliseconds !== 'number') {
        timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

    var self = this;
    var message;

    this.check(element, value, checker, actionType, function (result, loadedTimeInMilliseconds) {
        if (result) {
            message = 'waitFor: ' + element + '@' + value + '. Expression was true after ' + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + ' ms.';
        } else {
            message = 'waitFor: ' + element + '@' + value + '. Expression wasn\'t true in ' + timeoutInMilliseconds + ' ms.';
        }
        self.client.assertion(result, 'expression false', 'expression true', message, true);
        self.emit('complete');
    }, timeoutInMilliseconds);

    return this;
};

WaitFor.prototype.run = function (element, value, type, callback) {
    var self = this;

    switch (type) {
        case actions.text:
            this.api.getText(element, function (result) {
                if (typeof callback === 'function') {
                    callback.call(self, result);
                }
            });
            break;
        case actions.attribute:
            this.api.getAttribute(element, value, function (result) {
                if (typeof callback === 'function') {
                    callback.call(self, result);
                }
            });
            break;
        case actions.url:
            this.api.url(function (result) {
                if (typeof callback === 'function') {
                    callback.call(self, result);
                }
            });
            break;
    }
};

WaitFor.prototype.check = function (element, value, checker, actionType, callback, maxTimeInMilliseconds) {
    var self = this;
    this.run(element, value, actionType, function (result) {
        var now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
            callback(true, now);
        } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
            setTimeout(function () {
                self.check(element, value, checker, actionType, callback, maxTimeInMilliseconds);
            }, this.api.globals.waitForConditionTimeout);
        } else {
            callback(false);
        }
    });
};

module.exports = WaitFor;

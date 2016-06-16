'use strict';

var util = require('util'),
    events = require('events');

/**
 * Suspends the test for the given time in milliseconds while waiting for specified condition to complete.
 *
 * @example
 * this.demoTest = function (browser) {
 *   return client.waitForCondition('return someFunction();', 5000, function(result) {
 *       console.log(result)
 *   });
 * };
 *
 *
 * @method waitForCondition
 * @param {condition} condition Condition need to run and gets result.
 * @param {boolean} assert The boolean value if you want to run an assertion or not
 * @param {number} timeout Timeout out while waiting for condition after.
 * @param {string} messages Custom message.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

var waitForCondition = function() {
    events.EventEmitter.call(this);
    this.startTimer = null;
    this.cb = null;
    this.ms = null;
    this.selector = null;
    this.protocol = require('nightwatch/lib/api/protocol.js')(this.client);
};

util.inherits(waitForCondition, events.EventEmitter);

waitForCondition.prototype.command = function(condition, assert, timeout, messages, callback) {

    var milliseconds = this.api.globals.retryAssertionTimeout;

    var lastArgument = Array.prototype.slice.call(arguments, 0).pop();
    if (typeof (lastArgument) === 'function') {
        callback = lastArgument;
    }

    if (!messages || typeof messages !== 'object') {
        messages = {
            success: 'Condition was satisfied after ',
            timeout: 'Timed out while waiting for condition after '
        };
    }

    timeout = timeout && typeof (timeout) !== 'function' && typeof (timeout) !== 'object' ? timeout : 0;
    this.startTimer = new Date().getTime();
    this.cb = callback || function() {
        };
    this.ms = milliseconds || 1000;
    this.timeout = timeout;
    this.condition = condition;
    this.messages = messages;
    this.check(condition, assert);
    return this;
};

waitForCondition.prototype.run = function (condition, callback) {
    callback(condition);
};

waitForCondition.prototype.check = function(condition, assert) {
    var self = this;

    self.run(condition, function(result) {
        var now = new Date().getTime();
        if (result) {
            setTimeout(function() {
                var msg = self.messages.success + (now - self.startTimer) + ' milliseconds.';
                self.cb.call(self.client.api, result);
                self.client.assertion(true, !!result, false, msg, false);
                return self.emit('complete');
            }, self.timeout);
        } else if (now - self.startTimer < self.ms) {
            setTimeout(function() {
                self.check(condition, assert);
            }, 500);
        } else {
            var msg = self.messages.timeout + self.ms + ' milliseconds.';
            self.cb.call(self.client.api, false);
            if(assert){
                self.client.assertion(false, false, false, msg, false);
            }
            return self.emit('complete');
        }
    });
};

module.exports = waitForCondition;


'use strict';

var util = require('util');
var modules = require('../../../../modules');
var strings = modules.strings;

/**
 * Checks is a script is available
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .checkScriptEl('//player.foxneodigital.com/sports', 'present');
 * };
 *
 *
 * @method
 * @param {string} fileNameKey - script element to check
 * @param {string} expectation - Expectation could be either 'present' or `not present`
 * @param {string} msg - Additional message to display when testing
 * @api commands
 */


var checkScript = function (fileNameKey, expectation, msg) {

    var MSG = strings.checkForScriptMessage;
    expectation = expectation || 'present';

    this.message = msg || util.format(MSG + expectation, fileNameKey);
    this.expected = fileNameKey;

    this.command = function (callback) {
        switch (expectation) {
            case 'present':
                return this.api.waitForElementPresent('script[src*="' + fileNameKey + '"]', callback);
            case 'not present':
                return this.api.waitForElementNotPresent('script[src*="' + fileNameKey + '"]', callback);
        }
    };

    this.value = function (result) {
        return result.value;
    };

    this.pass = function (value) {
        return value != null;
    };
};

exports.assertion = checkScript;

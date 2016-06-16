'use strict';

var util = require('util');
var modules = require('../../../../modules');
var strings = modules.strings;

/**
 * Checks if the given selector is present the expected number of times.
 *
 * @example
 *    this.demoTest = function () {
 *      browser.assert.elementsCount('#article-item', 10);
 *    };
 *
 *
 * @method elementsCount
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} attribute The attribute name
 * @param {string} expected The expected value of the attribute to check.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var elementsCount = function(selector, expected, msg) {

    var MSG_ELEMENT_NOT_FOUND = strings.countMessageString;

    this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, expected);

    this.expected = function() {
        return expected;
    };

    this.pass = function(value) {
        return value == expected;
    };

    this.failure = function(result) {
        var failed = result === false || result && result.status === -1;
        if (failed) {
            this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, expected);
        }
        return failed;
    };

    this.value = function(result) {
        return result.value.length;
    };

    this.command = function(callback) {
        return this.api.elements('css selector', selector, callback);
    };
};

exports.assertion = elementsCount;

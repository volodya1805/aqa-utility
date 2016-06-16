'use strict';

var util = require('util');
var modules = require('../../../../modules');
var strings = modules.strings;

/**
 * Assert that the url matches the regex provided
 *
 *     browser
 *         .url("http://www.google.com")
 *         .assert.urlMatch(/\.com$/)
 *
 * @method urlMatch
 * @param {RegExp} regex - regular expression
 * @param {String} [msg] - output to identify the assertion
 */

var urlMatch = function(regex, msg) {

    var MSG_URL_MATCH = strings.urlAssertMessageString;

    this.message = msg || util.format(MSG_URL_MATCH, regex);
    this.expected = regex;

    this.pass = function(value) {
        return this.expected.test(value);
    };

    this.value = function(result) {
        return result.value;
    };

    this.command = function(callback) {
        return this.api.url(callback);
    };
};

exports.assertion = urlMatch;

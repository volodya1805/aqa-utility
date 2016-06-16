'use strict';

var urlParser = require('url');

/**
 * Custom assertion to test if an analytics request has been made.  Follows
 * the same pattern used for manual testing - define a filter to find the
 * appropriate request and then check to make sure that the parameters
 * are set properly.  Returns true if ANY request matches criteria.
 *
 * @exmaple
 * this.demoTest = function (browser) {
 *   browser
 *      .assert.hasRequest('http://static.fox.com');
 * };
 *
 * @param filter - A string to filter against URL requests for the page.
 * @param params - An object of parameters to match against the request.
 *
 */

var hasRequest = function(filter) {
    ///**
    // * The message which will be used in the test output and
    // * inside the XML reports
    // * @type {string}
    // */
    this.message = 'Checking for request';

    ///**
    // * A value to perform the assertion on. If a function is
    // * defined, its result will be used.
    // * @type {function|*}
    // */
    this.expected = (function(){
        return 'a request matching ' + filter + ' exists';
    })();

    ///**
    // * Pass message handler.
    // * @param result
    // */
    this.pass = function(result) {
        return result != 'no matching records';
    };

    ///**
    // * Process result of command and return a value to the pass function.
    // * @param result The value returned from the command function.
    // * @returns {string} the first matching record or 'no matching records'
    // */
    this.value = function(result) {
        var records = result.value;
        for (var i = 0; i < records.length; i++) {
            var urlObject = urlParser.parse(records[i].name, true);
            if(urlObject.href.indexOf(filter) >= 0){
                var passed = true;
                // Check all params exist and match what's in the url.
                if(passed){
                    return records[i].name;
                }
            }
        }
        //No record found
        return 'no matching records';
    };

    ///**
    // * Performs a protocol command/action and its result is
    // * passed to the value method via the callback argument.
    // * @type {function}
    // */
    this.command = function(callback) {
        this.api.getRequests(callback);
        return this;
    };
};

exports.command = hasRequest;

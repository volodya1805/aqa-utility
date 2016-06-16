'use strict';

var fs = require('fs');

/**
 * Save source of current page
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .htmlCapture('register.html');
 * };
 *
 *
 * @method htmlCapture
 * @param {string} filename The file name with hml source.
 * @api commands
 */

var htmlCapture = function(fileName) {
    if (fileName && typeof fileName !== 'string') {
        throw new Error('htmlCapture expects first parameter to be string; ' + typeof (fileName) + ' given');
    }

    var htmlCheck = /^\w+\.html$/;

    if (!htmlCheck.test(fileName)) {
        throw new Error('htmlCapture expects first parameter to be camelCased alphanumeric string ending with ".html"');
    }

    var filePath = './fixtures/' + this.currentTest.module + '-';
    var fileLocation = filePath + fileName;

    var messages = {
        success: 'Wrote HTML fixture to ' + fileLocation + ' after ',
        failure: 'Failed to write HTML fixture after '
    };

    this.source(function(result) {
        fs.writeFile(fileLocation, result.value, function(error) {
            if (error) {
                console.error('Write error: ' + error.message);
            } else {
                console.log('Successful write to ' + messages.success);
            }
        });
    });
};

exports.command = htmlCapture;

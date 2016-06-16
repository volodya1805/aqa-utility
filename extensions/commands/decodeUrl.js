'use strict';

/**
 * This method will get you the parameter value you specify and decode it.
 *
 * @example
 * this.demoTest = function (browser) {
 *      browser.decodeUrl('encodedUrl', 'pageName', function(result){
 *          console.log(result);
 *      });
 * };
 *
 *
 * @method decodeUrl
 * @param {string} url - The selector (CSS / Xpath) used to locate the element
 * @param {string} name - Which method to use to locate the element
 * @param {function} callback - callback function will output the result if found
 */

var decodeUrl = function (url, name, callback) {
    this.execute(function (nUrl, nName) {
        return decodeURIComponent((new RegExp('[?|&]' + nName + '=' + '([^&;]+?)(&|#|;|$)').exec(nUrl) || [, ''])[1].replace(/\+/g, '%20')) || null;
    }, [url, name], function (result) {
        callback(result.value);
    });
    return this;
};

exports.command = decodeUrl;

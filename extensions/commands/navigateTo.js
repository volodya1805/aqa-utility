'use strict';

/**
 * The method will navigate to the specified url
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.navigateTo('http://www.foxsports.com/');
 * };
 *
 *
 * @method navigateTo
 * @param {string} url - The url you want to navigate to
 * @api commands
 */

var navigateTo = function(url) {
    url = url || this.launchUrl + (this.globals.disableAd ? '?ads=disabled' : '');
    return this.url(url);
};

exports.command = navigateTo;

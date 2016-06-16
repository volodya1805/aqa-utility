'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

/**
 * This is a method returns the reference ids of a selector which returns > 1 elements.
 * Once you get the ids, you can use any of the selenium protocol methods on the nightwatch api
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.getElementRefIds(strings.yardbarkerLinks, function(result) { console.log(result) });
 * };
 *
 *
 * @method getElementRefIds
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 */

var getElementsRefIds = function (selector, callback) {
    var wd = this;
    var searchMethod = searchStrategy.byClassName;
    wd.waitForElementPresent(selector, function() {
        wd.getElements(searchMethod, selector, function (result) {
            if (result.value !== 'undefined' || result.value !== null) {
                result.value.forEach(function (item) {
                    var obj = {};
                    obj.id = item.ELEMENT;
                    obj.length = result.value.length;
                    callback(obj);
                });
            }
        });
    });
};
//make two of them one for id and one for values
exports.command = getElementsRefIds;

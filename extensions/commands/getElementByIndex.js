'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

/**
 * This is a method to be used when a selector return multiple elements
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.(strings.yardbarkerLinks, 'class', 'font-family', function(result) { console.log(result) });
 * };
 *
 *
 * @method getElementValue
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 */

var getElementByIndex = function (selector, index, callback) {
    var wd = this;
    var searchMethod = searchStrategy.byClassName;
    wd.waitForElement(selector, 'visible', false, function () {
        wd.getElements(searchMethod, selector, function (result) {
            callback(result.value[index].ELEMENT);
        });
    });
};

exports.command = getElementByIndex;

 'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

/**
 * This is a method to be used when a selector return multiple elements and return id(s) of the specified attribute value
 *
 * @example
 * this.demoTest = function (browser) {
 *      browser.getElementIdByAttributeValue('.yBThumbnailContainer > div > div > a', 'href', 'yardbaker', function(result) {
            console.log(result);
        });
 * };
 *
 *
 * @method getElementValue
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {string} value - The attribute type, 'class', 'href', 'src', etc.
 * @param {string} expected - Expected value the attribute should have
 * @param {function} callback - function which will return the ids related to the search criteria
 */

var getElementIdByAttributeValue = function (selector, value, expected, callback) {
    var wd = this;
    var searchMethod = searchStrategy.byClassName;
    //ar refIds = [];
    wd.waitForElement(selector, 'visible', false, function () {
        wd.getElements(searchMethod, selector, function (result) {
            if (value === null) {
                callback(result.value);
            }
            else {
                result.value.forEach(function (item) {
                    wd.elementIdAttribute(item.ELEMENT, value, function (attResult) {
                        if (attResult.value.indexOf(expected) >= 0) {
                            callback(item.ELEMENT);
                        }
                    });
                });
            }
        });
    });
};
//make two of them one for id and one for values
exports.command = getElementIdByAttributeValue;

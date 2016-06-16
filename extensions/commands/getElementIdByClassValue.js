 'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

 /**
  * This is a method to be used when a selector return multiple elements and return id(s) of the specified class value
  *
  * @example
  * this.demoTest = function (browser) {
  *  wd.getElementIdByClassValue('.yBThumbnailContainer > div > div > a > span', 'font-size', '10px', function(result) {
  *        console.log('found: '+result);
  *     });
  * };
  *
  *
  * @method getElementValue
  * @param {string} selector - The selector (CSS / Xpath) used to locate the element
  * @param {string} value - The class type, 'font-size', 'color', etc.
  * @param {string} expected - Expected value the attribute should have
  * @param {function} callback - function which will return the ids related to the search criteria
  */

var getElementIdByClassValue = function (selector, value, expected, callback) {
    var wd = this;
    var searchMethod = searchStrategy.byClassName;
     wd.waitForElementPresent(selector, function () {
         wd.getElements(searchMethod, selector, function (result) {
             if (value === null) {
                 callback(result.value);
             }
             else {
                 result.value.forEach(function (item) {
                     wd.elementIdCssProperty(item.ELEMENT, value, function (prResult) {
                         if (prResult.value.indexOf(expected) >= 0) {
                             callback(item.ELEMENT);
                         }
                     });
                 });
             }
         });
     });
};
//make two of them one for id and one for values
exports.command = getElementIdByClassValue;

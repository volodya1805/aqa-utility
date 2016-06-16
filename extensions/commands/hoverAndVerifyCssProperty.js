'use strict';

var modules = require('../../../../modules');
var condition = modules.conditionType;

/**
 * Hover over an element or elements and select one randomly to verify its CSS property
 *
 * @example
 *  browser.hoverAndVerifyCssProperty(searchStrategy.byClassName, #selector, 'color', 'colorValue');
 *
 *
 *
 * @method getElements
 * @param {string} searchType - The search strategy how to locate the element.
 * @param {string} selector - The selector used to locate the element.
 * @param {string} property - The CSS property you would like to verify
 * @param {string} expectedValue -  The expected value the css property should have
 * @param {function} [callback] Callback function to be called when the command finishes.
 * @api commands
 */


var hoverAndVerifyCssProperty = function (searchType, selector, property, expectedValue) {
    var wd = this;
    var hoverAndVerify = function(el){
        wd.getElements(searchType, el, function (result) {
            var element = null;
            var rand = Math.floor(Math.random() * result.value.length);
            element = result.value[rand].ELEMENT;
            wd.moveTo(element, 0, 0, function () {
                wd.elementIdCssProperty(element, property, function (attrResult) {
                    wd.verifyCondition(condition.equal, attrResult.value, expectedValue);
                });
            });
            return this;
        });
    };
    if(selector.indexOf(',') > -1){
        var selectors = selector.split(',');
        for(var i in selectors){
            hoverAndVerify(selectors[i]);
        }
    }
    else{
        hoverAndVerify(selector);
    }
};

exports.command = hoverAndVerifyCssProperty;

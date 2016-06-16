'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;
var property = modules.property;

/**
 * This method gets all padding css properties in the following orde - padding-top, padding-right, padding-left and padding-bottom
 *
 * @example
 *     wd.getPaddingProperties(selector, function(result) {
 *          wd.verifyCondition(condition.equal, padding, result);
 *     });
 *
 *
 * @method getPaddingProperties
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {function} callback - Which method to use to locate the element
 */

var getPaddingProperties = function(selector, callback) {
    var wd = this;
    var paddingValue = '';
    wd.getElements(searchStrategy.byClassName, selector, function(result){
        var rand = (result.value.length > 1) ? Math.floor(Math.random() * result.value.length) : 0;
        var el = result.value[rand].ELEMENT;
        var properties = [property.paddingTop, property.paddingRight, property.paddingLeft, property.paddingBottom];
        properties.forEach(function(item, index){
            wd.elementIdCssProperty(el, item, function (attrResult) {
                paddingValue += attrResult.value + ' ';
                if(index == properties.length - 1){
                    paddingValue = paddingValue.trim();
                    callback(paddingValue);
                    paddingValue = '';
                }
            });
        });

    });

    return wd;
};

exports.command = getPaddingProperties;

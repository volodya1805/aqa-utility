'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

/**
 * Alternative click, if the element does not exist, it will not perform the click command. Otherwise, it will.
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.altClick('#selector');
 * };
 *
 *
 * @method altClick
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {string} searchStrategy - Which method to use to locate the element
 */

var altClick = function(selector, searchMethod) {

    searchMethod = searchMethod || searchStrategy.byClassName;
    this.element(searchMethod, selector, function(result){
        if(result.status === 0){
            this.elementIdClick(result.value.ELEMENT);
        }
    });
};

exports.command = altClick;

'use strict';

/**
 * Go to random element from the list by specified selector
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .goToRandomElement(searchStrategy.byClassName, '#selector')
 * };
 *
 *
 * @method goToRandomElement
 * @param {string} searchStrategy The search strategy how to locate the element.
 * @param {string} selector The selector used to locate the element.
 * @api commands
 */

var goToRandomElement = function(searchStrategy, selector) {
    this.waitForElementPresent(selector).elements(searchStrategy, selector, function (result) {
            var rand = Math.floor(Math.random() * result.value.length);
            var el = result.value[rand].ELEMENT;
            this.moveTo(el, 0, 0).elementIdClick(el);
    });
    return this; // allows the command to be chained.
};

exports.command = goToRandomElement;

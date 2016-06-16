'use strict';

/**
 * Selects a dropdown option
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .selectDropdownOption('#selector', 'Scores');
 * };
 *
 *
 * @method assertElementVisible
 * @param {string} selector - The selector used to locate the element.
 * @param {string} option - The text of the option to be selected.
 * @api commands
 */

exports.command = function(selector, option) {
    this.click(selector, function() {
        var el = '//option[text()="' + option + '"]';
        this.useXpath().waitForElementVisible(el).click(el);
    });
    return this;
};

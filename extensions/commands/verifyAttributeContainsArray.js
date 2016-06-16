'use strict';

var modules = require('../../../../modules');
var searchStrategy = modules.searchStrategy;

/**
 * Verify the text from an element on the page matches the expected text
 *
 * @example
 * this.demoTest = function (browser) { return
 * verifyAttributeContainsArray('#selector', attribute, expected); };
 *
 * @method verifyAttributeContainsArray
 * @param {string}
 *            selector - The selector (CSS / Xpath) used to locate the element
 * @param {string}
 *            attribute - The attribute that will be accessed
 * @param {string}
 *            expected - The Expected text to be compared
 * @param {string}
 *            attribute2 - Optional additional attribute
 * @param {string}
 *            expected2 - Optional expected value for additional attribute
 *
 * @api commands
 */

var verifyAttributeContainsArray = function(selector, attribute, expected, attribute2, expected2) {
	this.getElements(searchStrategy.byTagName, selector, function(result) {
		var i = 0;
		var wd = this;
		var verifyElementContains = function(element) {
			if(attribute2 != null && expected2 != null) {
				wd.elementIdAttribute(element, attribute2, function(result3) {
					if(result3.value.indexOf(expected2) > -1) {
						wd.elementIdAttribute(element, attribute, function(result2) {
							this.verify.equal(true, result2.value.indexOf(expected) > -1, 'Checking if ' + selector + ' with attribute ' + attribute + ' contains : ' + expected);
						});
					}
				});
			} else {
				wd.elementIdAttribute(element, attribute, function(result2) {
					this.verify.equal(true, result2.value.indexOf(expected) > -1, 'Checking if ' + selector + ' with attribute ' + attribute + ' contains : ' + expected);
				});
			}
        };
		for (i = 0; i < result.value.length; i++) {
			verifyElementContains(result.value[i].ELEMENT);
		}
	});
};

exports.command = verifyAttributeContainsArray;

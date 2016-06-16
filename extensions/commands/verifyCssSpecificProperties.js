'use strict';

/**
 * This method gets the following verifies css properties by either passing one or 4 NONE in between and verify the properties match
 *
 * @example
 *  wd.verifyCssSpecificProperties(selector, cssPropertiesArray, expectation);
 *
 * @method getBorderProperties
 * @param {string} selector - The selector (CSS / Xpath) used to locate the element
 * @param {array} properties - array of css properties to pass
 * @param {string} expected - expected text
 */

var verifyCssSpecificProperties = function (selector, properties, expected) {
    var wd = this;
    var cssProperties = properties;
    var cssValue = '';
    var expectedArr = (expected.indexOf('(') >= 0) ? expected : expected.split(' ');
    if (cssProperties.length < 4) {
        wd.verify.ok(false, 'Four css properties need to be passed on the "properties" param');
    }
    else {
        wd.waitForElementVisible(selector);
        if (!(expectedArr instanceof Array)) {
            cssProperties.forEach(function (item) {
                wd.getCssProperty(selector, item, function (result) {
                    wd.verify.ok(result.value == expected, 'Testing if ' + item + ' expected value: ' + expected + ' matches: ' + result.value);
                });
            });
        }
        else if (expectedArr.length == 1) {
            cssProperties.forEach(function (item) {
                wd.getCssProperty(selector, item, function (result) {
                    wd.verify.ok(result.value == expected, 'Testing if ' + item + ' expected value: ' + expected + ' matches: ' + result.value);
                });
            });
        }
        else {
            cssProperties.forEach(function (item, index) {
                wd.getCssProperty(selector, item, function (result) {
                    cssValue += result.value + ' ';
                    if (index == cssProperties.length - 1) {
                        cssValue = cssValue.trim();
                        wd.verify.ok(cssValue == expected, 'Testing if expected value: ' + expected + ' matches: ' + cssValue);
                    }
                });
            });
        }
    }

};

exports.command = verifyCssSpecificProperties;

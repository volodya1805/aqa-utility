'use strict';

var util = require('util');
var modules = require('../../../../modules');
var conditions = modules.conditionType;

/**
 * Compares two values and outputs a result
 * var modules = require('../../modules');
 * var conditions = modules.conditionType;
 *
 * @example
 * this.demoTest = function (browser) {
 *      return browser.verifyCondition(conditions.equal, actual, expected);
 * };
 *
 * this.demoTest = function (browser) {
 *      return browser.verifyCondition(conditions.notEqual, actual, expected);
 * };
 *
 *
 * @method verifyEquals
 * @param {enum} condition type - condition the method will run
 * @param {actual} - actual value
 * @param {expected} - expected value
 * @param {sucessMsg} - custom success message
 * @param {failMsg} - custom failed message
 * @api commands
 */

var verifyCondition = function(conditionType, actual, expected, successMsg, failMsg) {

    var msg1 = successMsg || util.format('Actual value %s is equal to expected value %s', actual, expected);
    var msg2 = failMsg || util.format('Actual value %s is not equal to expected value %s', actual, expected);
    var msg = null;
    switch (conditionType) {
        case conditions.equal:
            if(actual === expected) {
                msg = msg1;
                return this.verify.equal(actual, expected, msg);
            }
            else {
                msg = msg2;
                return this.verify.ok(false, msg);
            }
            break;
        case conditions.notEqual:
            if(actual !== expected) {
                msg = successMsg || msg2;
                return this.verify.notEqual(actual, expected, msg);
            }
            else {
                msg = failMsg || msg1;
                return this.verify.ok(false, msg);
            }
            break;
        case conditions.contains:
            if(actual.indexOf(expected) > -1){
                msg = util.format('Actual value %s contains the expected value %s', actual, expected);
                return this.verify.ok(true, msg);
            }
            else{
                msg = util.format('Actual value %s does not contains the expected value %s', actual, expected);
                return this.verify.ok(false, msg);
            }
            break;
        default:
            return this.verify.ok(false, 'Unsupported condition Type');

    }
};

exports.command = verifyCondition;

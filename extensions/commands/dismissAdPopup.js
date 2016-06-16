'use strict';


var modules = require('../../../../modules');
var strings = modules.strings;
var searchStrategy = modules.searchStrategy;
var status = modules.status;

/**
 * Close AD popup in case it appears
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser
 *      .dismissAdPopup();
 *
 * };
 *
 * @method dismissAdPopup
 * @api commands
 */

var dismissAdPopup = function() {
    var self = this;
    this.element(searchStrategy.byClassName, strings.adPopupWindow, function (result) {
        if(result.state == status.success) {
           return self.goToElementSafe(strings.adPopupCloseButton);
        }
    });
    return this; // allows the command to be chained.
};

exports.command = dismissAdPopup;

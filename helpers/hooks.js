'use strict';
var path = require('path');

module.exports = {
    afterScenario: function (browser, end) {
        var failures =
            browser.currentTest.results.errors > 0 ||
            browser.currentTest.results.failed > 0;

        if (failures) {
            if (!browser.sessionId) {
                end();
                return;
            }

            var d = new Date();
            var dateParts = d.toString().replace(/:/g, '').split(' ');
            dateParts.shift();
            dateParts.pop();
            var dateStamp = dateParts.join('-');

            var prefix = browser.currentTest.module + '/' + browser.currentTest.name;
            prefix = prefix.replace(/\s/g, '-').replace(/"|'/g, '');

            var fileNamePath = path.resolve(path.join('./screenshots/default', prefix + '_' + dateStamp + '.png'));
            browser.saveScreenshot(fileNamePath, function(result) {
                if (!result || result.status !== 0) {
                    console.log('Error saving screenshot...', result);
                }
                end();
            });
            return;
        }
        end();
    },
    beforeScenario: function(browser, end) {
        if(browser.globals.viewport != undefined){
            browser.resizeWindow(browser.globals.viewport.width, browser.globals.viewport.height);
        }
        if(browser.globals.wcmmode){
            var cqObj;
            cqObj = browser.page.cqLogin();
            cqObj.goToUrl(browser.launchUrl);
            cqObj.login();
        }
        end();
    }
};

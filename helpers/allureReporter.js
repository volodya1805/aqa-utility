'use strict';

var Allure = require('allure-js-commons');
var allureReporter = new Allure();
var fs = require('fs');
var path = require('path');

var self = module.exports = {
    write: function (results, done) {

        allureReporter.setOptions(' -o reports/allure-report' || {});
        for (var currentModule in results.modules) {

            var module = results.modules[currentModule];
            var currentTest = {
                failures: self.parse(module.failures),
                errors: self.parse(module.errors),
                skipped: self.parse(module.skipped.length),
                tests: self.parse(module.tests),
                isFailure: false,
                isSkipped: false,
                suiteName: 'FoxSports Test Suite',
                testName: currentModule,
                testSteps: [],
                errorMessage: '',
                startTimestamp: self.parseDate(module.timestamp),
                endTimestamp: self.parseDate(module.timestamp),
                tags: {}
            };

            if (currentTest.skipped === currentTest.tests) {
                currentTest.isSkipped = true;
            } else if (currentTest.failures > 0 || currentTest.errors > 0) {
                currentTest.isFailure = true;
            }

            allureReporter.startSuite(currentTest.suiteName, currentTest.startTimestamp);
            allureReporter.startCase(currentTest.testName, currentTest.startTimestamp);
            allureReporter.addAttachment('Reported Result', JSON.stringify(results), 'application/json');

            var previousStepTimestamp = currentTest.startTimestamp;

            for (var completedStep in module.completed) {
                var currentStep = module.completed[completedStep];

                var curCompletedStep = {
                    failures: self.parse(currentStep.failed),
                    errors: self.parse(currentStep.errors),
                    skipped: self.parse(currentStep.skipped),
                    passed: self.parse(currentStep.passed),
                    startTimestamp: previousStepTimestamp,
                    endTimestamp: previousStepTimestamp + (self.parseFloat(currentStep.time) * 1000),
                    totalTime: self.parseFloat(currentStep.time) * 1000
                };

                currentTest.endTimestamp = currentTest.endTimestamp + curCompletedStep.totalTime;
                previousStepTimestamp = curCompletedStep.endTimestamp;
                allureReporter.startStep(completedStep, curCompletedStep.startTimestamp);

                for (var currentStepAssertion in currentStep.assertions) {
                    allureReporter.startStep(currentStep.assertions[currentStepAssertion].message, curCompletedStep.startTimestamp);
                    allureReporter.endStep('passed', curCompletedStep.endTimestamp);
                }

                if (curCompletedStep.failures > 0 || curCompletedStep.errors > 0) {
                    allureReporter.endStep('failed', curCompletedStep.endTimestamp);

                    for (var assertion in currentStep.assertions) {
                        var currentAssertion = currentStep.assertions[assertion];

                        if (currentAssertion.failure != false) {
                            var errorMessage = {
                                failure: currentAssertion.failure,
                                message: currentAssertion.message,
                                stacktrace: currentAssertion.stacktrace
                            };
                            currentTest.errorMessage = {
                                message: errorMessage.failure + errorMessage.message,
                                stack: errorMessage.message + '\n' + errorMessage.failure + '\n' + errorMessage.stacktrace
                            };
                        }
                    }
                } else {
                    allureReporter.endStep('passed', curCompletedStep.endTimestamp);
                }

            }

            for (var skippedStep in module.skipped) {
                allureReporter.startStep(module.skipped[skippedStep], currentTest.endTimestamp);
                allureReporter.endStep('skipped', currentTest.endTimestamp);
            }

            if (currentTest.isFailure) {
                var screenshotPath = './screenshots/default/' + currentModule + '/';

                if(fs.existsSync(screenshotPath)) {
                    var files = fs.readdirSync(screenshotPath);

                    for (var i = 0; i < files.length; i++) {
                        if (path.extname(files[i]) == '.png') {
                            var data = fs.readFileSync(screenshotPath + files[i]);
                            allureReporter.addAttachment('Screenshots', data, 'image/png');
                        }
                    }
                }

                allureReporter.endCase('failed', currentTest.errorMessage, currentTest.endTimestamp);
                allureReporter.endSuite(currentTest.endTimestamp);

            } else if (currentTest.isSkipped) {
                allureReporter.endCase('skipped', 'No Steps Performed', currentTest.endTimestamp);
                allureReporter.endSuite(currentTest.endTimestamp);
            }

            else {
                allureReporter.endCase('passed', '', currentTest.endTimestamp);
                allureReporter.endSuite(currentTest.endTimestamp);
            }

        }
        done();
    },
    parse: function (str) {
        return parseInt(str, 10);
    },
    parseFloat: function (str) {
        return parseFloat(str);
    },
    parseDate: function (str) {
        return Date.parse(str);
    }
};

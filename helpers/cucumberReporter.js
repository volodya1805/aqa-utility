'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var uuid = require('node-uuid');

module.exports = {
    write: function (results, done) {

        var content = JSON.stringify(results.cucumber);

        mkdirp('./cucumber-results/', function (err) {
            if (err) {
                return console.log(err);
            }

            fs.writeFile('./cucumber-results/' + uuid.v1() + '.json', content, function(errWriteFile) {
                if(errWriteFile) {
                    return console.log(errWriteFile);
                }
            });
        });

        done();
    }
};

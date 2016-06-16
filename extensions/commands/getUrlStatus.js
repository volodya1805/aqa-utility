'use strict';

/**
 * getUrlStatus
 *
 * @example
 * this.getUrlStatus("http://www.foxsports.com/");
 *
 *
 * @method getUrlStatus
 * @param {string} address - The url or link to check the status against
 * @api commands
 */

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var getUrlStatus = function(address) {
    var request = new XMLHttpRequest();
    request.open('GET', address, false);
    request.send(null);
    if (request.status === 404) {
        this.verify.ok(false, 'Link: ' + address + ' Oh no, it does not exist! Responded with ' + request.status + ' status');
    }
    else if(request.status === 200) {
        this.verify.ok(true, 'Link: ' + address + ' responded with a ' + request.status + ' status');
    }
    else if(request.status === 302 || request.status === 301){
        this.verify.ok(true, 'Link: ' + address + ' responded with a ' + request.status + ' status which redirects the user to a valid page');
    }
    else if(request.status === 500){
        this.verify.ok(false, 'Oh no server error, Link: ' + address + ' responded with ' + request.status + 'status');
    }
    else{
        this.verify.ok(false, 'Oh no, unexpected response: ' + request.status + ' for url: ' + address);
    }
    return this;
};

exports.command = getUrlStatus;

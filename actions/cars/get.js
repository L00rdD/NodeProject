const Action = require('idylle').Action;
const Promise = require('bluebird');

module.exports = app => {
    return Action({
        execute: context => {
            Promise.resolve('suce');
        }
    });
};
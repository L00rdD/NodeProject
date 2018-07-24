const Action = require('idylle').Action;
const Promise = require('bluebird');

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: context => {
            return User.find();
        }
    });
};
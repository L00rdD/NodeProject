const Action = require('idylle').Action;
const Promise = require('bluebird');

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: context => {
            return User.populate({})
                .then(users => users.filter(user => user._id == context.params.id)[0])
                .catch(err => context.error(err.code || 500, err.message || err));;
        }
    });
};
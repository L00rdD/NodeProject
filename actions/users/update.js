const Action = require('idylle').Action;

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: context => {
            return User.update({_id: context.params.id}, context.data);
        }
    });
};
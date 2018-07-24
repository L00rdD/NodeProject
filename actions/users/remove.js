const Action = require('idylle').Action;

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: context => {
            return User.delete({_id: context.params.id})
                .catch(err => context.error(err.code || 500, err.message || err));;
        }
    });
};
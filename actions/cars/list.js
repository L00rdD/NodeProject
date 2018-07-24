const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            return Trip.find()
                .catch(err => context.error(err.code || 500, err.message || err));
        }
    });
};
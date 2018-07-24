const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: criteria => {
            criteria.status = Trip.Statuses.NotStarted;
            return Trip
                .delete(criteria);
        }
    });
};
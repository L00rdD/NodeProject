const Action = require('idylle').Action;
const Promise = require('bluebird');

module.exports = app => {
    return Action({
        execute: context => {
            const Trip = app.models.Trip;
            return Trip.findOne({
                    _id: context.params.id,
                    driver: context.user.id,
                    status: Trip.Statuses.NotStarted
                })
                .then(trip => trip || Promise.reject({code: 404, message: 'trip.not.found'}))
                .then(start)
                .then(trip => trip)
                .catch(err => context.error(err.code || 500, err.message || err));

            function start(trip) {
                trip.status = Trip.Statuses.Started;
                return Trip.update({_id: trip.id}, trip);
            }


        }
    });
};
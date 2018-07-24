const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            return Trip.findOne({
                    _id: context.params.id,
                    driver: context.user.id,
                    status: Trip.Statuses.Started
                })
                .then(trip => trip || Promise.reject({code: 404, message: 'trip.not.found'}))
                .then(finish)
                .then(trip => res.send(trip))
                .catch(err => res.status(err.code || 500).send(err.message || err));

            function finish(trip) {
                trip.status = Trip.Statuses.Finished;
                return Trip.update({_id: trip.id}, trip);
            }
        }
    });
};
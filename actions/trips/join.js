const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            return Trip
                .populate({
                    _id: context.params.id,
                    status: Trip.Statuses.NotStarted
                })
                .then(trip => trip || Promise.reject({code: 404, message: 'trip.not.found'}))
                .then(ensureRoomAvailable)
                .then(join)
                .then(trip => trip)
                .catch(err => context.error(500, err));


            function ensureRoomAvailable(trip) {
                const roomAvailable = trip.car.seats - trip.participants.length - 1;
                if (roomAvailable <= 0)
                    return Promise.reject({code: 422, message: 'no.room.available'});

                return trip;
            }

            function join(trip) {
                trip.participants = trip.participants.concat(context.user);
                return Trip.update({_id: trip.id}, trip);
            }
        }
    });
};
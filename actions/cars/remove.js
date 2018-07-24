const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            Car.findOne({_id: context.params.id})
                .then(pullFromOwner)
                .then(removeNotStartedTrips)
                .then(() => res.status(204).send())
                .catch(error => res.status(500).send(error));

            function pullFromOwner(car) {
                return app.actions.users
                    .pullCar(car)
            }

            function removeNotStartedTrips() {
                return app.actions.trips
                    .clean({car: context.params.id })
            }
        }
    });
};
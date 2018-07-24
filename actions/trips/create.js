const Action = require('idylle').Action;
const requiredFields = ["start", "end"];

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            let data = context.data;
            data.driver = context.user;

            data = Trip.verify(data);
            if(!data)
                return context.error(400, "Missing one or more required fields : " + requiredFields);

            return ensureCarExist(data)
                .then(createTrip)
                .catch(err => context.error(err.code || 500, err.message || err));
        }
    });

    function ensureCarExist(data) {
        return app.actions.cars.get({_id: data.car, owner: data.driver});
    }

    function createTrip() {
        return Trip.create(data);
    }
};
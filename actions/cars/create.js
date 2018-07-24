const Action = require('idylle').Action;

module.exports = app => {
    const Car = app.models.Car;
    return Action({
        execute: context => {
            let data = context.data || {};
            data.owner = context.user._id;

            data = Car.verify(data);
            if(!data)
                return context.error(400, "Missing field owner");

            return Car.create(data)
                .then(appendCarToOwner)
                .then(car => car)
                .catch(err => context.error(err.code || 500, err.message || err));

            function appendCarToOwner(car) {
                return app.actions.users
                    .appendCar(car)
                    .then(() => car);
            }
        }
    });
};
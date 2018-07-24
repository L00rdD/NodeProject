const Action = require('idylle').Action;

module.exports = app => {
    const Car = app.models.Car;
    return Action({
        execute: criteria => {
            return Car
                .findOne(criteria)
                .then(results => {
                    if (!results || results.length === 0)
                        return Promise.reject({code: 404, message: 'car.not.found'});

                    return results;
                });
        }
    });
};


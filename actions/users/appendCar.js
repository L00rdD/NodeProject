const Action = require('idylle').Action;

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: car => {
            return User.findById(car.owner)
                .then(user => {
                    user.cars = user.cars.concat(car.id);

                    return User.update({_id: user.id}, user)
                        .catch(err => context.error(err.code || 500, err.message || err));;
                });
        }
    });
};
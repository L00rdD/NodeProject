const Action = require('idylle').Action;

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: car => {
            return User.findOne({_id: car.owner}, {
                $pull: {
                    cars: car.id
                }
            })
                .catch(err => context.error(err.code || 500, err.message || err));
        }
    });
};
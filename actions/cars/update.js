const Action = require('idylle').Action;

module.exports = app => {
    const Trip = app.models.Trip;
    return Action({
        execute: context => {
            return Trip.update({_id: context.params.id, driver: context.user.id}, context.data)
                .catch(err=> context.error(500, err));
        }
    });
};
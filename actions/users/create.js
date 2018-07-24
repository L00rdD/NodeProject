const Action = require('idylle').Action;
const sha1 = require('sha1');
const requiredFields = ["username", "password", "lastName", "firstName"];

module.exports = app => {
    const User = app.models.User;
    return Action({
        execute: context => {
            const data = context.data;
            data.password = sha1(data.password);
            if (!User.verify(data))
                return context.error(400, "Missing one or more required fields : " + requiredFields);

            return User.create(data)
                .catch(err => context.error(err.code || 500, err.message || err));;
        }
    });
};
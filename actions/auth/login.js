const Action = require('idylle').Action;
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const User = app.models.User;
    const Token = app.models.Token;

    return Action({
        execute: (context) => {
            if(context.data.username == undefined || context.data.password == undefined)
                return context.error(400, 'missing.fields');
            const username = context.data.username;
            const password = sha1(context.data.password);

            let user;

            return findUser()
                .then(u => u || context.error(404, 'auth.login.user_not_found'))
                .then(u => user = u)
                .then(ensureLimitNotExceeded)
                .then(encrypt)
                .then(encryptedToken => encryptedToken);

            function findUser() {
                return User
                    .findOne({username: username, password: password});
            }

            function ensureLimitNotExceeded() {
                return Token
                    .find({ user: user.id })
                    .then(ensureCountNotExceeded)
                    .then(create);

                function ensureCountNotExceeded(tokens) {
                    if (tokens.length < app.settings.simultaneousLoginLimit)
                        return true;

                    return Token.delete({_id: tokens[0].id});
                }

                function create() {
                    return Token.create({ user: user.id })
                }
            }

            function encrypt(token) {
                return new Promise((resolve, reject) => {
                    jwt.sign(user, app.settings.secret, (err, encryptedToken) => err ? reject(err) : resolve(encryptedToken))
                })
            }
        }
    });
};

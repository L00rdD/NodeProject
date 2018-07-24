const jwt = require('jsonwebtoken');

module.exports = app => (req, res, next) => {
    return new Promise((resolve, reject) => {
        const authorization = req.headers.authorization;
        if(!authorization)
            return reject({ code: 401, reason: 'invalid.token' });

        jwt.verify(authorization, app.settings.secret, (err, decryptedToken) => {
            if (err || decryptedToken === undefined || decryptedToken === null)
                return reject({ code: 401, reason: err });

            return resolve(decryptedToken);
        })
    })
        .then(synchronizeUser)
        .then(next)
        .catch(err => res.status(err.code || 500).send(err.reason || err.message || err));

    function synchronizeUser(user) {
        req.user = user;
    }
};
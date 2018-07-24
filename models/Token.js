module.exports = app => {
    class Token extends require('./.DBManager')(app) {
        constructor() {
            super('tokens');
        }
    }

    return new Token();
};
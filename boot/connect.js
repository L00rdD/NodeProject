const url = "mongodb://localhost:27017/nodeProject";
const mongodb = require('mongodb-bluebird');

module.exports = app => mongodb.connect(url).then(db => app.db = db);
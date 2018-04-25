const morgan = require('morgan');
module.exports = app => app.router.use(morgan(app.settings.logger.level));

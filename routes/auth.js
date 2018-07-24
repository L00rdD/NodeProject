module.exports = app => {
    const router = app.Router();

    router
        .post('/login',
            app.middlewares.bodyParser.json(),
            app.actions.auth.login.expose()
        );

    app.router.use('/auth', router);
};
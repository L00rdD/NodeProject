module.exports = app => {
    const router = app.Router;

    router
        .get('/',
            app.actions.cars.get.expose()
        );

    app.router.use('/cars', router);
}
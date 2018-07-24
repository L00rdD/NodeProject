module.exports = app => {
    const router = app.Router();

    router
        .post('/',
            app.middlewares.ensureAuthenticated,
            app.middlewares.bodyParser.json(),
            app.actions.cars.create.expose()
        )

        .get('/',
            app.middlewares.ensureAuthenticated,
            app.actions.cars.list.expose()
        )

        .post('/',
            app.middlewares.ensureAuthenticated,
            app.middlewares.bodyParser.json(),
            app.actions.cars.create.expose()
        )

        .put('/:id',
            app.middlewares.bodyParser.json(),
            app.actions.cars.update.expose()
        )

        .delete('/:id',
            app.actions.cars.remove.expose()
        );

    app.router.use('/cars', router);
}
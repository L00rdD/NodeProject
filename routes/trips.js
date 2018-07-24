module.exports = app => {
    const router = app.Router();

    router
        .get('/:id',
            app.actions.trips.show.expose()
        )

        .get('/',
            app.actions.trips.list.expose()
        )

        .post('/',
            app.middlewares.ensureAuthenticated,
            app.middlewares.bodyParser.json(),
            app.actions.trips.create.expose()
        )

        .put('/:id',
            app.middlewares.ensureAuthenticated,
            app.middlewares.bodyParser.json(),
            app.actions.trips.update.expose()
        )

        .delete('/:id',
            app.middlewares.ensureAuthenticated,
            app.actions.trips.remove.expose()
        )

        .post('/:id/join',
            app.middlewares.ensureAuthenticated,
            app.actions.trips.join.expose()
        )

        .post('/:id/start',
            app.middlewares.ensureAuthenticated,
            app.actions.trips.start.expose()
        )

        .post('/:id/finish',
            app.middlewares.ensureAuthenticated,
            app.actions.trips.finish.expose()
        );

    app.router.use('/trips', router);
};
module.exports = app => {
    const router = app.Router();

    router
        .get('/',
            app.actions.users.list.expose()
        )

        .get('/:id',
            app.actions.users.show.expose()
        )

        .post('/',
            app.middlewares.bodyParser.json(),
            app.actions.users.create.expose()
        )

        .put('/:id',
            app.middlewares.bodyParser.json(),
            app.actions.users.update.expose()
        )

        .delete('/:id',
            app.actions.users.remove.expose()
        );

    app.router.use('/users', router);
};
module.exports = app => {
    class Trip extends require('./.DBManager')(app) {
        constructor() {
            super('trips');
        }

        populate(criteria) {
            return app.db.collection(this.collectionName).aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'cars',
                        foreignField: '_id',
                        as: 'cars'
                    }
                }
            ], {});
        }

        verify(data) {
            if (!this.checkRequiredStringField(data.start) ||
                !this.checkRequiredStringField(data.end) ||
                !this.checkRequiredStringField(data.driver))
                return false;

            if(!this.checkRequiredIntField(data.status))
                data.status = Trip.Statuses.NotStarted;

            return true;
        }
    }

    Trip.Statuses = {
        NotStarted: 0,
        Started: 1,
        Finished: 2
    };

    return new Trip();
};
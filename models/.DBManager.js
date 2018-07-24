module.exports = app => {
    class DBManager {
        constructor(collectionName) {
            this.collectionName = collectionName;
        }

        find(criteria) {
            return app.db.collection(this.collectionName).find(criteria);
        }

        create(document) {
            return app.db.collection(this.collectionName)
                .insert(document)
                .then(res => res.ops[0]);
        }

        delete(criteria) {
            return app.db.collection(this.collectionName)
                .remove(criteria);
        }

        update(criteria, data) {
            return app.db.collection(this.collectionName).update(criteria, {$set: data});
        }

        findOne(criteria) {
            return app.db.collection(this.collectionName).findOne(criteria);
        }

        checkRequiredStringField(field) {
            return field !== undefined && typeof field === "string";
        }

        checkRequiredIntField(field) {
            return field !== undefined && typeof field === "int";
        }
    }

    return DBManager;
};


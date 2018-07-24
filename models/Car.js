module.exports = app => {
    class Car extends require('./.DBManager')(app) {
        constructor() {
            super('cars');
        }

        verify(data) {
            if(!this.checkRequiredStringField(data.model))
                data.model = "Lamda";
            if(!this.checkRequiredStringField(data.color))
                data.color = "White";
            if(!this.checkRequiredIntField(data.seats))
                data.seats = 2;
            if(!this.checkRequiredStringField(data.owner))
                return false;

            return data;
        }
    }

    return new Car();
};
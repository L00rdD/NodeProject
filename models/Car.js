/*class Car extends Document {
    constructor() {
        super();

        this.model = {
            type: String,
            required: true
        };

        this.color = {
            type: String,
            required: true
        };

        this.seats = {
            type: Number,
            required: true,
            default: 2
        };

        this.owner = {
            type: User,
            required: true
        };
    }

    static collectionName() {
        return 'Car';
    }
}*/

class Car {
    constructor(model, color, seats, owner) {
        this.model = model;
        this.color = color;
        this.seats = seats;
        this.owner = owner;
    }
}

module.exports = app => Car;


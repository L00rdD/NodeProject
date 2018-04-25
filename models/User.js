

/*class User extends Document {
    constructor() {
        super();

        this.firstname = {
            type: String,
            required: true
        };

        this.lastname = {
            type: String,
            required: true
        };

        this.username = {
            type: String,
            required: true,
            unique: true
        };

        this.age = {
            type: Number,
            required: true,
            default: 18,
            min: 18
        };

        this.cars = [Car];
    }
}*/

class User {
    constructor(firstname, lastname, username, age) {
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.age = age
    }
}

module.exports = app => User;
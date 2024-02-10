const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    username:{
        type: String,
        minLength: [4,'Username must be at least 4 characters long'],
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        validate:{
            validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'Email is required']
    },
    address: {
        type: {
            street: String,
            suite: String,
            city: {
                type: String,
                validate: {
                    validator: value => /^[A-Za-z\s]+$/.test(value),
                    message: props => `${props.value} is not a valid city name!`
                }
            },
            zipcode: {
                type: String,
                validate: {
                    validator: value => /^\d{5}-\d{4}$/.test(value),
                    message: props => `${props.value} is not a valid zip code! The format should be 12345-1234.`
                }
            },
            geo: {
                lat: String,
                lang: String
            }
        },
        required: [true, 'Address is required']
    },
    phone:{
        type: String,
        validate: {
            validator: value => /^\d{1}-\d{3}-\d{3}-\d{4}$/.test(value),
            message: props => `${props.value} is not a valid zip code! The format should be 1-234-456-7890.`
        },
        required: [true,"Phone number is required"]
    },
    website: {
        type: String,
        validate: {
            validator: value => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/.test(value),
            message: props => `${props.value} is not a valid web URL address!`
        },
        required: [true, "Website is required"]
    },
    company:{
        type: {
            name: String,
            catchPhrase: String,
            bs: String
        },
        required: [true, "Company is required"]
    }
});

// Mongoose middlewares
UserSchema.pre('save', function (next) {
    this.name = sanitizeName(this.name);
    next();
});

// Helper functions
function sanitizeName(name){
    return name.replace(/\b\w/g, match => match.toUpperCase());
}


module.exports = mongoose.model("User", UserSchema);
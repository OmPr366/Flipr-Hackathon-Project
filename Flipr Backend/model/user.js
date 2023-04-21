const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: ""
    },
    podcasts: {
        type: [String],
        default: []
    },
    favourites: {
        type: [String],
        default: []
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        default: 1
    },
    passportPassed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', userSchema);
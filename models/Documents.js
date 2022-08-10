const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentsSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    type: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    imgPath: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('documents', documentsSchema);
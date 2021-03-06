const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
});


module.exports = model('User', schema);

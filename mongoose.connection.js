const mongoose = require('mongoose');
const config = require('./config');

const db = mongoose.connection;

module.exports = (callback) => {
    db.on('connecting', function () {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        console.log('MongoDB connected!');
    });
    db.once('open', function () {
        console.log('MongoDB connection opened!');
        callback();
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        console.log('MongoDB disconnected!');
        mongoose.connect(config.mongo.uri, {
            autoReconnect: true,
            useNewUrlParser: true,
        });
    });

    mongoose.connect(config.mongo.uri, {
        autoReconnect: true,
        useNewUrlParser: true,
    });
};

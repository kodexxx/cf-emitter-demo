module.exports = {
    port: process.env.PORT || 8000,
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1/backend',
    },
    services: {
        notification: {
            host: process.env.SERVICE_NOTIFICATION_HOST || '127.0.0.1',
            protocol: process.env.SERVICE_NOTIFICATION_PROTOCOL || 'http',
            port: process.env.SERVICE_NOTIFICATION_PORT || '3000',
        },
    },
};

const config = require('../../config');

class Helpers {
    getServiceApiUri(serviceName) {
        const serviceInfo = config.services[serviceName];

        return `${serviceInfo.protocol}://${serviceInfo.host}:${serviceInfo.port}`;
    }
}

module.exports = new Helpers();

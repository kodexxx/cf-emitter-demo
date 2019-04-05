const integrationDal = require('./integration.dal');
const { getServiceApiUri } = require('../../helpers');
const axios = require('axios');
const _ = require('lodash');

class IntegrationLogic {
    addIntegrationToUser(userId, integrationType, settings) {
        return integrationDal.addIntegrationToUser(userId, integrationType, settings);
    }

    list(userId) {
        return integrationDal.list(userId);
    }

    async available() {
        const apiUri = `${getServiceApiUri('notification')}/api/integration`;

        const { data } = await axios({
            method: 'GET',
            url: apiUri,
        });

        return data;
    }

    async setEvent(integrationId, eventName, value) {
        let { notifications } = await integrationDal.getIntegration(integrationId);

        if (value) {
            notifications.push(eventName);
        } else {
            _.remove(notifications, (item) => item === eventName);
        }

        return integrationDal.setEvents(integrationId, _.uniq(notifications));
    }

    async updateSettings(integrationId, settings) {
        return integrationDal.updateSettings(integrationId, settings);
    }
}

module.exports = new IntegrationLogic();

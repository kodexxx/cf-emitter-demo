const IntegrationModel = require('./integration.model');
const { ObjectId } = require('mongoose').Types;

class IntegrationDal {
    addIntegrationToUser(userId, integrationType, settings) {
        const integration = new IntegrationModel({
            integrationType,
            settings,
            userId: ObjectId(userId),
        });

        return integration.save();
    }

    updateSettings(integrationId, settings) {
        return IntegrationModel.updateOne({
            _id: ObjectId(integrationId),
        }, {
            $set: {
                settings,
            },
        });
    }

    list(userId) {
        return IntegrationModel.find({
            userId: ObjectId(userId),
        });
    }

    getIntegration(id) {
        return IntegrationModel.findById(id);
    }


    setEvents(id, notifications) {
        return IntegrationModel.updateOne({
            _id: ObjectId(id),
        }, {
            $set: {
                notifications,
            },
        });
    }
}

module.exports = new IntegrationDal();

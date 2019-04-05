const eventProxy = require('events-proxy');
const integrationLogic = require('../integration/integration.logic');
const { BadRequestError } = require('../../errors');


class NotificationController {
    constructor() {

    }

    async sendNotify(req, res, next) {

        const { userId, eventType, data } = req.body;

        if (!userId) {
            return next(new BadRequestError('Provide please userId in body'));
        }

        if (!eventType) {
            return next(new BadRequestError('Provide please eventType in body'));
        }
        if (!data) {
            return next(new BadRequestError('Provide please data in body'));
        }


        try {
            const integrationList = await integrationLogic.list(userId);

            integrationList
                .filter(item => item.notifications.includes(eventType))
                .forEach(item => {
                    eventProxy.publish('notifyEvent', {
                        provider: item.integrationType,
                        event: eventType,
                        settings: item.settings,
                        data,
                    });
                });

            res.json('ok');

        } catch (e) {
            next(e);
        }

    }
}

module.exports = new NotificationController();

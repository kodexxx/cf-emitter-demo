const integrationLogic = require('./integration.logic');
const { BadRequestError } = require('../../errors');
const { getServiceApiUri } = require('../../helpers');


class IntegrationController {
    async addIntegrationToUser(req, res, next) {
        const { integrationType, userId, settings } = req.body;

        if (!integrationType) {
            return next(new BadRequestError('Provide please, integrationType variable in body'));
        }

        if (!userId) {
            return next(new BadRequestError('Provide please, userId variable in body'));
        }

        if (!settings) {
            return next(new BadRequestError('Provide please, settings variable in body'));
        }

        try {
            const result = await  integrationLogic.addIntegrationToUser(userId, integrationType, settings);

            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async list(req, res, next) {
        const { userId } = req.query;

        if (!userId) {
            return next(new BadRequestError('Provide please, userId variable in query'));
        }

        try {
            const result = await integrationLogic.list(userId);

            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async availableIntegration(req, res, next) {
        try {
            res.json(await integrationLogic.available());
        } catch (e) {
            next(e);
        }
    };

    async setEvent(req, res, next) {
        const { integrationId, eventName, value } = req.body;

        if (!integrationId) {
            return next(new BadRequestError('Provide please, integrationId variable in body'));
        }

        if (!eventName) {
            return next(new BadRequestError('Provide please, eventName variable in body'));
        }

        if (typeof value === 'undefined') {
            return next(new BadRequestError('Provide please, value variable in body'));
        }

        try {
            res.json(await integrationLogic.setEvent(integrationId, eventName, value));
        } catch (e) {
            next(e);
        }
    }

    async updateSettings(req, res, next) {
        const { integrationId, settings } = req.body;

        if (!integrationId) {
            return next(new BadRequestError('Provide please, integrationId variable in body'));
        }

        if (!settings) {
            return next(new BadRequestError('Provide please, settings object in body'));
        }

        try {
            res.json(await integrationLogic.updateSettings(integrationId, settings));
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new IntegrationController();

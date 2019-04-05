const integrationController = require('./integration.controller');

const router = require('express').Router();


router.route('/')
    .post(integrationController.addIntegrationToUser)
    .get(integrationController.list);

router.get('/available', integrationController.availableIntegration);

router.post('/events', integrationController.setEvent);

router.post('/settings', integrationController.updateSettings);

module.exports = router;

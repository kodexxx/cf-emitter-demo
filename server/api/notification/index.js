const router = require('express').Router();
const notificationController = require('./notification.controller');

router.route('/')
    .post(notificationController.sendNotify);

module.exports = router;

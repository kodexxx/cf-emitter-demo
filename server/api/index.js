const router = require('express').Router();

const IntegrationRouter = require('./integration');
const UserRouter = require('./user');
const NotificationRouter = require('./notification');

router.use('/user', UserRouter);
router.use('/integration', IntegrationRouter);
router.use('/notification', NotificationRouter);

module.exports = router;

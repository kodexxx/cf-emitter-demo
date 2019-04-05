const router = require('express').Router();
const userController = require('./user.controller');

router.route('/')
    .get(userController.getList)
    .post(userController.createUser);

module.exports = router;

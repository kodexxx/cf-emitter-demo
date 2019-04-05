const userLogic = require('./user.logic');
const { BadRequestError } = require('../../errors');

class UserController {
    async getList(req, res, next) {
        try {
            res.json(await userLogic.list());
        } catch (e) {
            next(e);
        }
    }

    async createUser(req, res, next) {
        const { username } = req.body;

        if (!username) {
            return next(new BadRequestError('Provide please field: username'));
        }

        try {
            res.json(await userLogic.createUser(username));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();

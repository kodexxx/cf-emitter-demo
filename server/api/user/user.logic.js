const userDal = require('./user.dal');

class UserLogic {
    createUser(username) {
        return userDal.createUser(username);
    }

    async list() {
        const res = await userDal.list();
        return res.map(item => ({
            username: item.username,
            id: item._id,
        }));
    }
}

module.exports = new UserLogic();

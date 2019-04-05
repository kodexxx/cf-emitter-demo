const UserModel = require('./user.model');

class UserDal {
    createUser(username) {
        const user = new UserModel({
            username,
        });

        return user.save();
    }

    list() {
        return UserModel.find();
    }
}

module.exports = new UserDal();

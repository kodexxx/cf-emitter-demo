const { BaseError } = require('./index');
module.exports = ({ debug } = { debug: false }) => (err, req, res, next) => {
    if (!err) return next();

    if (debug) {
        console.error(err);
    }

    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            code: err.statusCode,
            message: err.message,
        });
    }

    res.status(500).json({
        code: 500,
        message: err.message,
    });
};

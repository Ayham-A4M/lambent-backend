const loginSchema = require('./schemas/login.schema');

const loginValidator = (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = loginValidator
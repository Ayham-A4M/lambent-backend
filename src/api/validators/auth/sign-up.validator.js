const signUpSchema = require('./schemas/sign-up.schema');

const signUpValidator = (req, res, next) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = signUpValidator
const learningTimeSchema = require('./schemas/learningTime.schema');

const learningTimeValidator = (req, res, next) => {
    try {
        const { error } = learningTimeSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = learningTimeValidator
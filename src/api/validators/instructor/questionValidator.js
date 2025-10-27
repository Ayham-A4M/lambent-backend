const { itemSchema } = require('./schemas/questions.schema');

const questionValidator = (req, res, next) => {
    try {
        const { error } = itemSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = questionValidator
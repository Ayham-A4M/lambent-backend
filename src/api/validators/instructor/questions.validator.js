const { questionsSchema } = require('./schemas/questions.schema');

const lessonValidator = (req, res, next) => {
    try {
        const { error } = questionsSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = lessonValidator
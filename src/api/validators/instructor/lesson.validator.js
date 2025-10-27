const lessonSchema = require('./schemas/lesson.schema');

const lessonValidator = (req, res, next) => {
    try {
        const { error } = lessonSchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = lessonValidator
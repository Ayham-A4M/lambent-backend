const courseSchema = require('./schemas/course.schema');

const courseValidator = (req, res, next) => {
    try {
        const courseInformation = JSON.parse(req.body.courseInformation);
        const { error } = courseSchema.validate(courseInformation);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = courseValidator
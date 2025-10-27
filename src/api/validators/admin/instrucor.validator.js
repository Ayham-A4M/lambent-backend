const instructorSchema = require('./schemas/instructor.schema');

const loginValidator = (req, res, next) => {
    try {
        const instructor = JSON.parse(req.body.instructor);
        const { error } = instructorSchema.validate(instructor);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = loginValidator
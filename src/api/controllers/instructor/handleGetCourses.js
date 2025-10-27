const courseModel = require("../../models/course");

const handleGetCourses = async (req, res, next) => {
    try {
        const id = res.locals.id;
        const courses = await courseModel.find({ instructorId: id });
        if (courses) {
            return res.status(200).send({ courses });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetCourses;
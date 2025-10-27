const courseModel = require('../../models/course');
const AppError = require('../../utils/appError');
const handleCreateCourse = async (req, res, next) => {
    try {
        const instructorId = res.locals.id;
        const  courseInformation  = JSON.parse(req.body.courseInformation);
        courseInformation.instructorId = instructorId;
        if (!req.file) { throw new AppError(400, "course image is required") }
        const url = `/public/${req.file.filename}`;
        courseInformation.image = url;
        const response = await new courseModel(courseInformation).save();
        if (response) {
            return res.status(200).send({ msg: "the course has been created successfully" });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleCreateCourse;
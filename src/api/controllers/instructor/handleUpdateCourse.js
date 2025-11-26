const courseModel = require('../../models/course');
const handleUpdateCourse = async (req, res, next) => {
    try {
        const instructorId = res.locals.id;
        const courseId = req.params.courseId;
        const courseInformation = JSON.parse(req.body.courseInformation);
        if (req.file) {
            const url = `/public/${req.file.filename}`;
            courseInformation.image = url;
        }

        const response = await courseModel.findOneAndUpdate({ _id: courseId, instructorId }, courseInformation);
        if (response) {
            return res.status(200).send({ msg: "the course has been updated successfully" });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdateCourse;
const courseModel = require("../../models/course");
const AppError = require("../../utils/appError");
const lessonModel = require('../../models/lesson')

const handleCreateLesson = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const courseId = req.params.courseId;
        const newLesson = { name, description, courseId };
        const course = await courseModel.findById(courseId);
        
        if (course.totalLessons + 1 > 70) {
            throw new AppError(400, "you hit the maximum pages for lesson");
        }
        newLesson.lessonNumber = course.totalLessons + 1;
        const [res1, res2] = await Promise.all([courseModel.findByIdAndUpdate(courseId, { $inc: { totalLessons: 1 } }), new lessonModel(newLesson).save()]);
        if (res1 && res2) {
            return res.status(200).send({ msg: "lesson created successfully" });
        }

    } catch (err) {
        next(err);
    }
}
module.exports = handleCreateLesson;
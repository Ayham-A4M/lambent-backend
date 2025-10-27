const courseProgressModel = require("../../models/courseProgress");
const lessonModel = require("../../models/lesson");
const handleGetLessons = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const role = res.locals.role;
        const userId = res.locals.id;
        const response = {};
        if (role === "user") {
            const [lessons, progress] = await Promise.all([
                lessonModel.find({ courseId }, { _id: true, lessonNumber: true, courseId: true }),
                courseProgressModel.findOne({ userId, courseId }, { completedLessons: true, progressPercentage: true, currentLesson: true })
            ])
            response.lessons = lessons;
            response.progress = progress;
        } else if (role === "instructor") {
            const lessons = await lessonModel.find({ courseId }, { _id: true, lessonNumber: true, courseId: true });
            response.lessons = lessons;
        }
        return res.status(200).send(response);
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetLessons;
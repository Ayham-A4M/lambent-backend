const courseModel = require('../../models/course');
const courseProgressModel = require('../../models/courseProgress');
const AppError = require('../../utils/appError');
const handleUpdateProgress = async (req, res, next) => {
    try {
        const userId = res.locals.id;
        const { courseId } = req.params;
        const { completedLessonNumber } = req.body;
        console.log(userId, courseId, completedLessonNumber)
        const [course, courseProgress] = await Promise.all(
            [
                courseModel.findById(courseId, { totalLessons: true }),
                courseProgressModel.findOne({ userId, courseId }, { completedLessons: true, progressPercentage: true })
            ]
        )
        if (!courseProgress)
            throw new AppError(400, "sorry you didn`t join to this course")

        if (courseProgress?.completedLessons?.includes(completedLessonNumber))
            return res.status(200).send();
        const updateObject = {
            currentLesson: completedLessonNumber,
        }
        if (courseProgress?.completedLessons.length > 0) {
            updateObject.completedLessons = [...courseProgress.completedLessons, completedLessonNumber];
        } else {
            updateObject.completedLessons = [completedLessonNumber]
        }
        updateObject.progressPercentage = ((updateObject.completedLessons?.length / course.totalLessons) * 100).toFixed(2);
        const updated = await courseProgressModel.findOneAndUpdate({ userId, courseId }, updateObject);
        if (updated) {
            return res.status(200).send();
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdateProgress
const AppError = require("../../utils/appError");
const lessonModel = require('../../models/lesson');
const quizModel = require("../../models/quiz");
// const pageModel = require('../../models/page')
const handleGetLesson = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;
        const { role } = res.locals;
        if (!courseId || !lessonId) {
            throw new AppError("no specific lesson");
        }
        const response = {};
        if (role == "user") {
            const [lesson, hasQuizz] = await Promise.all(
                [
                    lessonModel.findOne({ courseId, _id: lessonId }, { lessonContent: true, name: true, viewsNumber: true, description: true }),
                    quizModel.exists({ courseId, lessonId, questions: { $exists: true, $ne: [] } })
                ]
            )
            response.lesson = lesson;
            response.hasQuizz = hasQuizz
        } else if (role == "instructor") {
            const lesson = await lessonModel.findOne({ courseId, _id: lessonId }, { lessonContent: true, name: true, viewsNumber: true, description: true });
            response.lesson = lesson;
        }

        return res.status(200).send(response);

    } catch (err) {
        next(err);
    }
}
module.exports = handleGetLesson
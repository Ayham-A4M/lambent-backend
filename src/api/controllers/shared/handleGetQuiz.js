const AppError = require("../../utils/appError");
const quizModel = require('../../models/quiz');
const handleGetQuiz = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;
        if (!courseId || !lessonId) {
            throw new AppError("no specific lesson");
        }
        const quiz = await quizModel.findOne({ courseId, lessonId }, { questions: true });
        if (quiz) {
            return res.status(200).send({ quiz });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetQuiz
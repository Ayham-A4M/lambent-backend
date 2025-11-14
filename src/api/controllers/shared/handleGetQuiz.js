const AppError = require("../../utils/appError");
const quizModel = require("../../models/quiz");
const completedQuiz = require("../../models/completedQuiz");
const handleGetQuiz = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    const { role, id } = res.locals;
    if (!courseId || !lessonId) {
      throw new AppError("no specific lesson");
    }

    if (role === "user") {
      const [hasCompletedQuiz, quiz] = await Promise.all([completedQuiz.findOne({ courseId, lessonId, userId: id }), quizModel.findOne({ lessonId, courseId })]);
      return res.status(200).send({ hasCompletedQuiz, quiz: quiz || [] });
    }
    const quiz = await quizModel.findOne({ courseId, lessonId }, { questions: true });
    return res.status(200).send({ quiz: quiz || [] });
  } catch (err) {
    next(err);
  }
};
module.exports = handleGetQuiz;

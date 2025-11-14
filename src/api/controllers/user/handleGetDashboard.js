const courseProgressModel = require("../../models/courseProgress");
const userModel = require("../../models/user");
const completedQuizModel = require("../../models/completedQuiz");
const { default: mongoose } = require("mongoose");

const handleGetDashboard = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const [completedCourses, streak, quizAnalyze] = await Promise.all([
      courseProgressModel.countDocuments({ userId: id }),
      userModel.findById(id, { currentStreakSerial: true }),
      completedQuizModel.aggregate([
        {
          $match: { userId:new mongoose.Types.ObjectId(id) },
        },
        {
          $unwind: "$answers",
        },
        {
          $group: {
            _id: null,
            totalAnswers: { $sum: 1 },
            correct: {
              $sum: { $cond: ["$answers.isCorrect", 1, 0] },
            },
            incorrect: {
              $sum: { $cond: ["$answers.isCorrect", 0, 1] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalAnswers: 1,
            correct: 1,
            incorrect: 1,
          },
        },
      ]),
    ]);
    console.log(quizAnalyze, "quizanalyze");
    return res.status(200).send({quizAnalyze})
  } catch (err) {
    next(err);
  }
};
module.exports = handleGetDashboard;

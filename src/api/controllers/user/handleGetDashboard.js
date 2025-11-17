const courseProgressModel = require("../../models/courseProgress");
const userModel = require("../../models/user");
const completedQuizModel = require("../../models/completedQuiz");
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
const learningTimeModel = require("../../models/learningTime");
dayjs.extend(isoWeek);

const handleGetDashboard = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const weekIndex = dayjs().isoWeek();
    const { id } = res.locals;
    const [completedCourses, streak, quizAnalyze, spendTimeLearning, coursesProgress] = await Promise.all([
      courseProgressModel.countDocuments({ userId: id, progressPercentage: 100 }),
      userModel.findById(id, { currentStreakSerial: true }),
      completedQuizModel.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(id) },
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
      learningTimeModel.findOne({ userId: id, weekIndex, year }, { learningTime: true }),
      courseProgressModel.aggregate([
        { $sort: { joiningDate: 1 } },
        { $limit: 4 },
        {
          $match: { userId: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "courses",
            foreignField: "_id",
            localField: "courseId",
            as: "courseInformation",
          },
        },
        {
          $unwind: "$courseInformation",
        },
        {
          $project: {
            courseId: true,
            progressPercentage: true,
            courseName: "$courseInformation.name",
            courseType: "$courseInformation.type",
          },
        },
      ]),
    ]);
    console.log(spendTimeLearning,"spend")
    const response = {
      completedCourses,
      streak: streak?.currentStreakSerial,
      quizAnalyze: quizAnalyze[0],
      spendTimeLearning: { weekChart: spendTimeLearning?.learningTime, today: spendTimeLearning?.learningTime[new Date().getDay()]?.learningTime||0 },
      coursesProgress
    };

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
module.exports = handleGetDashboard;

const AppError = require("../../utils/appError");
const lessonModel = require("../../models/lesson");
const quizModel = require("../../models/quiz");
const completedQuizModel = require("../../models/completedQuiz");
const courseProgressModel = require("../../models/courseProgress");
const { default: mongoose } = require("mongoose");
const handleGetLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    const { role, id } = res.locals;
    if (!courseId || !lessonId) {
      throw new AppError("no specific lesson");
    }
    const response = {};
    if (role == "user") {
      const [lesson, hasQuizz, hasCompletedQuiz] = await Promise.all([
        // lessonModel.findOne({ courseId, _id: lessonId }, { lessonContent: true, name: true, lessonNumber: true, viewsNumber: true, description: true }),
        lessonModel.aggregate([
          { $match: { courseId: new mongoose.Types.ObjectId(courseId), _id: new mongoose.Types.ObjectId(lessonId) } },
          {
            $lookup: {
              from: "coursesProgress",
              let: { lessonNum: "$lessonNumber" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$$lessonNum", "$completedLessons"],
                    },
                  },
                },
              ],
              as: "hasCompleted",
            },
          },
          {
            $project: {
              lessonContent: true,
              name: true,
              lessonNumber: true,
              viewsNumber: true,
              description: true,
              hasCompleted: { $gt: [{ $size: "$hasCompleted" }, 0] },
            },
          },
        ]),
        quizModel.exists({ courseId, lessonId, questions: { $exists: true, $ne: [] } }),
        completedQuizModel.exists({ courseId, lessonId, userId: id }),
      ]);
      response.lesson = lesson[0];

      response.hasQuizz = hasQuizz;
      response.hasCompletedQuiz = hasCompletedQuiz;
    } else if (role == "instructor") {
      const lesson = await lessonModel.findOne({ courseId, _id: lessonId }, { lessonContent: true, name: true, viewsNumber: true, description: true });
      response.lesson = lesson;
    }

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
module.exports = handleGetLesson;

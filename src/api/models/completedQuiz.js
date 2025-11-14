const { default: mongoose } = require("mongoose");

const completedQuizSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  courseId:{ type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
  lessonId:{ type: mongoose.Schema.Types.ObjectId, ref: "lesson", required: true },
  answers:[{
    isCorrect:Boolean,
    answerIdx:Number,
    answerId:mongoose.Schema.Types.ObjectId,
    questionId:mongoose.Schema.Types.ObjectId,
  }]
});
const completedQuizModel = mongoose.model("completedQuiz", completedQuizSchema, "completedQuizzes");
module.exports = completedQuizModel;

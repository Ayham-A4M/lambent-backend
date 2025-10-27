const quizModel = require("../../../models/quiz");

const handleDeleteQuestion = async (req, res, next) => {
    try {
        const { courseId, lessonId, questionId } = req.params;
        const response = await quizModel.findOneAndUpdate({ courseId, lessonId },
            { $pull: { questions: { _id: questionId } } }
        );
        if (response) {
            return res.status(200).send({ msg: "questions deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleDeleteQuestion;
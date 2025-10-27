const quizModel = require("../../../models/quiz");

const handleUpdateQuestion = async (req, res, next) => {
    try {
        const { courseId, lessonId, questionId } = req.params;
        console.log(questionId)
        const  editQuestion  = req.body;
        console.log(editQuestion);
        const response = await quizModel.findOneAndUpdate({ courseId, lessonId, "questions._id": questionId }, {
            "questions.$": editQuestion,
        }
        );
        if (response) {
            console.log(response);
            return res.status(200).send({ msg: "question has updated successfully" });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdateQuestion
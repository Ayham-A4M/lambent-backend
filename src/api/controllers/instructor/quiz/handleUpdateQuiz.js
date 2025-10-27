const courseModel = require('../../../models/course');
const quizModel = require('../../../models/quiz');


const handleUpdatingQuiz = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;
        const { newQuestions } = req.body;
        const instructorId = res.locals.id;
        const response = await quizModel.findOneAndUpdate({ courseId, lessonId, instructorId }, {
            $push: {
                questions: {
                    $each: newQuestions
                }
            }
        }, { upsert: true });

        return res.status(200).send({ msg: "questions saved successfully" });

    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdatingQuiz;
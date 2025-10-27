const { default: mongoose } = require('mongoose');

const quizSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Types.ObjectId, ref: 'lesson', required: true },
    courseId: { type: mongoose.Types.ObjectId, ref: 'course', required: true },
    instructorId: { type: mongoose.Types.ObjectId, ref: 'instructor', required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{
                option: { type: String, required: true },
                isCorrect: { type: Boolean, required: true }
            }],
            explanation: { type: String, required: true },
            difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
        }
    ]
});
const quizModel = mongoose.model('quiz', quizSchema, 'quizzes');
module.exports = quizModel;
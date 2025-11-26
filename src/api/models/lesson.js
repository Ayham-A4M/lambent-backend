const { default: mongoose } = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pdfUrl:{type:String,required:false},
    description: { type: String, required: true },
    courseId: { type: mongoose.Types.ObjectId, ref: 'course', required: true },
    lessonNumber: { type: Number, required: true },
    lessonContent: { type: String, required: false },
});
const lessonModel = mongoose.model('lesson', lessonSchema, 'lessons');
module.exports = lessonModel;

const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const courseProgressSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'user', required: true },
    courseId: { type: ObjectId, ref: 'course', required: true },
    completedLessons: { type: [Number], required: false, default: [] },
    progressPercentage: { type: Number, default: 0 },
    currentLesson: { type: Number, default: -1 }, // last lesson that user accesss to it !! and if it -1 mean he didnt start
    joiningDate: { type: Date, required: true },
});
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
const courseProgressModel = mongoose.model('courseProgress', courseProgressSchema, 'coursesProgress');
module.exports = courseProgressModel;
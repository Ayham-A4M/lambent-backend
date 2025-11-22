const { default: mongoose } = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    type: { type: String, required: true },
    totalLessons: { type: Number, default: 0, max: 70 },
    totalLearners: { type: Number, default: 0 },
    instructorId: { type: mongoose.Types.ObjectId, ref: 'instructor', required: true },
    comingSoon: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
const courseModel = mongoose.model('course', courseSchema, 'courses');
module.exports = courseModel;
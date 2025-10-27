const { default: mongoose } = require("mongoose");

const instructorSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true, },
    gender: { type: String, required: true },
    tokenVersion: { type: Number, default: 0 },
    role: { type: String, default: "instructor" },
    image: { type: String },
    numberOfCourses: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    country: { type: String, required: true },
    bio: { type: String, max: 3000, default: "" }

});
const instructorModel = mongoose.model('instructor', instructorSchema, 'instructors');
module.exports = instructorModel;
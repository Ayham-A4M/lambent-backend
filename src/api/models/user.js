const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    tokenVersion: { type: Number, default: 0 },
    role: { type: String, enum: ["user", "admin"], required: true },
    lastDateStreak: { type: Date, required: false }, // its not required in the creation user
    longestStreak: { type: Number, default: 0 },
    currentStreakSerial: { type: Number, default: 0 },
});
const userModel = mongoose.model('user', userSchema, 'users');
module.exports = userModel;
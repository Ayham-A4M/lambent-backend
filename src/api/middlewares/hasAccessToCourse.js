const courseProgressModel = require('../models/courseProgress');
const courseModel = require("../models/course");
const AppError = require('../utils/appError');
const hasAccessToCourse = async (req, res, next) => {
    try {
        const id = res.locals.id;
        const role = res.locals.role
        const courseId = req.params.courseId
        let hasAccess = false;
        if (role === "instructor") {
            const response = await courseModel.findOne({ instructorId: id, _id: courseId });
            if (response) { hasAccess = true }
        } else if (role === "user") {
            const response = await courseProgressModel.findOne({ userId: id, courseId });
            if (response) { hasAccess = true }
        }
        if (!hasAccess) {
            throw new AppError(403, { msg: "sorry you dont have access to this course" })
        }
        next();
    } catch (err) {
        next(err);
    }
}
module.exports = hasAccessToCourse
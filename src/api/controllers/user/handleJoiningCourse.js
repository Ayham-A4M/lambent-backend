
const coursesProgressModel = require('../../models/courseProgress');
const courseModel = require('../../models/course');
const handleJoiningCourse = async (req, res, next) => {
    try {
        // this need more logic for checking is the user has subscription for paid courses !!
        const userId = res.locals.id;
        const { courseId } = req.params;
        const joining = { userId, courseId, joiningDate: new Date() };

        const response = await new coursesProgressModel(joining).save();
        if (response) {
            await courseModel.findByIdAndUpdate(courseId, { $inc: { totalLearners: 1 } });
            return res.status(200).send({ msg: "joining course successfully" });
        }
        
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({ msg: "you are already join the course" });
        }
        next(err);
    }
}
module.exports = handleJoiningCourse
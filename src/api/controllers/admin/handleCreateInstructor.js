const instructorModel = require('../../models/instructor');
const userModel = require('../../models/user');
const AppError = require('../../utils/appError')
const bcrypt = require('bcrypt')
const handleCreateInstructor = async (req, res, next) => {
    try {
        const instructor = JSON.parse(req.body.instructor);
        if (!req.file) {
            throw new AppError(400, "image is required")
        }
        const [res1, res2] = await Promise.all([userModel.findOne({ email: instructor.email }), instructorModel.findOne({ email: instructor.email })]);
        if (res1 || res2) {
            throw new AppError(400, "unvalid email");
        }
        const imgUrl = `/public/${req.file.filename}`;
        instructor.image = imgUrl;
        const hashedPassword = await bcrypt.hashSync(instructor.password, 10);
        instructor.password = hashedPassword;
        const response = await new instructorModel(instructor).save();
        if (response) {
            return res.status(200).send({ msg: "instructor has been saved successfully" });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleCreateInstructor
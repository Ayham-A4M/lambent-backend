const instructorModel = require('../../models/instructor');
const AppError = require('../../utils/appError');
const handleGetInstructorById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await instructorModel.findById(id, { password: false, tokenVersion: false, rating: false, numberOfCourses: false, role: false });
        if (!response) {
            throw new AppError(404, "some thing went wrong | the instructor does not exist");
        }
        return res.status(200).send({ instructor: response });
    } catch (err) {
        next(err)
    }
}
module.exports = handleGetInstructorById
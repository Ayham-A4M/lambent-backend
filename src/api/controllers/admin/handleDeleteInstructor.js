const instructorModel = require('../../models/instructor');
const AppError = require('../../utils/appError');
const handleDeleteInstructor = async (req, res, next) => {
    try {
        const instructorId = req.params.id;
        const response = await instructorModel.findByIdAndDelete(instructorId);
        if (!response) {
            throw new AppError(404, "some thing went wrong | the instructor does not exist");
        }
        return res.status(200).send({ msg: "instructor has been deleted successfully" });
    } catch (err) {
        next(err);
    }
}
module.exports = handleDeleteInstructor;
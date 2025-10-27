const instrucorModel = require('../../models/instructor');
const handleUpdateInstructor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const instructor = JSON.parse(req.body.instructor);
        if (req.file) {
            const imgUrl = `/public/${req.file.filename}`;
            instructor.image = imgUrl;
        }
        const response = await instrucorModel.findByIdAndUpdate(id, instructor);
        if (response) {
            return res.status(200).send({ msg: "instructor has been updated successfully" });
        }
    } catch (err) {
        next(err)
    }
}
module.exports = handleUpdateInstructor;
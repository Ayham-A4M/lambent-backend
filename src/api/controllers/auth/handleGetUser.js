const instructorModel = require("../../models/instructor");
const userModel = require("../../models/user");

const handleGetUser = async (req, res, next) => {
    try {
        const { id, role } = res.locals;
        let user = undefined
        if (role == "user" || role == "admin") { user = await userModel.findById(id); }
        else if (role == "instructor") { user = await instructorModel.findById(id); }
        const response = { userName: user.userName, role };
        if (role === "user") {
            response.lastDateStreak = user.lastDateStreak;
        }

        return res.status(200).send(response);
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetUser
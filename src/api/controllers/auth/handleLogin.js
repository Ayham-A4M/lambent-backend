const userModel = require("../../models/user");
const instructorModel = require('../../models/instructor')
const jwt = require('jsonwebtoken');
const AppError = require("../../utils/appError");
const bcrypt = require('bcrypt');
const handleLogin = async (req, res, next) => {
    try {
        const { email, password, isInstructor } = req.body;
        let existUser;
        if (isInstructor) {
            existUser = await instructorModel.findOne({ email });
            if (!existUser) { throw new AppError(404, "email or password or both is wrong") }

        } else {
            existUser = await userModel.findOne({ email });
            if (!existUser) { throw new AppError(404, "email or password or both is wrong") }
        }
        await bcrypt.compare(password, existUser.password).then((response) => {
            if (!response) {
                throw new AppError(404, "email or password or both is wrong")
            }
        })
        const payload = { role: existUser.role, id: existUser._id, tokenVersion: existUser.tokenVersion, email: existUser.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.cookie("token", accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        const response = {
            msg: "logged in successfully",
            role: existUser.role,
            userName: existUser.userName
        }
        if (existUser.role === "user") {
            response.lastDateStreak = existUser?.lastDateStreak;
        }
        return res.status(200).send(response)

    } catch (err) {
        next(err);
    }

}
module.exports = handleLogin;
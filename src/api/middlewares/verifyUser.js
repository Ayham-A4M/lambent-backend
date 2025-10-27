const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const AppError = require('../utils/appError');
const instructorModel = require('../models/instructor');
const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { throw new AppError(401, "unauthorized") }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { return res.status(401).send({ msg: 'unauthorized' }) }
            const role = decode.role;
            let userFromDb;
            if (role === "user") {
                userFromDb = await userModel.findById(decode.id);
            } else if (role === "instructor") {
                userFromDb = await instructorModel.findById(decode.id);
                // here will get instructor
            } else if (role === "admin") {
                userFromDb = await userModel.findOne({ role: "admin", _id: decode.id });
            }

            if (!userFromDb) {
                return res.status(404).send({ msg: "user not found" });
            }
            if (userFromDb.tokenVersion != decode.tokenVersion) {
                return res.status(401).send({ msg: 'unauthorized' })
            }

            res.locals.id = decode.id;
            res.locals.role = role;
            next();
        })
    } catch (err) {
        next(err);
    }
}
module.exports = verifyUser
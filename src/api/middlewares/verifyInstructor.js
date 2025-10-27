const jwt = require('jsonwebtoken');
const instructorModel = require('../models/instructor');
const AppError = require('../utils/appError');
const verifyInstructor = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { throw new AppError(401, "unauthorized") }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { return res.status(401).send({ msg: 'unauthorized' }) }
            const role = decode.role;
            const instructor = await instructorModel.findOne({ _id: decode.id, role: role });
            if (!instructor) {
                return res.status(401).send({ msg: "unauthorized" });
            } else {
                res.locals.id = decode.id;
                res.locals.role = decode.role
                next();
            }
        })
    } catch (err) {
        next(err);
    }
}
module.exports = verifyInstructor
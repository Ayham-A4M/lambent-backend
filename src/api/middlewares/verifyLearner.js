const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const AppError = require('../utils/appError');
const verifyLearner = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { throw new AppError(401, "unauthorized") }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { return res.status(401).send({ msg: 'unauthorized' }) }
            const user = await userModel.findOne({ _id: decode.id, role: "user" });
            if (!user) {
                return res.status(404).send({ msg: "user not found" });
            } else {
                res.locals.id = decode.id;
                res.locals.role = decode.role;
                next();
            }
        })
    } catch (err) {
        next(err);
    }
}
module.exports = verifyLearner
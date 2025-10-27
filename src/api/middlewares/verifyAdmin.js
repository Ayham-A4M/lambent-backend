const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const AppError = require('../utils/appError');
const verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { throw new AppError(401, "unauthorized") }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { return res.status(401).send({ msg: 'unauthorized' }) }
            const role = decode.role;
            const admin = await userModel.findOne({ _id: decode.id, role: role });
            if (!admin) {
                return res.status(404).send({ msg: "unauthorized" });
            } else {
                res.locals.id = decode.id;
                next();
            }
        })
    } catch (err) {
        next(err);
    }
}
module.exports = verifyAdmin
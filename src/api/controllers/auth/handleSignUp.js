const userModel = require('../../models/user')
const AppError = require('../../utils/appError');
const bcrybt = require('bcrypt');
const handleSignUp = async (req, res, next) => {
    try {
        const register = req.body;
        // first check if there any user with this email
        const emailCheck = await userModel.findOne({ email: register.email });
        const userNameCheck = (register.userName === emailCheck?.userName)
        if (emailCheck || userNameCheck) { throw new AppError(400, "userName or email is wrong") }
        // start hash the password
        const hashPassword = await bcrybt.hashSync(register.password, 10);
        register.password = hashPassword;
        register.role = "user";
        const saveUser = new userModel(register);
        saveUser.save().then((response) => {
            return res.status(200).send({ msg: 'user saved successfully please login now' })
        })
    } catch (err) {
        next(err);
    }
}
module.exports = handleSignUp
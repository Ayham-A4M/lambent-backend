const joi = require('joi');
const signUpSchema = joi.object({
    userName: joi.string().min(3).max(25).required(),
    email: joi.string().email().required(),
    gender: joi.string().valid("male", "female").required(),
    age: joi.number().required(),
    password: joi.string().min(8).max(30).required(),
});
module.exports = signUpSchema
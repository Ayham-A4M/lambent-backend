const joi = require('joi');
const instructorSchema = joi.object({
    userName: joi.string().min(3).max(25).required(),
    email: joi.string().email().required(),
    gender: joi.string().valid("male", "female").required(),
    age: joi.number().required(),
    country:joi.string().min(5).required(),
    bio:joi.string().max(1024).required(),
    password: joi.string().min(8).max(30).required(),
});
module.exports = instructorSchema
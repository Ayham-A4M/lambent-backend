const joi = require('joi');
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
    isInstructor:joi.boolean().required()
});
module.exports = loginSchema
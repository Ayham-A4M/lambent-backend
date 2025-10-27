const joi = require('joi');
const lessonSchema = joi.object({
    name:joi.string().max(100).required(),
    description:joi.string().max(1024).required(),
});
module.exports = lessonSchema
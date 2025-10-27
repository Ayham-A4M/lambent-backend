const joi = require('joi');
const coursesTypes = require('../../../helpers/coursesTypes');
const courseSchema = joi.object({
    name:joi.string().max(50).required(),
    description:joi.string().max(1024).required(),
    isFree:joi.boolean().required(),
    type:joi.string().valid(...coursesTypes).required(),
});
module.exports = courseSchema
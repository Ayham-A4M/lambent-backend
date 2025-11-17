const joi = require('joi');
const learningTimeSchema = joi.object({
    learningTime:joi.number().required(),
});
module.exports = learningTimeSchema
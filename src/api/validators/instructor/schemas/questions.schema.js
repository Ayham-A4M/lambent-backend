const joi = require('joi');
const optionSchema = joi.object({
    option: joi.string().required(),
    isCorrect: joi.boolean().required()
})
const itemSchema = joi.object({
    question: joi.string().required(),
    options: joi.array().items(optionSchema).min(2).max(6),
    explanation: joi.string().required(),
    difficulty: joi.string().valid(...["easy", "medium", "hard"]).required(),
    id: joi.string().optional(),
    _id: joi.string().optional()
})
const questionsSchema = joi.object({
    newQuestions: joi.array().items(itemSchema).required()
});
module.exports = { questionsSchema, itemSchema }
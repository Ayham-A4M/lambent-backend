const learningTimeSchema = require("./schemas/learningTime.schema");

const learningTimeValidator = (req, res, next) => {
  try {
    const body = req.body;
    if (body?.learningTime) body.learningTime = parseFloat(body.learningTime);
    const { error } = learningTimeSchema.validate(body);
    if (error) {
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = learningTimeValidator;

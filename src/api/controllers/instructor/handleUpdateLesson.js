const courseModel = require("../../models/course");
const lessonModel = require("../../models/lesson");
const AppError = require("../../utils/appError");
const handleUpdateLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    if (!courseId || !lessonId) {
      throw new AppError(400, "no specific lesson");
    }
    const { lessonContent } = req.body;
    if (!lessonContent) {
      throw new AppError(400, "no thing changing for updated");
    }
    const update = {};
    if (req.file) {
      const url = `/public/${req.file.filename}`;
      update.pdfUrl = url;
    }
    if (lessonContent) {
      update.lessonContent = lessonContent;
    }
    const response = await lessonModel.findOneAndUpdate({ _id: lessonId, courseId }, update);
    if (response) {
      return res.status(200).send({ msg: "lesson has been updated successfully" });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = handleUpdateLesson;

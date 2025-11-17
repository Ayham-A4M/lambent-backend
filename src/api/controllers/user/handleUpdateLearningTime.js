const learningTimeModel = require("../../models/learningTime");
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);
const getLearningTime = (dayIdx, learningTime) => {
  const days = [
    { dayIdx: 0, learningTime: 0 },
    { dayIdx: 1, learningTime: 0 },
    { dayIdx: 2, learningTime: 0 },
    { dayIdx: 3, learningTime: 0 },
    { dayIdx: 4, learningTime: 0 },
    { dayIdx: 5, learningTime: 0 },
    { dayIdx: 6, learningTime: 0 },
  ];
  const newDays = days.map((e) => {
    if (e.dayIdx === dayIdx) {
      e.learningTime = learningTime;
      return e;
    } else {
      return e;
    }
  });
  console.log(newDays, " days");
  return newDays;
};
const handleUpdateLearningTime = async (req, res, next) => {
  try {
    const userId = res.locals.id;
    const { learningTime } = req.body;
    const year = new Date().getFullYear();
    const weekIndex = dayjs().isoWeek();
    const dayIdx = new Date().getDay();

    const isExisting = await learningTimeModel.exists({ year, weekIndex });
    if (isExisting) {
      const result = await learningTimeModel.findOneAndUpdate(
        { year, userId, weekIndex },
        {
          $inc: {
            "learningTime.$[elem].learningTime": learningTime,
          },
        },
        {
          arrayFilters: [{ "elem.dayIdx": dayIdx }],
        }
      );
      return res.status(200).send({});
    } else {
      const creating = await new learningTimeModel({ weekIndex, year, monthIndex: new Date().getMonth(), userId, learningTime: getLearningTime(dayIdx, learningTime) }).save();
      return res.status(200).send({});
    }
  } catch (err) {
    next(err);
  }
};
module.exports = handleUpdateLearningTime;

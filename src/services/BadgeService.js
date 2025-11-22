const completedBadge = require("../api/models/completedBadge");
const userModel = require("../api/models/user");
const learningTimeModel = require("../api/models/learningTime");
const { default: mongoose } = require("mongoose");

const checkLearningTimeBadges = async (userId) => {
  console.log("hitted the check learning time badges");
  const [result, badges] = await Promise.all([
    learningTimeModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$learningTime" },
      {
        $group: {
          _id: null,
          totalMinutes: { $sum: "$learningTime.learningTime" },
        },
      },
    ]),
    completedBadge.find({ userId }, { _id: true }),
  ]);
  badgesIds = [];
  if (badges.length > 0) {
    badgesIds = badges.map((b) => b._id.toString());
  }
  const userLearningTime = result[0]?.totalMinutes || 0;
  if (userLearningTime < 60) return null;

  const newBadges = [];
  if (!badgesIds.includes("691dcdcca0efe16cd4380e56") && userLearningTime >= 60) newBadges.push({ userId, badgeId: "691dcdcca0efe16cd4380e56", earnedAt: new Date() }); // this is for warrior star

  if (!badgesIds.includes("691dd694a0efe16cd4380e5f") && userLearningTime >= 300) newBadges.push({ userId, badgeId: "691dd694a0efe16cd4380e5f", earnedAt: new Date() }); // knowladge seeker

  if (!badgesIds.includes("691dd64fa0efe16cd4380e5c") && userLearningTime >= 3000) newBadges.push({ userId, badgeId: "691dd64fa0efe16cd4380e5c", earnedAt: new Date() }); // academic adventure

  if (!badgesIds.includes("691dd60da0efe16cd4380e5a") && userLearningTime >= 30000) newBadges.push({ userId, badgeId: "691dd60da0efe16cd4380e5a", earnedAt: new Date() }); // wisdom keeper

  if (!newBadges.length > 0) return null;
  try {
    const response = await completedBadge.insertMany(newBadges);
    console.log(response);
    if (response) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};
module.exports = { checkLearningTimeBadges };

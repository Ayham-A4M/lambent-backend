const completedBadge = require("../api/models/completedBadge");
const userModel = require("../api/models/user");
const learningTimeModel = require("../api/models/learningTime");
const completedQuizModel = require("../api/models/completedQuiz");
const { default: mongoose } = require("mongoose");

const checkLearningTimeBadges = async (userId) => {
  const [result, badges] = await Promise.all([
    learningTimeModel
      .aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$learningTime" },
        {
          $group: {
            _id: null,
            totalMinutes: { $sum: "$learningTime.learningTime" },
          },
        },
      ]),
    completedBadge.find({ userId }, { _id: true }).lean(),
  ]);
  let badgesIds = [];
  if (badges?.length > 0) {
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
    if (response) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};
const cehckStreakBadges = async (userId) => {
  try {
    const [streaks, badges] = await Promise.all([userModel.findById(userId, { longestStreak: true }).lean(), completedBadge.find({ userId }, { _id: true }).lean()]);
    let badgesIds = [];
    if (badges?.length > 0) badgesIds = badges.map((b) => b._id.toString());
    const newBadges = [];
    console.log("streaks : ", streaks);
    const longestStreak = streaks?.longestStreak;
    console.log("hitted longest streaks : ", longestStreak);
    if (longestStreak >= 7 && !badgesIds.includes("691dce67a0efe16cd4380e58")) newBadges.push({ userId, badgeId: "691dce67a0efe16cd4380e58", earnedAt: new Date() });
    if (longestStreak >= 30 && !badgesIds.includes("691dd7c8a0efe16cd4380e61")) newBadges.push({ userId, badgeId: "691dd7c8a0efe16cd4380e61", earnedAt: new Date() });
    if (longestStreak >= 365 && !badgesIds.includes("691dd831a0efe16cd4380e64")) newBadges.push({ userId, badgeId: "691dd831a0efe16cd4380e64", earnedAt: new Date() });
    console.log("new badges", newBadges);
    if (!newBadges.length > 0) return null;

    const response = await completedBadge.insertMany(newBadges);
    if (response) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};
const checkAnswersBadges = async (userId) => {
  try {
    const [answers, badges] = await Promise.all([
      completedQuizModel.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: "$userId",
            totalAnswers: { $sum: { $size: "$answers" } },
          },
        },
      ]),
      completedBadge.find({ userId }, { _id: true }).lean(),
    ]);
    console.log(answers, "answers");
    const answersNumber = answers[0].totalAnswers;
    console.log(answersNumber, "asnwersNumber");
    let badgesIds = [];
    if (badges?.length > 0) badgesIds = badges.map((b) => b._id.toString());
    const newBadges = [];

    if (!badgesIds.includes("692312373fd1b57212f7a6ac") && answersNumber >= 1) newBadges.push({ userId, badgeId: "692312373fd1b57212f7a6ac", earnedAt: new Date() });
    if (!badgesIds.includes("691dd8b8a0efe16cd4380e66") && answersNumber >= 100) newBadges.push({ userId, badgeId: "691dd8b8a0efe16cd4380e66", earnedAt: new Date() });

    const response = await completedBadge.insertMany(newBadges);
    if (response) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};
module.exports = { checkLearningTimeBadges, cehckStreakBadges, checkAnswersBadges };

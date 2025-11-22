const { default: mongoose } = require("mongoose");
const badgeModel = require("../../models/badge");
const completedBadgeModel = require("../../models/completedBadge");
const handleGetBadges = async (req, res, next) => {
  try {
    const userId = res.locals.id;
    const [badges, userBadgesIds] = await Promise.all([badgeModel.find({}).lean(), completedBadgeModel.find({ userId }, { badgeId:true }).lean()]);
    let badgesIdsSet = new Set([]);
    if (userBadgesIds.length > 0) {
      badgesIdsSet = new Set(userBadgesIds.map((b) => b.badgeId.toString()));
    }
    if (badgesIdsSet.size == 0) return res.status(200).send(badges);
    const response = badges.map((b) => {    
      if (badgesIdsSet.has(b._id.toString())) {
        b.completed = true;
        return b;
      } else {
        b.completed = false;
        return b;
      }
    });
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
module.exports = handleGetBadges;

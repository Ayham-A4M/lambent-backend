const { default: mongoose } = require("mongoose");

const completedBadgeSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,required:true},
    badgeId:{type:mongoose.Types.ObjectId,required:true},
    earnedAt:{type:Date,required:true},
});
const completedBadgeModel = mongoose.model("completedBadge", completedBadgeSchema, "completedBadges");
module.exports = completedBadgeModel;
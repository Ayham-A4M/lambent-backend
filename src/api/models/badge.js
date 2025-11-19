const { default: mongoose } = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // how to get it
  type: { type: String, enum: ["questions", "time", "streak", "courses"], required: true },
  iconName: { type: String, required: true }, // this is for mapping with front end :)
});
const badgeModel = mongoose.model("badge", badgeSchema, "badges");
module.exports = badgeModel;

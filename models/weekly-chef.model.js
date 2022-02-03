const mongoose = require("mongoose")

const WeeklyChefSchema = new mongoose.Schema({
  chef: { type: mongoose.Types.ObjectId, ref: "Chef", required: true },
})

module.exports = WeeklyChefModel = mongoose.model(
  "WeeklyChef",
  WeeklyChefSchema
)

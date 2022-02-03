const mongoose = require("mongoose")

const ChefSchema = new mongoose.Schema({
  imgUrl: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, default: null },
})
module.exports = ChefModel = mongoose.model("Chef", ChefSchema)

const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
  imgUrl: { type: String, default: null },
  name: { type: String, required: true },
  description: { type: String },
  chef: { type: mongoose.Types.ObjectId, ref: "Chef", default: null },
  PopularRestaurant: {
    type: Boolean,
    require: true,
  },
})

module.exports = RestaurantModel = mongoose.model(
  "Restaurant",
  RestaurantSchema
)

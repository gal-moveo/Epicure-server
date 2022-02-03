const mongoose = require("mongoose")

const IconSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  type: { type: String, required: true },
})

const DishSchema = new mongoose.Schema({
  imgUrl: { type: String, default: null },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: null },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    default: null,
  },
  icon: {
    type: IconSchema,
    default: null,
  },
})
module.exports = DishModel = mongoose.model("Dish", DishSchema)

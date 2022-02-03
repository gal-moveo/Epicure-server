const mongoose = require("mongoose")

const SignatureDishSchema = new mongoose.Schema({
  dish: { type: mongoose.Types.ObjectId, ref: "Dish", required: true },
})
module.exports = SignatureDishModel = mongoose.model(
  "SignatureDish",
  SignatureDishSchema
)

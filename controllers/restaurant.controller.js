const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {
  create,
  update,
  get,
  delete_,
  getAll,
  addPopularRestaurant,
  deletePopularRestaurant,
  getAllPopularRestaurants,
  getAllRestaurantsOfChef,
  getFullDataRestaurant,
  getAllFullDataRestaurants,
} = require("../handlers/restaurant.handler")

router.post("/createRestaurant", auth, create)
router.put("/updateRestaurant/:id", auth, update)
router.get("/getRestaurant/:id", get)
router.get("/getAll/", getAll)
router.delete("/deleteRestaurant/:id", auth, delete_)

router.post("/addPopularRestaurant/:id", auth, addPopularRestaurant)
router.delete("/deletePopularRestaurant/:id", auth, deletePopularRestaurant)
router.get("/getAllPopularRestaurants", getAllPopularRestaurants)

router.get("/getAllRestaurantsOfChef/:id", getAllRestaurantsOfChef)

router.get("/getFullDataRestaurant/:id", getFullDataRestaurant)
router.get("/getAllFullDataRestaurants", getAllFullDataRestaurants)

module.exports = router

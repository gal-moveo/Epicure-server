const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {
  create,
  update,
  get,
  delete_,
  getAll,
  addSignatureDish,
  deleteSignatureDish,
  getAllSignatureDishes,
  getAllDishesOfRestaurant,
  getFullDataOnDish,
  getAllFullDataOnDishes,
} = require("../handlers/dish.handler")

router.post("/createDish", auth, create)
router.put("/updateDish/:id", auth, update)
router.get("/getDish/:id", get)
router.get("/getAll/", getAll)
router.delete("/deleteDish/:id", auth, delete_)
router.put("/addSignatureDish/:id", auth, addSignatureDish)
router.delete("/deleteSignatureDish/:id", auth, deleteSignatureDish)
router.get("/getAllSignatureDishes", getAllSignatureDishes)
router.get("/getAllDishesOfRestaurant/:id", getAllDishesOfRestaurant)
router.get("/getFullDataOnDish/:id", getFullDataOnDish)
router.get("/getAllFullDataOnDishes", getAllFullDataOnDishes)
module.exports = router

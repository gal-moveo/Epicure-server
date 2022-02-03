const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {
  create,
  update,
  get,
  delete_,
  getAll,
  newWeeklyChef,
  getWeeklyChef,
} = require("../handlers/chefs.handler")

router.post("/createChef", auth, create)
router.put("/updateChef/:id", auth, update)
router.get("/getChef/:id", get)
router.get("/getAll/", getAll)
router.delete("/deleteChef/:id", auth, delete_)

router.put("/newWeeklyChef/:id", auth, newWeeklyChef)
router.get("/getWeeklyChef/", getWeeklyChef)

module.exports = router

const mongoose = require("mongoose")
const ChefModel = require("../models/chef.model")
const WeeklyChefModel = require("../models/weekly-chef.model")

const create = async (req, res) => {
  const { imgUrl, firstName, lastName, description } = req.body
  try {
    const newChef = new ChefModel({
      imgUrl,
      firstName,
      lastName,
      description,
    })
    await newChef.save()
    res.status(200).json({
      newChef: newChef,
    })
  } catch (err) {
    return res.status(500).json({ errors: ["catch server error"] })
  }
}
const update = async (req, res) => {
  const chefNewInfo = req.body
  ChefModel.findByIdAndUpdate({ _id: req.params.id }, chefNewInfo).exec(
    (err, data) => {
      if (err) {
        res.status(500).send("error")
      } else {
        res.status(200).json(data)
      }
    }
  )
}
const get = async (req, res) => {
  try {
    ChefModel.findById({ _id: req.params.id }, async (err, data) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(data)
      }
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
const getAll = async (req, res) => {
  try {
    ChefModel.find({}, async (err, data) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(data)
      }
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
const delete_ = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  try {
    ChefModel.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(data)
      }
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
//chef of the week
//change to update
const newWeeklyChef = async (req, res) => {
  try {
    WeeklyChefModel.deleteMany({}, async (err, data) => {
      if (err) {
        res.status(500).json(err)
      } else {
        const weeklyChef = new WeeklyChefModel({
          chef: req.params.id,
        })
        try {
          await weeklyChef.save()
          res.status(200).json(data)
        } catch (error) {
          res.status(200).json(data)
        }
      }
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
const getWeeklyChef = async (req, res) => {
  WeeklyChefModel.aggregate([
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef",
      },
    },
  ]).exec((err, data) => {
    if (err) {
      res.status(500).send("error").json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
module.exports = {
  create,
  update,
  get,
  getAll,
  delete_,
  newWeeklyChef,
  getWeeklyChef,
}

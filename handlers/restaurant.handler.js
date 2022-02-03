const mongoose = require("mongoose")
const RestaurantModel = require("../models/restaurant.model")
//  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
//    return res.status(500).send("no valid params")
//  }
const create = async (req, res) => {
  const { imgUrl, name, description, chef, PopularRestaurant } = req.body
  try {
    const newRestaurant = new RestaurantModel({
      imgUrl,
      name,
      description,
      chef,
      PopularRestaurant,
    })
    await newRestaurant.save()
    res.status(200).json({
      newRestaurant,
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: ["catch server error"] })
  }
}
const update = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  const restaurantNewInfo = req.body
  RestaurantModel.findByIdAndUpdate(
    { _id: req.params.id },
    restaurantNewInfo
  ).exec((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(data)
    }
  })
}
const get = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  try {
    RestaurantModel.findById({ _id: req.params.id }, async (err, data) => {
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
    RestaurantModel.find({}, async (err, data) => {
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
  try {
    RestaurantModel.findByIdAndDelete(
      { _id: req.params.id },
      async (err, data) => {
        if (err) {
          res.status(500).json(err)
        } else {
          res.status(200).json(data)
        }
      }
    )
  } catch (err) {
    res.status(500).json(err)
  }
}
const addPopularRestaurant = async (req, res) => {
  RestaurantModel.findByIdAndUpdate(
    { _id: req.params.id },
    { PopularRestaurant: true }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
const deletePopularRestaurant = async (req, res) => {
  RestaurantModel.findByIdAndUpdate(
    { _id: req.params.id },
    { PopularRestaurant: false }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
const getAllPopularRestaurants = async (req, res) => {
  RestaurantModel.aggregate([
    {
      $match: {
        PopularRestaurant: true,
      },
    },
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef",
      },
    }, //asd
  ]).exec((err, data) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
const getAllRestaurantsOfChef = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  RestaurantModel.aggregate([
    {
      $match: {
        chef: new mongoose.Types.ObjectId(req.params.id),
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
// res&chef
const getFullDataRestaurant = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  RestaurantModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef_",
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
// res&chef
const getAllFullDataRestaurants = async (req, res) => {
  RestaurantModel.aggregate([
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef_",
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
  addPopularRestaurant,
  deletePopularRestaurant,
  getAllPopularRestaurants,
  getAllRestaurantsOfChef,
  getFullDataRestaurant,
  getAllFullDataRestaurants,
}

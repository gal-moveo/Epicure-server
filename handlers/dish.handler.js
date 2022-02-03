const mongoose = require("mongoose")
const DishModel = require("../models/dish.model")
const SignatureDishModel = require("../models/signatureDish.model")

const create = async (req, res) => {
  const { imgUrl, name, description, price, restaurant, icon } = req.body
  try {
    const newDish = new DishModel({
      imgUrl,
      name,
      description,
      price,
      restaurant,
      icon,
    })
    await newDish.save()
    res.status(200).json({
      newDish,
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
  const dishNewInfo = req.body
  DishModel.findByIdAndUpdate({ _id: req.params.id }, dishNewInfo).exec(
    (err) => {
      if (err) {
        res.status(500).send("error")
      } else {
        res.status(200).json("update success")
      }
    }
  )
}
const get = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  try {
    DishModel.findById({ _id: req.params.id }, async (err, data) => {
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
    DishModel.find({}, async (err, data) => {
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
    DishModel.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
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
//Signature
//check existing Signature dish from req restaurant
const addSignatureDish = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  try {
    const newSignatureDish = new SignatureDishModel({
      dish: req.params.id,
    })
    await newSignatureDish.save()
    res.status(200).json({
      newDish: newSignatureDish,
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: ["catch server error"] })
  }
}
const deleteSignatureDish = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  try {
    SignatureDishModel.findByIdAndDelete(
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
const getAllSignatureDishes = async (req, res) => {
  SignatureDishModel.aggregate([
    {
      $lookup: {
        from: "dishes",
        localField: "dish",
        foreignField: "_id",
        as: "dish",
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "dish.restaurant",
        foreignField: "_id",
        as: "restaurant",
      },
    },
  ]).exec((err, data) => {
    if (err) {
      res.status(500).send("error").json(err)
    } else {
      let resData = []
      data.forEach((element) => {
        let dish = element.dish[0]
        let restaurantName = element.restaurant[0].name
        dish = { ...dish, restaurantName }
        console.log(dish)
        resData.push(dish)
      })
      res.status(200).json(resData)
    }
  })
}

const getAllDishesOfRestaurant = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  DishModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(req.params.id),
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
//get dish&res
const getFullDataOnDish = async (req, res) => {
  if (req.params.id.length < 16 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).send("no valid params")
  }
  DishModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurant",
        foreignField: "_id",
        as: "restaurant",
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
//get all dish&res
const getAllFullDataOnDishes = async (req, res) => {
  DishModel.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurant",
        foreignField: "_id",
        as: "restaurant",
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
  addSignatureDish,
  deleteSignatureDish,
  getAllSignatureDishes,
  getAllDishesOfRestaurant,
  getFullDataOnDish,
  getAllFullDataOnDishes,
}

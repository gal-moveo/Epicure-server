const mongoose = require("mongoose")
const UserModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await UserModel.find({ email })
    if (user.length > 0) {
      //console.log(user);
      return res
        .status(400)
        .json({ errors: [{ message: "user already exists" }] })
    }

    user = new UserModel({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    //creat a payload to jwt
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "2H" }, //options
      (err, token) => {
        if (err) throw err
        return res.status(200).json({ token })
      }
    )
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: ["catch server error"] })
  }
}

module.exports = {
  register,
}

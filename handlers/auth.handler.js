const mongoose = require("mongoose")
const UserModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    //we need to change to findOne and we will not accept a array
    //and that will solve for us the problem of access to zero place in the array
    let user = await UserModel.find({ email })

    //we need to change the error res to same massage because security issues

    if (!user) {
      return res.status(400).json({
        errors: [{ message: "email not exists" }],
      })
    }
    const isMatchPass = await bcrypt.compare(password, user[0].password)

    if (!isMatchPass) {
      return res.status(400).json({
        errors: [{ message: "invalid password" }],
      })
    }

    const payload = {
      user: {
        id: user[0].id,
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
    return res.status(500).json({ errors: ["catch server error"] })
  }
}

const checkAuth = async (req, res) => {
  const user = await UserModel.findById(req.user.id)
  if (!user) {
    return res.status(401).json({ errors: [{ message: "user not exists" }] })
  }
  res.status(200).json(user)
}

module.exports = {
  login,
  checkAuth,
}

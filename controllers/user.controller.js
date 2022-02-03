const express = require("express")
const router = express.Router()
const { register } = require("../handlers/user.handler")

router.post("/register", register)

module.exports = router

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYWM4YjMxZjRhNDdkOTgwZDc2ZWI0In0sImlhdCI6MTY0MzgyNTMzMSwiZXhwIjoxNjQzODMyNTMxfQ.LLgSOM4nQaR-uB2lVwmCYNsqnokKQ6uNwpTsdTUqmBo


*/

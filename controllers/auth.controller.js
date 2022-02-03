const express = require("express")
const router = express.Router()
const { login, checkAuth } = require("../handlers/auth.handler")
const auth = require("../middleware/auth")
router.post("/login", login)
router.get("/checkAuth", auth, checkAuth)
module.exports = router

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYWM4YjMxZjRhNDdkOTgwZDc2ZWI0In0sImlhdCI6MTY0MzgyNTc0NSwiZXhwIjoxNjQzODMyOTQ1fQ.zse9f_aa3A9nwDElAoHE6-B9uh8KNXR1sKhcMx1PuVU


*/

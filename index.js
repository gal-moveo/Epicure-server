const express = require("express")
const connectDB = require("./config/db")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000
const app = express()
const morgan = require("morgan")
const cors = require("cors")

//del all res of chef
//del all dish of res
//add dif img==========
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4200",
  "http://localhost:5000",
]
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json()) // Parses body objects as JSON
app.use(bodyParser.urlencoded({ extended: false })) // make sure url params are of type string / array.
app.use(morgan("common"))
app.use(express.json({ extended: false }))

app.listen(PORT, async () => {
  console.log(`listen to PORT ${PORT}...`)
  await connectDB()
})

// Controllers
app.use("/chefs", require("./controllers/chefs.controller"))
app.use("/restaurants", require("./controllers/restaurant.controller"))
app.use("/dishes", require("./controllers/dish.controller"))
app.use("/users", require("./controllers/user.controller"))
app.use("/auth", require("./controllers/auth.controller"))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server on...",
  })
})

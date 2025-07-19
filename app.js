require("dotenv").config()
const express = require("express")
const cors = require("cors") // Import the cors package

const app = express()

app.use(cors()) // Use cors middleware to enable CORS for all routes
app.use(express.json())

const productRoutes = require("./routes/productRoutes")
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("✅ YESP Product Microservice is Live")
})

module.exports = app

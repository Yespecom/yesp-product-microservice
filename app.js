const express = require("express")
require("dotenv").config()
const app = express()
const productRoutes = require("./routes/productRoutes")

app.use(express.json())
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("✅ YESP Product Microservice is Live")
})

module.exports = app

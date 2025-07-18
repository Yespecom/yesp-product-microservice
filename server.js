const app = require("./app")
const PORT = process.env.PORT || 5003

app.listen(PORT, () => {
  console.log(`✅ YESP Product Microservice running on port ${PORT}`)
})

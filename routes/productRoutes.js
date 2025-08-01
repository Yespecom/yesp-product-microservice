const express = require("express")
const router = express.Router()
const controller = require("../controllers/productController")
const { authMiddleware } = require("../middleware/authMiddleware")

router.use(authMiddleware)

router.post("/", controller.createProduct)
router.get("/", controller.getAllProducts)
router.get("/:id", controller.getProductById)
router.put("/:id", controller.updateProduct)
router.delete("/:id", controller.deleteProduct)

module.exports = router

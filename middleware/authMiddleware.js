const jwt = require("jsonwebtoken")
const { connectTenantDB } = require("../config/db") // Import connectTenantDB
const productSchema = require("../models/Product")

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      storeId: decoded.storeId,
      role: decoded.role || "admin",
    }

    if (!req.user.tenantId) {
      return res
        .status(400)
        .json({ message: "Tenant ID not found in token. Please ensure JWT is valid and contains tenantId." })
    }

    // Construct the full tenant database name
    const tenantDbName = `tenant_${req.user.tenantId.toLowerCase()}`
    // Connect to the tenant-specific database using the full name
    const db = await connectTenantDB(tenantDbName)
    // Prevent Mongoose OverwriteModelError if model is already defined
    req.Product = db.models.Product || db.model("Product", productSchema)

    next()
  } catch (err) {
    console.error("Token verification or DB connection error:", err)
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token is not valid" })
    }
    return res.status(500).json({ message: "Internal server error during authentication or DB connection." })
  }
}

module.exports = { authMiddleware }

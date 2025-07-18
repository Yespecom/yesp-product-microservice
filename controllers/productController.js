exports.createProduct = async (req, res) => {
  try {
    const product = new req.Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await req.Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await req.Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const updated = await req.Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await req.Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Product not found" })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

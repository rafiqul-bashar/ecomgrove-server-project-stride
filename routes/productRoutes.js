const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/products", verifyToken, createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.patch("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

module.exports = router;

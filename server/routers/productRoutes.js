const express = require("express");
const {
  createProduct,
  getProduct,
  updateStock,
} = require("../controller/productController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProduct);
router.put("/:id/stock", protect, adminOnly, updateStock);

module.exports = router;

const Product = require("../models/Product")

const createProduct = async (req, res) => {
    try {
      console.log("Create product Details:", req.body);
      const { name, description, price, stock, imageUrl } = req.body;
  
      if (!name || !price) {
        return res.status(400).json({ 
          success: false, 
          message: "Name and price are required" 
        });
      }
  
      const product = new Product({ name, description, price, stock, imageUrl });
      const saveProduct = await product.save();
  
      res.status(201).json({ 
        success: true, 
        message: "Product created successfully", 
        data: saveProduct 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error", 
        error: error.message 
      });
    }
  };
  

  const getProduct = async (req, res) => {
    try {
      console.log("Fetching all products...");
      
      const products = await Product.find();
  
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: "No products found",
        });
      }
  
      console.log("Fetched Products:", products);
  
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
  
    } catch (error) {
      console.error("Error fetching products:", error);
  
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  

  const updateStock = async (req, res) => {
    try {
      console.log("Update Stock Request:", req.body);
  
      const { stock } = req.body;
      if (!stock || stock < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid stock value. Stock must be a positive number.",
        });
      }
  
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      product.stock = stock;
      await product.save();
  
      console.log("Stock updated successfully:", product);
  
      res.status(200).json({
        success: true,
        message: "Stock updated successfully",
        data: {
          productId: product._id,
          updatedStock: product.stock,
        },
      });
  
    } catch (error) {
      console.error("Error updating stock:", error);
  
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  

module.exports ={
    createProduct,
    getProduct,
    updateStock
}
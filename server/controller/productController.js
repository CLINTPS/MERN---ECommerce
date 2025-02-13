const Product = require("../models/Product")

 const createProduct = async (req, res) => {
  console.log("Create product Details :", req.body);
  const { name, description, price, stock, imageUrl } = req.body;
  
  const product = new Product({ name, description, price, stock, imageUrl });
  const saveProduct = await product.save();
  res.status(201).json(saveProduct);
};

 const getProduct = async (req, res) => {
    console.log("Get all prduct route");
    const products = await Product.find();
    console.log("Get all prduct details :", products);
    res.json(products);
};

 const updateStock = async (req,res) => {
    console.log("Update stock Details :", req.body);
    const { stock } =req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.stock = stock;
        await product.save();
        res.json({ message: "Stock updated successfully" })
    }else{
        res.status(404).json({ message: "Product not found" });
    }
}

module.exports ={
    createProduct,
    getProduct,
    updateStock
}
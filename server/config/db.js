const mongoose = require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const DB_URI = process.env.DB_URI
console.log("Check database");

const connectDB = mongoose
.connect(DB_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((error)=>{
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
})

module.exports = connectDB;
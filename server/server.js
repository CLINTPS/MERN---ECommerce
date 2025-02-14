const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/db");

dotenv.config();
const app = express();

const authRoutes = require('./routers/authRoutes')
const productRoutes = require('./routers/productRoutes')

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes)

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

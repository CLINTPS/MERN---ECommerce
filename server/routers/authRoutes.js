const express =require('express')
const { registerUser,loginUser,getUsers } = require('../controller/authController') 
const { protect,adminOnly } = require('../middlewares/authMiddleware')

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/",protect,adminOnly,getUsers)

module.exports=router;
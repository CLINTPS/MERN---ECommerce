const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  console.log("Register user data", req.body);
  console.log("Register user data", req.body);
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  console.log("Register existuser", userExists);
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  console.log("Login user body data", req.body);
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  
  console.log("Login user data :",user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUsers = async (req, res) => {
    console.log("Admin get all users");
    const users = await User.find().select("-password");
    res.json(users);
  };


  module.exports={
    registerUser,
    loginUser,
    getUsers
  }
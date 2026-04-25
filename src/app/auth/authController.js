const User = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) { return res.status(400).json({ message: "Name, email and password are required" }); }
    const existingUser = await User.findOne({ email });
    if (existingUser) { return res.status(400).json({ message: "User already exists" }); }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully", user });
  }
  catch (error) { next(error); }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { return res.status(404).json({ message: "User not found" }); }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.status(400).json({ message: "Invalid credentials" }); }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", token, user });
  }
  catch (error) { next(error); }
};
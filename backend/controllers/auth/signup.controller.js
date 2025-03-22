const { User } = require("../../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleSignUp(req, res) {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) return res.json({ error: "Enter valid email,username and password!" });
    const existingUser=await User.findOne({email});
    if(existingUser) return res.send("Error : Email already exists!");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await User.create({
      email: email,
      userName: userName,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in signup: " + error);
  }
}

module.exports = {
  handleSignUp,
};

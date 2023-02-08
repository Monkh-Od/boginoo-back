const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ----------------------------------------------------------------
// new user
const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);

    bcrypt.hash(password, salt, async function (err, hash) {
      if (!err && hash) {
        const newUser = await User.create({ email: email, password: hash });
        res
          .status(201)
          .json({ message: "successfully created", user: newUser });
      } else {
        res.status(403).json({ message: "aldaa garsan" });
      }
    });
  } catch (err) {
    res.status(403).json({ message: "aldaa garsan", error: err });
  }
};

const signIn = async (req, res) => {
  // usersees email, password avah
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }
  // aldaag ileruuleh
  try {
    // mongodb deeres user-ee haih
    const user = await User.findOne({ email: email });
    // hervee user baihgui bol aldaa butsaah
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    // userin passwordig hunees irsen passwordtoi shalgah
    const match = await bcrypt.compare(password, user.password);

    // password ni taaraaagui bol aldaa butsaah
    if (!match) {
      res.status(400).json({ message: "Invalid email or password" });
    } else {
      // hervee taarsan bol amjilttai messge, token hamt butsaah
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_KEY
      );
      res
        .status(200)
        .json({ message: "success", email: user.email, token: token });
    }
  } catch (err) {
    res.status(403).send("aldaa garla");
  }
};

const getUser = async (req, res) => {
  if (!req.headers.token) {
    res.status(404).json({
      message: "Invalid token",
    });
  }
  const token = req.headers.token;
  const data = await jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
  res.status(200).json(data);
};

module.exports = {
  signUp,
  signIn,
  getUser,
};

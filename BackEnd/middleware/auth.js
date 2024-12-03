const userSchema = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decode = jwt.verify(token, process.env.jwt_secret);

    const user = await userSchema.findById(decode.id);

    if (!user) {
      res.status(400).json({ msg: "decoded id not found in db " });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { verifyToken };

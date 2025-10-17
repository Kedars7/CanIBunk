const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {isAuthenticated};

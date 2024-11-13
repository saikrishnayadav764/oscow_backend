const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("user", req.user)
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;

const jwt = require("jsonwebtoken");
const { err } = require("./utils");
const { ats } = require("../config/constants");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return err(res, 401, "token tidak ada");
  const token = authHeader.split(" ")[1];
  const match = await User.findOne({ token });
  if (!match) return err(res, 401, "token tidak cocok");
  jwt.verify(token, ats, (error, decoded) => {
    if (error) return err(res, 403, "forbidden");
    req.userData = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  console.log(req.userData);
  if (req.userData && req.userData.role === "admin") return next();
  else return err(res, 401, `hanya admin yang bisa akses`);
};

// const verifyRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req?.roles) return unauthorized(res, "no token");
//     const result = req.roles.map((role) => allowedRoles.includes(role)).find((val) => val === true);
//     if (!result) return unauthorized(res, "no token");
//     next();
//   };
// };

module.exports = { verifyToken, verifyAdmin };

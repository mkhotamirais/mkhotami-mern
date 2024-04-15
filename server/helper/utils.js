const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { rootPath, ats, rts } = require("../config/constants");
const jwt = require("jsonwebtoken");

// ok 200, created 201, no content 204
// bad request 400, unauthorized 401, forbidden 403, conflict 409
// internal server error 500

const ok = (res, status, message, data) => {
  return res.status(status).json({ message, data });
};

const err = (res, status, error, stack = "") => {
  console.log(error);
  return res.status(status).json({ message: error?.message || error, stack: error?.errors || error });
};

const upload = multer({ dest: path.join(rootPath, "public/images/product") }).single("image");

const hashPass = (pass) => {
  const salt = genSaltSync(10);
  const hash = hashSync(pass, salt);
  return hash;
};

const comparePass = (pass, oldPass) => {
  return compareSync(pass, oldPass);
};

const signJwt = (data, type) => {
  if (type == "access") return jwt.sign(data, ats, { expiresIn: "1d" });
  else if (type == "refresh") return jwt.sign(data, rts, { expiresIn: "7d" });
};

module.exports = { ok, err, hashPass, upload, comparePass, signJwt };

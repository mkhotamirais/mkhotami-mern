const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { rootPath, ats, rts } = require("../config/constants");
const jwt = require("jsonwebtoken");

// ok 200, created 201, no content 204
// bad request 400, unauthorized 401, forbidden 403, conflict 409
// internal server error 500

const ok = (res, status, message, data, fields = "") => {
  return res.status(status).json({ message, data, fields });
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

const jwtSign = (data, type) => {
  if (type == "access") return jwt.sign(data, ats, { expiresIn: "1d" });
  else if (type == "refresh") return jwt.sign(data, rts, { expiresIn: "7d" });
};

const setCookie = (res, name, token) => {
  res.cookie(`${name}`, token, {
    httpOnly: true,
    secure: "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // secure: "auto",
    // sameSite: "None",
  });
};

const removeCookie = (res, name) => {
  res.clearCookie(`${name}`, {
    httpOnly: true,
    sameSite: "None",
    secure: "auto",
    // expires: new Date(0)
  });
};

module.exports = { ok, err, hashPass, upload, comparePass, jwtSign, setCookie, removeCookie };

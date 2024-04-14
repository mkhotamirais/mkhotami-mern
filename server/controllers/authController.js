const { err, ok, hashPass, comparePass, signJwt } = require("../helper/utils");
const User = require("../models/userModel");
const validator = require("validator");

const signup = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    if (!validator.isEmail(email)) return err(res, 400, `email tidak valid`);
    if (!password) return err(res, 400, `password harus diisi`);
    const dupUsername = await User.findOne({ username });
    if (dupUsername) return err(res, 409, `username sudah terdaftar gunakan useraname lain`);
    const dupEmail = await User.findOne({ email });
    if (dupEmail) return err(res, 409, `email sudah terdaftar gunakan email lain`);
    if (password !== confPassword) return err(res, 400, `konfirmasi password salah`);
    const hash = hashPass(password);
    req.body.password = hash;
    const data = await User.create(req.body);
    ok(res, 201, `signup ${data.username} berhasil`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!password) return err(res, 400, `password harus diisi`);
    const match = await User.findOne({ username });
    if (!match) return err(res, 400, `username belum terdaftar`);
    const matchPass = comparePass(password, match.password);
    if (!matchPass) return err(res, 400, `password salah`);
    const accessToken = signJwt({ id: match._id, username: match.username, role: match.role }, "access");
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // secure: "auto",
      // sameSite: "None",
    });
    await User.findOneAndUpdate({ username }, { token: accessToken }, { new: true });
    ok(res, 200, "signin success", accessToken);
  } catch (error) {
    err(res, 400, error);
  }
};

const signout = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) return err(res, 401, "unauthorized");
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "None", secure: "auto" });
    // res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    await User.findOneAndUpdate({ token: accessToken }, { token: "" }, { new: true });
    res.status(200).json({ message: "signout success" });
  } catch (error) {
    err(res, 400, error);
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.userData) return err(res, 401, "anda tidak login");
    const data = await User.findById(req.userData.id).select(["-__v"]);
    if (!data) return err(res, 401, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, "get me", data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateMe = async (req, res) => {
  try {
    if (!req.userData) return err(res, 401, "anda tidak login");
    const match = await User.findById(req.userData.id).select(["-__v"]);
    if (!match) return err(res, 401, `data dengan id ${id} tidak ditemukan`);
    if (req.body.password) req.body.password = hashPass(req.body.password, match.password);
    const data = await User.findByIdAndUpdate(req.userData.id, req.body, { new: true });
    ok(res, 200, `update profile ${match.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { signin, signup, signout, getMe, updateMe };

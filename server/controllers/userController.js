const { err, ok, hashPass } = require("../helper/utils");
const User = require("../models/userModel");
const validator = require("validator");

const getUsers = async (req, res) => {
  try {
    const data = await User.find().sort({ role: 1, createdAt: -1 }).select(["-__v", "-password"]);
    ok(res, 200, "get users", data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) return err(res, 400, `user dengan id ${id} tidak ditemukan`);
    ok(res, 200, "get user", data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postUser = async (req, res) => {
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
    ok(res, 201, `post ${data.username} berhasil`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const dupUsername = await User.findOne({ username });
    if (dupUsername && username !== dupUsername.username) return err(res, 409, `username sudah terdaftar gunakan yang lain`);
    const dupEmail = await User.findOne({ email });
    if (dupEmail && email !== dupEmail.email) return err(res, 409, `email sudah terdaftar gunakan yang lain`);
    if (req.body?.password) {
      if (req.body?.password !== req.body?.confPassword) return err(res, 400, `konfirmasi password salah`);
      const hash = hashPass(req.body?.password);
      req.body.password = hash;
    }
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) return err(res, 400, `user dengan id ${id} tidak ditemukan`);
    ok(res, 200, `update ${data.username} berhasil`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    if (!data) return err(res, 400, `user dengan id ${id} tidak ditemukan`);
    ok(res, 200, `delete ${data.username} berhasil`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getUsers, getUserById, postUser, updateUser, deleteUser };

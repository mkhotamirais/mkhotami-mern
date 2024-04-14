const { err, ok } = require("../helper/utils");
const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  try {
    const data = await Note.find()
      .sort({ updatedAt: -1 })
      .populate({ path: "user", select: ["_id", "username", "email", "role"] });
    ok(res, 200, `get notes`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Note.findById(id);
    if (!data) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getNoteById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    if (!title) return err(res, 400, `title harus diisi`);
    if (!description) return err(res, 400, `description harus diisi`);
    if (!tag) return err(res, 400, `tag harus diisi`);
    req.body.user = req.userData.id;
    const data = await Note.create(req.body);
    ok(res, 201, `post note`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateNote = async (req, res) => {
  try {
    res.send("updateNote");
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteNote = async (req, res) => {
  try {
    res.send("deleteNote");
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getNotes, getNoteById, postNote, updateNote, deleteNote };

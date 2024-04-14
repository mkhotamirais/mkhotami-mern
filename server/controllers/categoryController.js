const { err, ok } = require("../helper/utils");
const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    ok(res, 200, `getCategories`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) return err(res, 400, `category dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getCategoryById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return err(res, 400, `nama harus diisi`);
    if (await Category.findOne({ name })) return err(res, 409, `kategori sudah ada, gunakan nama lain`);
    const data = await Category.create(req.body);
    ok(res, 201, `post ${name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, 200, `update ${name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `delete ${data.name} success`);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getCategories, getCategoryById, postCategory, updateCategory, deleteCategory };

const { err, ok } = require("../helper/utils");
const Product = require("../models/productModel");
const { extname, join } = require("path");
const { unlinkSync, existsSync, renameSync } = require("fs");
const { rootPath } = require("../config/constants");
const { isValidObjectId } = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: i } } : {};
    const count = await Product.countDocuments({ ...keyword });
    const data = await Product.find({ ...keyword })
      .limit(pageSize)
      .sort({ updatedAt: -1 })
      .populate({ path: "category", select: ["_id", "name"] });
    const fields = { page: 1, pages: Math.ceil(count / pageSize), hasMore: false };
    ok(res, 200, `get data`, data, fields);
  } catch (error) {
    err(res, 400, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id).populate({ path: "category", select: ["_id", "name"] });
    if (!data) return err(res, 404, `data id ${id} tidak ditemukan`);
    ok(res, 200, `get data`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postProduct = async (req, res) => {
  const { name, price, description, category, quantity, brand } = req.body;
  if (!name) return err(res, 400, `nama produk harus diisi`);
  if (!price) return err(res, 400, `harga produk harus diisi`);
  if (!description) return err(res, 400, `deskripsi produk harus diisi`);
  if (!category) return err(res, 400, `category produk harus diisi`);
  if (!quantity) return err(res, 400, `quantity produk harus diisi`);
  if (req.file) {
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", "jpeg", ".png"];
    const ext = extname(originalname);
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `Extensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `Ukuran file max 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/product/${filename + ext}`;
    try {
      const result = await Product.create(req.body);
      if (existsSync(path)) renameSync(path, path + ext);
      ok(res, 201, `post product ${req.body.name} berhasil`, result);
    } catch (error) {
      if (existsSync(path + ext)) unlinkSync(path + ext);
      if (existsSync(path)) unlinkSync(path);
      err(res, 400, error.message);
    }
  } else {
    try {
      const result = await Product.create(req.body);
      ok(res, 201, `post product ${result.name} berhasil`, result);
    } catch (error) {
      err(res, 400, error.message);
    }
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return err(res, 400, `id ${id} tidak valid`);
  if (req.file) {
    const match = await Product.findById(id);
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = extname(originalname);
    if (!match) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `Data dengan id ${id} tidak ditemukan`);
    }
    const dup = await Product.findOne({ name: req.body.name });
    if (req.body.name !== match.name && dup) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `produk bernama ${dup.name} sudah ada, gunakan nama lain`);
    }
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `Extensi file tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `Ukuran file maksimal 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/product/${filename + ext}`;
    try {
      const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
      const pathOld = join(rootPath, "public/images/product", `${match?.imageName}`);
      if (!existsSync(pathOld)) {
        renameSync(path, path + ext);
        return ok(res, 200, `update ${result.name} berhasil`, result);
      }
      unlinkSync(pathOld);
      renameSync(path, path + ext);
      ok(res, 200, `update ${result.name} berhasil`, result);
    } catch (error) {
      if (existsSync(path)) unlinkSync(path);
      if (existsSync(path + ext)) unlinkSync(path + ext);
      err(res, 400, error);
    }
  } else {
    try {
      const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!result) return err(res, 400, `Data dengan id ${id} tidak ditemukan`);
      ok(res, 200, `update product ${result.name} berhasil`, result);
    } catch (error) {
      err(res, 400, error);
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    if (!data) return err(res, 400, `product dengan id ${id} tidak ditemukan`);
    const path = join(rootPath, "public/images/product", `${data?.imageName}`);
    if (existsSync(path)) unlinkSync(path);
    ok(res, 200, `delete product ${data.name} berhasil`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return err(res, 400, `product dengan id ${id} tidak ditemukan`);
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return err(res, 400, `product sudah direview`);
    const review = { name: req.userData.username, rating: Number(rating), comment, user: req.userData.id };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    ok(res, 201, `review added`, product);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getProducts, getProductById, postProduct, updateProduct, deleteProduct, addProductReview };

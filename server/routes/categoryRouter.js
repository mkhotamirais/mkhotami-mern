const {
  getCategories,
  postCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.route("/").get(getCategories).post(postCategory);
router.route("/:id").get(getCategoryById).patch(updateCategory).delete(deleteCategory);

module.exports = router;

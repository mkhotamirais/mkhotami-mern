const {
  getProducts,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview,
} = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const { upload } = require("../helper/utils");

const router = require("express").Router();

router.route("/").get(getProducts).post(verifyToken, verifyAdmin, upload, postProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyAdmin, upload, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);
router.route("/:id/review").patch(verifyToken, addProductReview);

module.exports = router;

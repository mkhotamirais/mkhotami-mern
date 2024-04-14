const router = require("express").Router();
const { getMe, signup, signin, signout, updateMe } = require("../controllers/authController");
const { verifyToken } = require("../helper/middleware");

router.route("/").post(signup).patch(signin).delete(verifyToken, signout);
router.route("/me").get(verifyToken, getMe).patch(verifyToken, updateMe);

module.exports = router;

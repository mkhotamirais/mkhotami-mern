const router = require("express").Router();
const { getUsers, postUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");

router.route("/").get(verifyToken, verifyAdmin, getUsers).post(postUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;

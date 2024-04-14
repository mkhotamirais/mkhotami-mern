const { getNotes, postNote, updateNote, deleteNote, getNoteById } = require("../controllers/noteController");
const { verifyToken } = require("../helper/middleware");
const router = require("express").Router();

router.route("/").get(getNotes).post(verifyToken, postNote);
router.route("/:id").get(getNoteById).patch(updateNote).delete(deleteNote);

module.exports = router;

const express = require("express");
const { isAuthenticated } = require("../middleware/auth.js");
const { addLecture, getAllLectures, getLecture, deleteLecture } = require("../controllers/lectureController.js");

const router = express.Router();

router.route("/").post(isAuthenticated, addLecture);
router.route("/").get(isAuthenticated, getAllLectures);
router.route("/:id").get(isAuthenticated, getLecture);
router.route("/:id").delete(isAuthenticated, deleteLecture);


module.exports = router;
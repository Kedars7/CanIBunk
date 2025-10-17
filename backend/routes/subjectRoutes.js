const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { addSubject, getAllSubjects, getSingleSubject, deleteSubject, updateSubject } = require("../controllers/subjectController.js");

const router = express.Router();

router.route("/").post(isAuthenticated, addSubject);
router.route("/").get(isAuthenticated, getAllSubjects);
router.route("/:id").get(isAuthenticated, getSingleSubject);
router.route("/:id").delete(isAuthenticated, deleteSubject);
router.route("/:id").put(isAuthenticated, updateSubject);





module.exports = router
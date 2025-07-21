const {
  getUserAndTaskAndCommentADMIN,
  listAllTasksAdmin,
  listAllUsersAdmin,
  listAllCommentsAdmin,
} = require("../controllers/admin.controller.js");

const { isAdmin } = require("../middleware/auth.middleware");

const express = require("express");
const router = express.Router();

router.get("/admin/users", isAdmin, listAllUsersAdmin);
router.get("/admin/tasks", isAdmin, listAllTasksAdmin);
router.get("/admin/comments", isAdmin, listAllCommentsAdmin);
router.get("/admin/users/details", isAdmin, getUserAndTaskAndCommentADMIN);

module.exports = router;

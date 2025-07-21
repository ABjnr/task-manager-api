const {
  addCommentToTask,
  deleteTaskComment,
  updateComment,
  getCommentsForTask,
} = require("../controllers/comment.controller");

const { isLoggedIn } = require("../middleware/auth.middleware");

const express = require("express");
const router = express.Router();

router.get("/tasks/:taskId/comments", isLoggedIn, getCommentsForTask);
router.post("/tasks/:taskId/comments", isLoggedIn, addCommentToTask);
router.put("/tasks/:taskId/comments/:commentId", isLoggedIn, updateComment);
router.delete("/comments/:commentId", isLoggedIn, deleteTaskComment);

module.exports = router;

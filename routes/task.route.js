const {
  retrieveLoggedInUserTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskWithCommentsById,
} = require("../controllers/task.controller");

const { isLoggedIn } = require("../middleware/auth.middleware");

const express = require("express");
const router = express.Router();

router.get("/tasks", isLoggedIn, retrieveLoggedInUserTask);
router.post("/tasks", isLoggedIn, createTask);
router.get("/tasks/:taskId", isLoggedIn, getTaskWithCommentsById);
router.put("/tasks/:taskId", isLoggedIn, updateTask);
router.delete("/tasks/:taskId", isLoggedIn, deleteTask);

module.exports = router;

const commentService = require("../services/comment.service.js");

// GET /api/tasks/:taskId/comments
const getCommentsForTask = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { taskId } = req.params;
    const comments = await commentService.getCommentsForTask(taskId, userId);
    return res.status(200).json({ comments });
  } catch (error) {
    if (error.message.includes("Unauthorized, please log in first!")) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes("Invalid task Id")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("Associated task not found")) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/tasks/:taskId/comments
const addCommentToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { comment } = req.body;
    const userId = req.session.userId;
    const newComment = await commentService.addCommentToTask({
      taskId,
      userId,
      comment,
    });
    return res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    if (error.message.includes("Unauthorized: Please log in.")) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes("Task does not exist")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/tasks/:taskId/comments/:commentId
const deleteTaskComment = async (req, res) => {
  try {
    const { taskId, commentId } = req.params;
    const userId = req.session.userId;
    await commentService.deleteTaskComment({ userId, taskId, commentId });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    if (error.message.includes("Unauthorized: Please log in.")) {
      return res.status(401).json({ message: error.message });
    }
    if (
      error.message.includes("Invalid comment ID") ||
      error.message.includes("Invalid task ID")
    ) {
      return res.status(400).json({ message: error.message });
    }
    if (
      error.message.includes("User not found") ||
      error.message.includes("Comment not found") ||
      error.message.includes("Associated task not found")
    ) {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message.includes(
        "You do not have permission to delete this comment"
      )
    ) {
      return res.status(403).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/tasks/:taskId/comments/:commentId
const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { taskId, commentId } = req.params;
    const userId = req.session.userId;
    await commentService.updateComment({ userId, taskId, commentId, comment });
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    if (error.message.includes("Unauthorized: Please log in.")) {
      return res.status(401).json({ message: error.message });
    }
    if (
      error.message.includes("Invalid comment ID") ||
      error.message.includes("Invalid task ID")
    ) {
      return res.status(400).json({ message: error.message });
    }
    if (
      error.message.includes("User not found") ||
      error.message.includes("Comment not found") ||
      error.message.includes("Associated task not found")
    ) {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message.includes(
        "You do not have permission to update this comment"
      )
    ) {
      return res.status(403).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCommentToTask,
  deleteTaskComment,
  updateComment,
  getCommentsForTask,
};

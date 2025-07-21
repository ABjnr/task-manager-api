const { User, Task, Comment } = require("../model/associations.js");

async function getCommentsForTask(taskId, userId) {
  if (!userId) {
    throw new Error("Unauthorized, please log in first!");
  }

  const taskIdToNum = parseInt(taskId, 10);
  if (isNaN(taskIdToNum)) {
    throw new Error("Invalid task Id");
  }
  const task = await Task.findByPk(taskIdToNum);
  if (!task) {
    throw new Error("Associated task not found");
  }

  return await Comment.findAll({
    where: { id: taskId, userId: userId },
  });
}

async function addCommentToTask({ taskId, userId, comment }) {
  if (!userId) {
    throw new Error("Unauthorized: Please log in.");
  }

  const ifTaskExists = await Task.findByPk(taskId);
  if (!ifTaskExists) {
    throw new Error("Task does not exist");
  }

  const newComment = {
    comment,
    userId,
    taskId,
  };

  const createdComment = await Comment.create(newComment);
  return createdComment;
}

async function deleteTaskComment({ userId, taskId, commentId }) {
  if (!userId) {
    throw new Error("Unauthorized: Please log in.");
  }

  const commentIdToNum = parseInt(commentId, 10);
  if (isNaN(commentIdToNum)) {
    throw new Error("Invalid comment ID");
  }
  const taskIdToNum = parseInt(taskId, 10);
  if (isNaN(taskIdToNum)) {
    throw new Error("Invalid task ID");
  }

  const [user, comment, task] = await Promise.all([
    User.findByPk(userId),
    Task.findByPk(taskIdToNum),
    Comment.findByPk(commentIdToNum),
  ]);

  if (!user) {
    throw new Error("User not found");
  }
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (!task) {
    throw new Error("Associated task not found");
  }

  if (user.role === "admin" || task.createdFor === user.id) {
    await Comment.destroy({ where: { id: commentIdToNum } });
    return true;
  } else {
    throw new Error("You do not have permission to delete this comment");
  }
}

async function updateComment({ userId, taskId, commentId, comment }) {
  if (!userId) {
    throw new Error("Unauthorized: Please log in.");
  }
  const commentIdToNum = parseInt(commentId, 10);
  if (isNaN(commentIdToNum)) {
    throw new Error("Invalid comment ID");
  }
  const taskIdToNum = parseInt(taskId, 10);
  if (isNaN(taskIdToNum)) {
    throw new Error("Invalid task ID");
  }

  const [user, fetchedComment, task] = await Promise.all([
    User.findByPk(userId),
    Task.findByPk(taskIdToNum),
    Comment.findByPk(commentIdToNum),
  ]);

  if (!user) {
    throw new Error("User not found");
  }

  if (!fetchedComment) {
    throw new Error("Comment not found");
  }

  if (!task) {
    throw new Error("Associated task not found");
  }

  if (user.role === "admin" || task.createdFor === user.id) {
    await Comment.update({ comment }, { where: { id: commentIdToNum } });
    return true;
  } else {
    throw new Error("You do not have permission to update this comment");
  }
}

module.exports = {
  addCommentToTask,
  deleteTaskComment,
  updateComment,
  getCommentsForTask,
};
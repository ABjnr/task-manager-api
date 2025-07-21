const { User, Task, Comment } = require("../model/associations.js");

async function listAllTasksAdmin() {
  const tasks = await Task.findAll({ include: { model: User, as: "user" } });
  if (!tasks || tasks.length === 0) {
    throw new Error("No tasks found");
  }
  return tasks;
}

async function listAllUsersAdmin() {
  const users = await User.findAll();
  if (!users || users.length === 0) {
    throw new Error("No users found");
  }
  return users;
}

async function listAllCommentsAdmin() {
  const comments = await Comment.findAll();
  if (!comments || comments.length === 0) {
    throw new Error("No comments found");
  }
  return comments;
}

async function getUserAndTaskAndCommentADMIN() {
  const users = await User.findAll({
    include: [
      { model: Task, as: "tasks" },
      { model: Comment, as: "comments" },
    ],
  });
  if (!users || users.length === 0) {
    throw new Error("No users with tasks/comments found");
  }
  return users;
}

module.exports = {
  getUserAndTaskAndCommentADMIN,
  listAllTasksAdmin,
  listAllUsersAdmin,
  listAllCommentsAdmin,
};

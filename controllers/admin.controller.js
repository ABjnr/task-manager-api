const adminService = require("../services/admin.service.js");

// GET /api/admin/tasks
const listAllTasksAdmin = async (req, res) => {
  try {
    const tasks = await adminService.listAllTasksAdmin();
    return res.status(200).json({ message: "Tasks retrieved", tasks });
  } catch (error) {
    if (error.message === "No tasks found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users
const listAllUsersAdmin = async (req, res) => {
  try {
    const users = await adminService.listAllUsersAdmin();
    res.status(200).json({ message: "Users retrieved", users });
  } catch (error) {
    if (error.message === "No users found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/comments
const listAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await adminService.listAllCommentsAdmin();
    return res.status(200).json({ comments });
  } catch (error) {
    if (error.message === "No comments found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users/details
const getUserAndTaskAndCommentADMIN = async (req, res) => {
  try {
    const users = await adminService.getUserAndTaskAndCommentADMIN();
    return res.status(200).json({ users });
  } catch (error) {
    if (error.message === "No users with tasks/comments found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserAndTaskAndCommentADMIN,
  listAllTasksAdmin,
  listAllUsersAdmin,
  listAllCommentsAdmin,
};

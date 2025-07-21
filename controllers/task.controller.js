const taskService = require("../services/task.service");

// GET /api/tasks
const retrieveLoggedInUserTask = async (req, res) => {
  try {
    const userId = req.session.userId;
    const tasks = await taskService.retrieveLoggedInUserTask(userId);
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks/:taskId
const getTaskWithCommentsById = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { taskId } = req.params;
    const task = await taskService.getTaskWithCommentsById(userId, taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found for this user" });
    }
    return res.status(200).json({ tasks: task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const createdFor = req.session.userId;
    await taskService.createTask({
      title,
      description,
      status,
      dueDate,
      createdFor,
    });
    return res.status(200).json({ message: "Task successfully created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/tasks/:taskId
const deleteTask = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { taskId } = req.params;
    await taskService.deleteTask(userId, taskId);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /api/tasks/:taskId
const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;
    const userId = req.session.userId;
    await taskService.updateTask(userId, taskId, status);
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  retrieveLoggedInUserTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskWithCommentsById,
};

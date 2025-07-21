const { User, Task, Comment } = require("../model/associations.js");

async function retrieveLoggedInUserTask(userId) {
  return await Task.findAll({
    where: { createdFor: userId },
    include: [
      { model: Comment, as: "comments" },
      { model: User, as: "user" },
    ],
  });
}

async function getTaskWithCommentsById(userId, taskId) {
  return await Task.findOne({
    where: { id: taskId, createdFor: userId },
    include: [{ model: Comment, as: "comments" }],
  });
}

async function createTask({ title, description, status, dueDate, createdFor }) {
  if (!createdFor) throw new Error("Unauthorized: User not logged in");
  const isUserValid = await User.findByPk(createdFor);
  if (!isUserValid)
    throw new Error(`User with ID: ${createdFor} does not exist`);
  return await Task.create({ title, description, status, dueDate, createdFor });
}

async function deleteTask(userId, taskId) {
  const taskIdToNum = parseInt(taskId, 10);
  if (isNaN(taskIdToNum)) throw new Error("Invalid task ID");
  const ifUserExists = await User.findByPk(userId);
  if (!ifUserExists) throw new Error("User does not exist");
  const ifTaskExists = await Task.findByPk(taskIdToNum);
  if (!ifTaskExists) throw new Error("Task does not exist");
  if (
    ifUserExists.role === "admin" ||
    ifTaskExists.createdFor === ifUserExists.id
  ) {
    await Task.destroy({ where: { id: taskIdToNum } });
    return true;
  } else {
    throw new Error("You do not have permission to delete this task");
  }
}

async function updateTask(userId, taskId, status) {
  if (!status) throw new Error("Status is required");
  const taskIdToNum = parseInt(taskId, 10);
  if (isNaN(taskIdToNum)) throw new Error("Invalid task ID");
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  const task = await Task.findByPk(taskIdToNum);
  if (!task) throw new Error("Task not found");
  if (user.role === "admin" || task.createdFor === user.id) {
    await Task.update({ status }, { where: { id: taskIdToNum } });
    return true;
  } else {
    throw new Error("You do not have permission to update this task status");
  }
}

module.exports = {
  retrieveLoggedInUserTask,
  getTaskWithCommentsById,
  createTask,
  deleteTask,
  updateTask,
};

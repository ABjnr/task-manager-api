const { User, Task, Comment } = require("../model/associations.js");

async function getUserDetails(userId) {
  if (!userId) {
    throw new Error("Unauthorized: Please log in.");
  }
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: [
      { model: Task, as: "tasks" },
      { model: Comment, as: "comments" },
    ],
  });
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
}

async function deleteUser(userId) {
  if (!userId) {
    throw new Error("Not authenticated");
  }
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  await user.destroy();
  return true;
}

module.exports = {
  getUserDetails,
  deleteUser,
};

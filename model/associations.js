const Task = require("./task.js");
const Comment = require("./comment.js");
const User = require("./user.js");

// USER - TASK (One user has many tasks)
User.hasMany(Task, { foreignKey: "createdFor", as: "tasks" });
Task.belongsTo(User, { foreignKey: "createdFor", as: "user" });

// TASK - COMMENT (One task has many comments)
Task.hasMany(Comment, { foreignKey: "createdFor", as: "comments" });
Comment.belongsTo(Task, { foreignKey: "createdFor", as: "task" });

// USER - COMMENT (One user has many comments)
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  Comment,
  Task,
  User,
};

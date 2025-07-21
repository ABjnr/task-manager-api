const userService = require("../services/user.service");

// GET /api/users
const getUserDetails = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userWithDetails = await userService.getUserDetails(userId);
    res.status(200).json({ user: userWithDetails });
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/users/:id/delete
const deleteUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    await userService.deleteUser(userId);
    req.session.destroy(); // Log the user out after deleting their account
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Account deleted and logged out" });
  } catch (error) {
    if (error.message.includes("not authenticated")) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserDetails,
  deleteUser,
};

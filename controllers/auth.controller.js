const authService = require("../services/auth.service.js");

// GET /login
const renderLoginPage = (req, res) => {
  res.render("login", { error: null });
};

// POST /login
const processLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    req.session.userId = user.id;
    req.session.userRole = user.role;
    // return res.status(200).json({ message: "Login Successful" });
    return res.redirect("/")
    } catch (error) {
    if (error.message === "Account doesn't exist") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Incorrect credentials") {
      return res.status(403).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /register
const renderRegisterPage = (req, res) => {
  res.render("register");
};

// POST /register
const processRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await authService.register({ name, email, password });
    return res.status(200).json({ message: "User Successfully created." });
  } catch (error) {
    if (error.message === "You must provide a valid input") {
      return res.status(403).json({ message: error.message });
    }
    if (
      error.message === "A user with this email exists, please try another."
    ) {
      return res.status(403).json({ message: error.message });
    }
    if (error.message === "Password is too short, must exceed 6 characters.") {
      return res.status(403).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// POST /logout
const processLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error: ", error);
      return res.status(500).render("error", { message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  renderLoginPage,
  processLogin,
  renderRegisterPage,
  processRegistration,
  processLogout,
};

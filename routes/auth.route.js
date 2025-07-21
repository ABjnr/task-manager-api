const {
  renderLoginPage,
  processLogin,
  renderRegisterPage,
  processRegistration,
  processLogout,
} = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

router.get("/login", renderLoginPage);
router.post("/login", processLogin);
router.get("/register", renderRegisterPage);
router.post("/register", processRegistration);
router.get("/logout", processLogout);

module.exports = router;

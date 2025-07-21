const {
  getUserDetails,
  deleteUser,
} = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/auth.middleware");

router.get("/users", isLoggedIn, getUserDetails);
router.post("/users/:id/delete", isLoggedIn, deleteUser);

module.exports = router;

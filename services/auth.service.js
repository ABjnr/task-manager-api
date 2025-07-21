const { User } = require("../model/associations.js");
const bcrypt = require("bcrypt");

async function login({ email, password }) {
  const trimmedEmail = email.trim();
  const user = await User.findOne({ where: { email: trimmedEmail } });
  if (!user) {
    throw new Error("Account doesn't exist");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("Incorrect credentials");
  }
  return user;
}

async function register({ name, email, password }) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !trimmedName || !password) {
    throw new Error("You must provide a valid input");
  }
  const ifUserExists = await User.findOne({ where: { email: trimmedEmail } });
  if (ifUserExists) {
    throw new Error("A user with this email exists, please try another.");
  }
  if (password.length < 6) {
    throw new Error("Password is too short, must exceed 6 characters.");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name: trimmedName,
    email: trimmedEmail,
    password: hashPassword,
  };
  await User.create(newUser);
  return true;
}

module.exports = {
  login,
  register,
};

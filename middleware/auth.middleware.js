const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect("/login");
};

const isAdmin = (req, res, next) => {
  if (req.session && req.session.userRole === "admin") {
    return next();
  }
  return res.status(403).render("error", { message: "Access denied" });
};

module.exports = {
  isAdmin,
  isLoggedIn,
};

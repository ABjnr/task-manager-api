const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const sequelize = require("./config/sequelize");

const app = express();
app.use(express.json());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

// IMPORT THE ROUTES
const adminRoutes = require("./routes/admin.route.js");
const authRoutes = require("./routes/auth.route.js");
const commentRoutes = require("./routes/comment.route.js");
const userRoutes = require("./routes/user.route.js");
const taskRoutes = require("./routes/task.route.js");

// ENDPOINTS
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.userId;
  next();
});

// Redirect root to /login
app.get("/", (req, res) => {
  if (req.session.userId) {
    // Render a dashboard or welcome page
    res.render("dashboard", { user: req.session.userId });
  } else {
    res.redirect("/login");
  }
});

app.use("/", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", commentRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    // await sequelize.sync();
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true });
    console.log(`Listening on http://localhost:${port}`);
  } catch (error) {
    console.log(
      "There was an error connecting to the database " + error.message
    );
  }
});

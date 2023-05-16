// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Count on me";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.currentUser;
    next();
});
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes)
const newsRoutes = require("./routes/news.routes")
app.use("/", newsRoutes)
const calendarRoutes = require("./routes/calendar.routes")
app.use("/", calendarRoutes)
const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

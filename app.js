
require("dotenv").config();

require("./db");


const express = require("express");


const hbs = require("hbs");

const app = express();


require("./config")(app);
require("./config/session.config")(app);


const projectName = "Count on me";


// 👇 Start handling routes here
app.use((req, res, next) => {
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
const eventsRoutes = require("./routes/events.routes")
app.use("/", eventsRoutes)


require("./error-handling")(app);

module.exports = app;

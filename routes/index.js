module.exports = app => {

    app.use((req, res, next) => {
        res.locals.currentUser = req.session.currentUser;
        res.locals.isLoggIn = req.session.currentUser ? true : false
        res.locals.isAdmin = req.session.currentUser?.role == "Admin"
        next();
    });
    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);
    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)
    const newsRoutes = require("./news.routes")
    app.use("/", newsRoutes)
    const calendarRoutes = require("./calendar.routes")
    app.use("/", calendarRoutes)
    const userRoutes = require("./user.routes")
    app.use("/", userRoutes)
    const eventsRoutes = require("./events.routes")
    app.use("/events", eventsRoutes)
    const apiRoutes = require('./api.routes')
    app.use("/api", apiRoutes)
}
module.exports = app => {

    app.use((req, res, next) => {
        res.locals.currentUser = req.session.currentUser;
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
    const suscribeRoutes = require("./subscribe.routes")
    app.use("/", suscribeRoutes)
    const publicRoutes = require("./public.routes")
    app.use("/", publicRoutes)
}
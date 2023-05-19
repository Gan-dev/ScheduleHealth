require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
require("./config/session.config")(app);
require("./routes")(app)
require("./error-handling")(app);

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser
    next()
})

module.exports = app;

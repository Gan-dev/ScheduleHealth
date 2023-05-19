const router = require("express").Router();
const axios = require("axios");
const { isLoggedIn } = require("../middlewares/route.guards");

router.get("/calendar", isLoggedIn, (req, res, next) => {

    res.render('calendar/calendar-main')
});

module.exports = router;
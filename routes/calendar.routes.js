const router = require("express").Router();
const axios = require("axios");

router.get("/calendar", (req, res, next) => {

    res.render('calendar/calendar-main')
});

module.exports = router;
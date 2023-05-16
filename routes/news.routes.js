const router = require("express").Router();
const axios = require("axios");
const apiNews = require('../services/news-api.services');

router.get("/news", (req, res, next) => {

    apiNews
        .getHomeNews()
        .then(response => res.render('news/news-main', { news: response.data.results }))
        .catch(err => next(err))
})
module.exports = router
const router = require("express").Router();
const axios = require("axios");
const apiNews = require('../services/news-api.services');

router.get("/news", (req, res, next) => {

    apiNews
        .getHomeNews()
        .then(response => {
            let shortNews = response.data.results
            shortNews = shortNews.slice(0, 10)
            res.render('news/news-main', { news: shortNews })
        })
        .catch(err => next(err))
})
router.get("/news/:topic", (req, res, next) => {
    const { topic } = req.params


    apiNews
        .getNewsByTopic(topic)
        .then(response => {
            let shortNews = response.data.results
            shortNews = shortNews.slice(0, 10)
            res.render('news/news-main', { news: shortNews })
        })
        .catch(err => next(err))
})

module.exports = router
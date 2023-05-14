const express = require('express');
const router = express.Router();


function getNewsJSON() {

    fetch('/news/my-page')
        .then(news => res.json(news))
        .catch(err => next(err))
};

module.exports = router


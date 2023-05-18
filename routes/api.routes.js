//Esta ruta es para rendereizar en el calendario todos los eventos
const router = require("express").Router();
const Event = require("../models/Event-model");

router.get('/list/subscribe', (req, res, next) => {

    const { _id } = req.session.currentUser
    let eventsClient = []
    Event
        .find({ userSubscribed: { $in: [_id] } })
        .then(events => {
            res.json(events)
        })
        .catch(err => next(err))
})
module.exports = router
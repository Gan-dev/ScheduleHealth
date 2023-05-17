const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guards')
const Event = require("../models/Event-model");
const User = require("../models/User-model")

const { renderizeButtom } = require("../utils/user-utils");

router.get('/publicevents', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)
    Event
        .find({ specs: 'Public' })

        .then(events => {
            console.log(events)
            res.render('events/public-events', { events, userRole })
        });
})


router.get('/publicevents/details/:_id', (req, res, next) => {

    const { _id } = req.params
    const idUser = req.session.currentUser._id
    const userRole = renderizeButtom(req.session.currentUser, idUser)

    Event
        .findById(_id)
        .then(event => res.render("events/public-events-details", { event, userRole }))
        .catch(err => console.log(err))
})
module.exports = router
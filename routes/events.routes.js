const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guards')
const Event = require("../models/Event-model");
const User = require("../models/User-model")

const { renderizeButtom } = require("../utils/user-utils");

router.get('/myevents', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)
    Event
        .find()
        .then(events => {
            res.render('events/my-events', { events, userRole })
        });
})


router.get('/myevents/create', (req, res, next) => {

    Event
        .find()
        .sort({ name: 1 })
        .then(event => res.render('events/event-create', { event }))
        .catch(err => console.log(err))

});

router.post('/myevents/create', (req, res, next) => {
    const { name, type, specs, description, dateStart, dateEnd, startingHour, endingHour } = req.body
    console.log(typeof dateStart)
    const date = {
        start: dateStart,
        end: dateEnd,
        hourStart: startingHour,
        hourEnd: endingHour
    }
    const { _id } = req.session.currentUser

    Event
        .create({ name, type, specs, description, date, owner: _id })
        .then(newEvent => res.redirect(`/myevents`))
        .catch(err => console.log(err))
});

router.get("/myevents/edit/:_id", (req, res, next) => {
    const { _id } = req.params
    const renderize = renderizeButtom(req.session.currentUser, _id)
    Event
        .findById(_id)
        .then(event => res.render("events/events-edit", { event, renderize }))
        .catch(err => console.log(err))
})

router.post("/myevents/edit/:_id", isLoggedIn, (req, res, next) => {
    console.log("hola")
    const { _id } = req.params
    const { name, type, specs, description, date } = req.body


    Event
        .findByIdAndUpdate(_id, { name, type, specs, description, date })
        .then(() => res.redirect(`/myevents/details/${_id}`))
        .catch(err => console.log(err))
})

router.get('/myevents/details/:_id', (req, res, next) => {

    const { _id } = req.params
    const idUser = req.session.currentUser._id
    const userRole = renderizeButtom(req.session.currentUser, idUser)

    Event
        .findById(_id)
        .then(event => res.render("events/event-details", { event, userRole }))
        .catch(err => console.log(err))
})

router.post('/myevents/delete/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Event
        .findByIdAndDelete(_id)
        .then(() => res.redirect(`/myevents`))
        .catch(err => console.log(err))
})

module.exports = router
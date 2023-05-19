const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guards')
const Event = require("../models/Event-model");
const User = require("../models/User-model")
const uploderImageMiddleware = require('../middlewares/uploderImage.middleware');

router.get('/menu', (req, res, next) => {
    res.render('events/events-menu')
});

router.get("/create", (req, res, next) => {
    res.render('events/event-create')
})

router.post("/create", uploderImageMiddleware.single("image"), (req, res, next) => {

    const { name, type, specs, description, dateStart, dateEnd, startingHour, endingHour } = req.body
    const { _id: owner } = req.session.currentUser
    const date = {
        start: dateStart,
        end: dateEnd,
        hourStart: startingHour,
        hourEnd: endingHour
    }

    Event
        .create({ name, type, specs, description, date, owner })
        .then(() => res.redirect('/events/list'))
        .catch(err => next(err))
})

router.get('/list/public', (req, res, next) => {
    Event
        .find({ specs: "Public" })
        .then(events => res.render('events/events-list', { events }))
        .catch(err => next(err))
})

router.get('/list/owner', (req, res, next) => {
    const { _id } = req.session.currentUser
    Event
        .find({ owner: _id })
        .then(events => res.render('events/events-list', { events }))
        .catch(err => next(err))

})

router.get('/list/subscribe', (req, res, next) => {

    const { _id } = req.session.currentUser
    Event
        .find({ userSubscribed: { $in: [_id] } })
        .then(events => res.render('events/events-list', { events }))
        .catch(err => next(err))
})

router.get('/details/:event_id', (req, res, next) => {
    const { event_id } = req.params
    Event
        .findById(event_id)
        .populate('owner')
        .then(event => res.render('events/event-details', { event }))
        .catch(err => next(err))
})
router.post('/subscribe/:event_id', (req, res, next) => {

    const { event_id } = req.params
    const { _id } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $push: { userSubscribed: _id } })
        .then(() => res.redirect('/events/list/subscribe'))
        .catch(err => next(err))

})

router.post('/unsubscribed/:event_id', (req, res, next) => {
    const { event_id } = req.params
    const { _id } = req.session.currentUser
    Event
        .findByIdAndUpdate(event_id, { $pull: { userSubscribed: _id } })
        .then(() => res.redirect('/events/list/subscribe'))
        .catch(err => next(err))
})

module.exports = router
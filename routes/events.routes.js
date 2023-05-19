const router = require("express").Router();
const Event = require("../models/Event-model");
const { isLoggedIn, isOwner, checkRoles } = require('../middlewares/route.guards')
const User = require("../models/User-model")
const uploderAvatarMiddleware = require('../middlewares/uploderAvatar.middleware');

router.get('/menu', isLoggedIn, (req, res, next) => {
    res.render('events/events-menu')
});

router.get("/create", isLoggedIn, (req, res, next) => {
    res.render('events/event-create')
})

router.post("/create", uploderAvatarMiddleware.single('image'), isLoggedIn, (req, res, next) => {

    const { name, type, specs, description, dateStart, dateEnd, startingHour, endingHour } = req.body
    const { path: image } = req.file
    const { _id: owner } = req.session.currentUser
    const date = {
        start: dateStart,
        end: dateEnd,
        hourStart: startingHour,
        hourEnd: endingHour
    }

    Event
        .create({ name, type, specs, description, date, owner, image })
        .then(() => res.redirect('/events/list/public'))
        .catch(err => next(err))
})

router.get('/list/public', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    Event
        .find({ specs: "Public", owner: { $ne: _id } })
        .then(events => res.render('events/events-list', { events, eventOwner: { is: false } }))
        .catch(err => next(err))
})

router.get('/list/owner', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    Event
        .find({ owner: _id })
        .then(events => {
            res.render('events/events-list', { events, eventOwner: { is: true } })
        })
        .catch(err => next(err))

})

router.get('/list/subscribe', isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser
    Event
        .find({ userSubscribed: { $in: [_id] } })
        .then(events => res.render('events/events-list', { events }))
        .catch(err => next(err))
})

router.get('/details/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params
    Event
        .findById(event_id)
        .populate('owner')
        .then(event => res.render('events/event-details', { event }))
        .catch(err => next(err))
})
router.post('/subscribe/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const { _id } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $push: { userSubscribed: _id } })
        .then(() => res.redirect('/events/list/subscribe'))
        .catch(err => next(err))

})

router.post('/unsubscribed/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params
    const { _id } = req.session.currentUser
    Event
        .findByIdAndUpdate(event_id, { $pull: { userSubscribed: _id } })
        .then(() => res.redirect('/events/list/subscribe'))
        .catch(err => next(err))
})

router.get('/edit/:event_id', isLoggedIn, isOwner, (req, res, next) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate('owner')
        .then(event => res.render('events/events-edit', { event }))
        .catch(err => next(err))
})

router.post('/edit/:event_id', isLoggedIn, checkRoles("Admin"), (req, res, next) => {
    const { name, type, specs, description, dateStart, dateEnd, startingHour, endingHour } = req.body
    const { event_id } = req.params
    const date = {
        start: dateStart,
        end: dateEnd,
        hourStart: startingHour,
        hourEnd: endingHour
    }
    Event
        .findByIdAndUpdate(event_id, { name, type, specs, description, date })
        .then(() => res.redirect(`/events/details/${event_id}`))
        .catch(err => next(err))
})

router.post('/delete/:event_id', isLoggedIn, isOwner, (req, res, next) => {
    const { event_id } = req.params
    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events/list/owner'))
        .catch(err => next(err))
})

module.exports = router
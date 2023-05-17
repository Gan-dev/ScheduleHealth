const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guards')
const Event = require("../models/Event-model");
const User = require("../models/User-model")
const { renderizeButtom } = require("../utils/user-utils");


router.get('/subscribedevents', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)

    Event
        .find()
        .populate('userSubscribed')
        .then(events => {
            console.log(events)
            let eventsSubs = events.map(elm => {
                console.log(elm.userSubscribed._id)

                elm.userSubscribed === _id
            })
            console.log(eventsSubs)
            res.render("events/subscribed-events", { events, ...eventsSubs })
            return eventsSubs
        })
        .catch(err => next(err))

})

router.post("/subscribe/:_id", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id
    const { _id } = req.params

    Event
        .findByIdAndUpdate(_id, { userSubscribed: userSubscribed.push(userId) })
        .then(() => res.redirect(`/subscribedevents/${_id}`))
        .catch(err => console.log(err))
})

router.post("/unsubscribe/:_id", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id
    const { _id } = req.params

    Event
        .findByIdAndUpdate(_id, { userSubscribed: userSubscribed.delete(userId) })
        .then(() => res.redirect(`/subscribedevents/${_id}`))
        .catch(err => console.log(err))
})

module.exports = router
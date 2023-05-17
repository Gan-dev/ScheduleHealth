const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guards')
const Event = require("../models/Event-model");
const User = require("../models/User-model")


router.get('/subscribedevents', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)


    Event
        .find()
        .populate('User')
        .then(events => {
            let eventsSubs = events.filter(event => event == _id)
            return eventsSubs
        })
        .then(events => res.send(events))
        .catch(err => console.log(err))

    susbribeds

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

    const { _id } = req.params

    Event
        .findByIdAndUpdate(_id, { suscribed: "No" })
        .then(() => res.redirect(`/subscribedevents/${_id}`))
        .catch(err => console.log(err))
})

module.exports = router
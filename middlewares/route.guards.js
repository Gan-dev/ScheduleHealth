const Event = require('../models/Event-model')
const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.redirect('/myprofile')
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}
const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}
const isOwner = (req, res, next) => {
    const { event_id } = req.params
    Event.findById(event_id).then(event => {
        const isOwner = (event.owner == req.session.currentUser._id) ? true : false
        if (isOwner) {
            next()
        } else {
            res.redirect(`/events/list/public`)
        }
    })

}
const checkSame = (req, res, next) => {

    if (req.params.id === req.session.currentUser._id || req.session.currentUser.role === 'ADMIN') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}
module.exports = { isLoggedIn, isLoggedOut, checkSame, checkRoles, isOwner }
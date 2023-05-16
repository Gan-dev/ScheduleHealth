const router = require("express").Router();

const User = require("../models/User-model");

const { isLoggedIn, checkSame, checkRoles } = require('../middlewares/route.guards')
const { renderizeButtom } = require("../utils/user-utils");

router.get('/myprofile', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)
    console.log(userRole)
    res.render('user/user-profile', { userRole, users: req.session.currentUser })

});

router.get("/myprofile/edit", (req, res, next) => {
    const { _id } = req.session.currentUser
    const renderize = renderizeButtom(req.session.currentUser, _id)
    User
        .findById(_id)
        .then(users => res.render("user/user-edit", { users, renderize }))
        .catch(err => console.log(err))
})


router.post("/myprofile/edit", isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const { email, username, password: hashedPassword, birth, zipCode, firstName, lastName, avatar } = req.body


    User
        .findByIdAndUpdate(_id, { email, username, password: hashedPassword, birth, zipCode, firstName, lastName, avatar })
        .then(() => res.redirect("/myprofile"))
        .catch(err => console.log(err))
})

router.post('/myprofile/delete', isLoggedIn, checkRoles('Admin'), (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err))
})


module.exports = router
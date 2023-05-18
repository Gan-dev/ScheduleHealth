const router = require("express").Router();
const User = require("../models/User-model");

const { isLoggedIn, checkRoles } = require('../middlewares/route.guards')
const { renderizeButtom } = require("../utils/user-utils");

router.get('/myprofile', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser
    const userRole = renderizeButtom(req.session.currentUser, _id)
    res.render('user/user-profile', { userRole, users: req.session.currentUser })

});

router.get("/myprofile/edit", (req, res, next) => {
    const { _id } = req.session.currentUser
    const newsPreferences = User.schema.obj.newsPreferences
    User
        .findById(_id)
        .then(users => res.render("user/user-edit", { users, newsPreferences }))
        .catch(err => console.log(err))
})

router.post("/profile/edit", (req, res, next) => {
    const { _id } = req.session.currentUser
    const { email, username, birth, zipCode, firstName, lastName, newsPreferences } = req.body
    console.log(req.body)

    User
        .findByIdAndUpdate(_id, { email, username, birth, zipCode, firstName, lastName, newsPreferences }, { new: true })
        .then((newUser) => {
            req.session.currentUser = newUser
            res.redirect("/myprofile")
        })

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
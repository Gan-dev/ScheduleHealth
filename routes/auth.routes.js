const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const saltRound = 10
const User = require('../models/User-model');
const errorHandling = require('../error-handling');
const utils = require('../utils/user-utils')
const uploderAvatarMiddleware = require('../middlewares/uploderAvatar.middleware');

router.get('/register', (req, res, next) => res.render('auth/signup'))
router.post('/register', uploderAvatarMiddleware.single("avatar"), (req, res, next) => {

    const { path: avatar } = req.file
    const { email, password, username, birth, zipCode, firstName, lastName, } = req.body
    utils.noAvatar()
    bcrypt
        .genSalt(saltRound)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ email, username, password: hashedPassword, birth, zipCode, firstName, lastName, avatar }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})
router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    bcrypt
    if (email.length == 0 || password.length == 0) {
        res.render("auth/login", { errorMessage: "Los campos son obligatorios" })
    }
    User
        .findOne({ email })
        .then(user => {
            console.log(user)
            if (!user) {
                res.render('auth/login', { errorMessage: "Usuario no encontrado" })
                return
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login', { errorMessage: "Incorrect Password" })
                return
            }
            req.session.currentUser = user
            res.redirect('/myprofile')
        })
        .catch(error => next(error))
})


router.post("/logout", (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router
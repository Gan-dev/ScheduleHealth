const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const saltRound = 10
const User = require('../models/User.model');
const errorHandling = require('../error-handling');

router.get('/register', (req, res, next) => res.render('auth/signup'))
router.post('/register', (req, res, next) => {

    const { email, password, username } = req.body

    bcrypt
        .genSalt(saltRound)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ email, username, password: hashedPassword }))
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
            res.redirect('/')
        })
        .catch(error => next(error))
})


router.post("/logout", (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedInLogin } = require('../lib/auth')

// Login
router.get('/', isLoggedInLogin,  (req, res) => {
    res.render('auth/signin')
})

router.post('/', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }) (req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

module.exports = router
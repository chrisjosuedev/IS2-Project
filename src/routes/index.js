const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedInLogin } = require('../lib/auth')

// Login
router.get('/', isLoggedInLogin, (req, res) => {
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

// Forgot Password
router.get('/loginHelp', (req, res) => {
    res.render('auth/forgot-password')
})

/* Recovery Password */
router.get('/recovery-password', (req, res) => {
    res.render('auth/edit-password')
})

router.post('/recovery-password/:username', (req, res) => {
    res.redirect('/')
})

module.exports = router
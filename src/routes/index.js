require('dotenv').config()
const express = require('express')
const router = express.Router()
const passport = require('passport')

const myConn = require("../db");
const helpers = require("../lib/helpers");
const nodemailer = require('nodemailer')
const generatePassword = require('generate-password')

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

router.post('/loginHelp', async (req, res) => {
    const { username } = req.body

    const queryUser = `
    select * from usuario where USERNAME = ?;
    `
    const rows = await myConn.query(queryUser, [username]);

    if (rows.length > 0) {
        const user = rows[0];

        const password = generatePassword.generate({
            length: 8,
            strict: true
          })
        
        // Contenido a Enviar por Email
        contentHTML = `
        <h1> Nuevos Datos de Usuario </h1>
        <p> Las credenciales de acceso al sistema son: </p> 
        <ul> 
          <li> Username: ${username} </li>
          <li> Nueva Password: ${password} </li>
        </ul>
        <p> Recuerde cambiar su contraseña en el siguiente inicio de sesión. </p>
        `

        const newUser = {
            password
        };
      
        newUser.password = await helpers.encryptPassword(password);
      
        await myConn.query("UPDATE usuario set ? WHERE username = ?", [
          newUser,
          username
        ]);
      
        const newExpiracion = {
          updated: false
        }
      
        await myConn.query("UPDATE expiracion_password set ? WHERE username = ?" , [
          newExpiracion,
          username
        ])

        // Envio de Credenciales
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL
          }
        })
    
        const info = await transporter.sendMail({
          from: `'IS2 Solutions' <${process.env.EMAIL}>`,
          to: user.EMAIL_USER,
          subject: 'Solicitud de nueva contraseña',
          html: contentHTML
        })

        req.flash("success", "Informacion Enviada Correctamente, por favor revise su correo.");
        res.redirect("/");

    } else {
        req.flash('error', 'Usuario no existe')
        res.redirect('/loginHelp')
    }


})

/* Recovery Password */
router.get('/recovery-password', (req, res) => {
    res.render('auth/edit-password')
})


module.exports = router
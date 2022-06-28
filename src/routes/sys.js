const express = require('express')
const myConn = require('../db')
const router = express.Router()
const sysCont = require('../controllers/sysController')
const { isLoggedIn } = require('../lib/auth')


router.get('/general', isLoggedIn, async (req, res) => {
  const depto = await myConn.query("SELECT * FROM departamentos")
  res.render('sys/general', { depto })
})

router.get('/general/empresa', isLoggedIn, sysCont.general)

router.post('/general/edit/:id', isLoggedIn, sysCont.editInfoEmpresa)

/* RESOLUCIONES */
router.get('/resoluciones', isLoggedIn, (req, res) => {
  res.render('sys/resoluciones')
})

router.get('/resoluciones/detalle', isLoggedIn, sysCont.detalleResolucion)

router.post('/resoluciones/edit/:id', isLoggedIn, sysCont.editInfoResolucion)


module.exports = router
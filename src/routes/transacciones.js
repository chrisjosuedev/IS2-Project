const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')
const { isLoggedIn } = require('../lib/auth')

/** METODOS DE PAGO **/
router.get('/metodos-pago', isLoggedIn, transaccionCont.listMetodosPago)

router.post('/metodos-pago/new', isLoggedIn, transaccionCont.newMetodoPago)

router.get('/metodos-pago/:id', isLoggedIn, transaccionCont.getMetodoPago)

router.post('/metodos-pago/edit/:id', isLoggedIn, transaccionCont.editMetodoPago)

router.get('/metodos-pago/delete/:id', isLoggedIn, transaccionCont.deleteMetodoPago)

/** COMPRAS **/
router.get('/compras/new', isLoggedIn, transaccionCont.newCompra)

router.post('/compras/agregar', isLoggedIn, transaccionCont.agregarCompra)

/** FACTURAS **/
router.get('/facturas/new', isLoggedIn, transaccionCont.newFactura)

router.post('/facturas/agregar', isLoggedIn, transaccionCont.agregarFactura)

module.exports = router


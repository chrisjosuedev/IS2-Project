const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')
// const { isLoggedIn } = require('../lib/auth')

/** COMPRAS **/
router.get('/compras/new', /*isLoggedIn,*/  transaccionCont.newCompra)

router.post('/compras/agregar', /*isLoggedIn,*/  transaccionCont.addNewCompra)

/** FACTURAS **/
router.get('/facturas/new', /*isLoggedIn,*/  transaccionCont.newFactura)

router.post('/facturas/agregar', /*isLoggedIn,*/  transaccionCont.addNewFactura)

/** Arqueos **/
router.get('/arqueos/nuevo', transaccionCont.newArqueo)

/* Devoluciones */
router.get('/devoluciones/nuevo', transaccionCont.newDevolucion)

/* Descuentos */



module.exports = router


const express = require('express')
const router = express.Router()
const consultasController = require('../controllers/consultasController')
const { isLoggedIn } = require('../lib/auth')

// Ver compras
router.get('/compras', isLoggedIn, consultasController.listCompras)

// JSON Compras
router.get('/compras/listado', isLoggedIn, consultasController.totalCompras)

// Ver compras por rango de fechas
router.get('/compras/fecha/:fechain/:fechaout', isLoggedIn, consultasController.findCompraByDate)

// Ver detalle de la compra
router.get('/compras/detalle/:id', isLoggedIn, consultasController.getCompraByID)

// Ver Ventas
router.get('/ventas', isLoggedIn, consultasController.listVentas)

// JSON Ventas
router.get('/ventas/listado', isLoggedIn, consultasController.totalVentas)

// Ver ventas por rango de fechas
router.get('/ventas/fecha/:fechain/:fechaout', isLoggedIn, consultasController.findVentaByDate)

// Ver detalle de la compra
router.get('/ventas/detalle/:id', isLoggedIn, consultasController.getVentaByID)

module.exports = router
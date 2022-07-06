const express = require('express')
const router = express.Router()
const proveedoresController = require('../controllers/proveedoresController')
const { isLoggedIn, levelAccess } = require('../lib/auth')

// Proveedores 
router.get('/', isLoggedIn, levelAccess, proveedoresController.listProveedores)

/* --- POST DE PROVEEDORES --- */
router.post('/new', isLoggedIn, proveedoresController.newProveedor)

/* Editar Proveedores */
router.get('/:id', isLoggedIn, proveedoresController.getProveedorById)

router.post('/edit/:id', isLoggedIn, proveedoresController.editProveedor)

// Eliminar Proveedores
router.get('/delete/:id', isLoggedIn, proveedoresController.deleteProveedor)

module.exports = router
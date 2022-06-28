const express = require('express')
const router = express.Router()
const confController = require('../controllers/configController')
const { isLoggedIn } = require('../lib/auth')

// Settings

// /categoria-laboral
router.get('/categoria-laboral', isLoggedIn, confController.listCategoriaLaboral)

/* POST CATEGORIA LABORAL */
router.post('/categoria-laboral/new', isLoggedIn, confController.newCategoriaLaboral)

// -- Edit Categoria
router.get('/categoria-laboral/:id', isLoggedIn, confController.getCategoriaById)

router.post('/categoria-laboral/edit/:id', isLoggedIn, confController.editCategoriaLaboral)

// Eliminar Categoria Laboral
router.get('/categoria-laboral/delete/:id', isLoggedIn, confController.deleteCatLaboral)

// /usuarios
router.get('/usuarios', isLoggedIn, confController.listUsuarios)

// /usuarios by ID Empleado
router.get('/usuarios/empleados/:id', isLoggedIn, confController.getUserByIdEmpleado)

// Eliminar Usuario
router.get('/usuarios/delete/:username', isLoggedIn, confController.deleteUsuario)

// POST Usuario
router.post('/usuarios/new', isLoggedIn, confController.newUsuario)

// --- Edit Usuario
router.get('/usuarios/:username', isLoggedIn, confController.getEmpleadoByUser)

router.post('/usuarios/edit/:username', isLoggedIn, confController.editUser)

// --------- PERFIL
router.get('/mi-perfil', isLoggedIn, confController.verMiPerfil)

router.get('/mi-perfil/edit/:username', isLoggedIn, confController.getEditPerfil)

router.post('/mi-perfil/edit/:username', isLoggedIn, confController.EditPerfil)

module.exports = router
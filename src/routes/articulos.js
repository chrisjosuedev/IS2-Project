const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosController')
const { isLoggedIn } = require('../lib/auth')

/* ----------- ARTICULOS --------------- */
// GET 
router.get('/',isLoggedIn, articulosController.listArticulos)

router.get('/general/:id',isLoggedIn, articulosController.getArtById)

/* Garantias */
router.get('/garantias', articulosController.getGarantias)

/* ------------ FIN ARTICULOS ------------- */

/* Tipos de Articulo */
router.get('/tipos', articulosController.listTipos)

router.post('/tipos/new', articulosController.newTipos)

router.get('/tipos/:id', articulosController.getTipoById)

router.post('/tipos/edit/:id',isLoggedIn, articulosController.editTipos)

router.get('/tipos/delete/:id',isLoggedIn, articulosController.deleteTipos)

// /articulos/marcas
router.get('/marcas',isLoggedIn, articulosController.listMarcas)

/* --- POST DE MARCAS --- */
router.post('/marcas/new',isLoggedIn, articulosController.newMarca)

/* Editar Marca */
router.get('/marcas/:id',isLoggedIn, articulosController.getMarcaById)

router.post('/marcas/edit/:id',isLoggedIn, articulosController.editMarca)

// Delete marcas
router.get('/marcas/delete/:id',isLoggedIn, articulosController.deleteMarca)

module.exports = router
const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosController')
const { isLoggedIn } = require('../lib/auth')

/* ----------- ARTICULOS --------------- */
// GET 
router.get('/', isLoggedIn, articulosController.listArticulos)

router.get('/general/:id', isLoggedIn, articulosController.getArtById)

// Ropa
router.get('/ropa',isLoggedIn, articulosController.listRopaArticulos)

/* Editar Ropa */
router.get('/ropa/:id',isLoggedIn, articulosController.getArticuloByRopa)

router.post('/ropa/edit/:id', isLoggedIn, articulosController.editArticuloRopa)

// ---- DELETE ROPA
router.get('/ropa/delete/:id', isLoggedIn, articulosController.deleteRopa)

// Calzado
router.get('/calzado', isLoggedIn, articulosController.listRopaCalzado)

/* Editar Calzado */
router.get('/calzado/:id', isLoggedIn, articulosController.getArticuloByCalzado)

router.post('/calzado/edit/:id', isLoggedIn, articulosController.editArticuloCalzado)

// ---- DELETE Calzado
router.get('/calzado/delete/:id', isLoggedIn, articulosController.deleteCalzado)

// Accesorio
router.get('/accesorios', isLoggedIn, articulosController.listRopaAccesorio)

/* Editar Accesorios */
router.get('/accesorios/:id', isLoggedIn, articulosController.getArticuloByAccesorio)

router.post('/accesorios/edit/:id', isLoggedIn, articulosController.editArticuloAccesorio)

// ---- DELETE Calzado
router.get('/accesorios/delete/:id', isLoggedIn, articulosController.deleteAccesorio)

// POST - AGREGAR A ARTICULOS A DB
// Ropa
router.post('/newRopa', isLoggedIn, articulosController.newRopa)

// Calzado
router.post('/newCalzado', isLoggedIn, articulosController.newCalzado)

// Accesorio
router.post('/newAccesorio', isLoggedIn, articulosController.newAccesorio)



/* ------------ FIN ARTICULOS ------------- */


// /articulos/marcas
router.get('/marcas', isLoggedIn, articulosController.listMarcas)

/* --- POST DE MARCAS --- */
router.post('/marcas/new', isLoggedIn, articulosController.newMarca)

/* Editar Marca */
router.get('/marcas/:id', isLoggedIn, articulosController.getMarcaById)

router.post('/marcas/edit/:id', isLoggedIn, articulosController.editMarca)

// Delete marcas
router.get('/marcas/delete/:id', isLoggedIn, articulosController.deleteMarca)

// /articulos/colores
/* --- GET --- */
router.get('/colores', isLoggedIn, articulosController.listColores)

/* --- POST --- */
router.post('/colores/new', isLoggedIn, articulosController.newColor)

/* Editar Colores */
router.get('/colores/:id', isLoggedIn, articulosController.getColorById)

router.post('/colores/edit/:id', isLoggedIn, articulosController.editColor)

// Delete marcas
router.get('/colores/delete/:id', isLoggedIn, articulosController.deleteColor)

/* /articulos/tipos/~ */
 
// /articulos/tipos/ropa
router.get('/tipos/ropa', isLoggedIn, articulosController.listRopa)

// /tipos de cada ropa
router.get('/tipos/ropa-list', isLoggedIn, articulosController.listTiposRopa)

/* --- POST DE TIPO DE ROPA --- */
router.post('/tipos/ropa-list/new', isLoggedIn, articulosController.newTipoRopa)

/* Editar Tipos de Ropa */
router.get('/tipos/ropa/:id', isLoggedIn, articulosController.getTipoRopaById)

router.post('/tipos/ropa/edit/:id', isLoggedIn, articulosController.editTipoRopa)

// Delete Tipos de Ropa
router.get('/tipos/ropa/delete/:id', isLoggedIn, articulosController.deleteTipoRopa)

// /articulos/tipos/calzado
router.get('/tipos/calzado', isLoggedIn, articulosController.listCalzado)

// /tipos de cada calzado
router.get('/tipos/calzado-list', isLoggedIn, articulosController.listTiposCalzado)

/* --- POST DE TIPO DE CALZADO --- */
router.post('/tipos/calzado-list/new', isLoggedIn, articulosController.newTipoCalzado)

/* Editar Tipos de Calzado */
router.get('/tipos/calzado/:id', isLoggedIn, articulosController.getTipoCalzadoById)

router.post('/tipos/calzado/edit/:id', isLoggedIn, articulosController.editTipoCalzado)

// Delete Tipos de Ropa
router.get('/tipos/calzado/delete/:id', isLoggedIn, articulosController.deleteTipoCalzado)

// /articulos/tipos/accesorios
router.get('/tipos/accesorios', isLoggedIn, articulosController.listAccesorios)

/* Editar Tipos de Accesorios */
router.get('/tipos/accesorios/:id', isLoggedIn, articulosController.getTipoAccesorioById)

router.post('/tipos/accesorios/edit/:id', isLoggedIn, articulosController.editTipoAccesorio)

// Delete Tipos de Accesorios
router.get('/tipos/accesorios/delete/:id', isLoggedIn, articulosController.deleteTipoAccesorio)

// /tipos de cada accesorio
router.get('/tipos/accesorios-list', isLoggedIn, articulosController.listTiposAccesorios)

/* --- POST DE TIPO DE ACCESORIO --- */
router.post('/tipos/accesorios-list/new', isLoggedIn, articulosController.newTipoAccesorio)

module.exports = router
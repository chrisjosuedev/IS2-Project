const myConn = require('../db')
const artController = {}

/* ----------- ARTICULOS --------------- */

// Articulos Listar 
artController.listArticulos = async (req, res) => {
    const queryArt = `SELECT articulos.*, marca.NOMBRE_MARCA, tipo_articulos.NOMBRE_TIPOARTICULO, descuentos.PORCENTAJE
    FROM articulos
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN tipo_articulos ON tipo_articulos.ID_TIPOARTICULO = articulos.ID_TIPOARTICULO
    INNER JOIN descuentos ON descuentos.ID_DESCUENTO = articulos.ID_DESCUENTO
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`
    const articulos = await myConn.query(queryArt)

    // Consultas para Selects
    const tipo_articulos = await myConn.query("SELECT * FROM tipo_articulos")
    const marca = await myConn.query("SELECT * FROM marca")
    const descuentos = await myConn.query("SELECT * FROM descuentos")

    res.render('articulos/items', { articulos, descuentos, marca, tipo_articulos })
}

/* GET ARTICULO POR ID */
artController.getArtById = async (req, res) => {
    const { id } = req.params

    const articulos = await myConn.query("SELECT * FROM articulos WHERE ID_ARTICULO = ?", [id])

    res.json(articulos)
}

/* ------------- FIN ARTICULOS ------------- */

// Tipos
artController.listTipos = async (req, res) => {
    const tipos = await myConn.query("SELECT * FROM tipo_articulos;")
    res.render('articulos/tipos', { tipos })
}

artController.newTipos = async (req, res) => {
    const { nombre_tipoarticulo } = req.body

    const newTipo = {
        nombre_tipoarticulo
    }

    await myConn.query("INSERT INTO tipo_articulos set ?", [newTipo])

    req.flash("success", "Tipo de Articulo Agregado Correctamente")

    res.redirect('/articulos/tipos')
}

artController.getTipoById = async (req, res) => {
    const { id } = req.params
    const tipos = await myConn.query("SELECT * FROM tipo_articulos WHERE id_tipoarticulo = ?", [id])
    res.json(tipos)
}

artController.editTipos = async (req, res) => {
    const { id } = req.params;
    const { nombre_tipoarticulo } = req.body;
    const newTipo = {
        nombre_tipoarticulo
    }

    await myConn.query("UPDATE tipo_articulos set ? WHERE id_tipoarticulo = ?", [
        newTipo,
        id,
    ])

    req.flash("success", "Tipo de Articulo Actualizado Correctamente");
    res.redirect("/articulos/tipos");
}

artController.deleteTipos = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM tipo_articulos WHERE id_tipoarticulo = ?", [id], (error, results) => {
        if (error) {
            req.flash("warning", "El tipo de Articulo seleccionado no puede ser eliminada");
            res.redirect("/articulos/tipos");
        }
        else {
            req.flash("success", "Tipo de Articulo Eliminado Correctamente");
            res.redirect("/articulos/tipos");   
        }
    });
    
}

// Marcas Listar
artController.listMarcas = async (req, res) => {
    const marca = await myConn.query("SELECT * FROM marca;")
    res.render('articulos/marca', { marca })
}

artController.newMarca = async (req, res) => {
    const { nombre_marca } = req.body

    const newMarca = {
        nombre_marca
    }

    await myConn.query("INSERT INTO marca set ?", [newMarca])

    req.flash("success", "Marca Agregada Correctamente")

    res.redirect('/articulos/marcas')
}

// ------ EDITAR MARCA
artController.getMarcaById = async (req, res) => {
    const { id } = req.params
    const marca = await myConn.query("SELECT * FROM marca WHERE id_marca = ?", [id])
    res.json(marca)
}

artController.editMarca = async (req, res) => {
    const { id } = req.params;
    const { nombre_marca } = req.body;
    const newMarca = {
        nombre_marca,
    }

    await myConn.query("UPDATE marca set ? WHERE id_marca = ?", [
        newMarca,
        id,
    ])

    req.flash("success", "Marca Actualizada Correctamente");
    res.redirect("/articulos/marcas");
}

// -- Eliminar Marca
artController.deleteMarca = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM marca WHERE id_marca = ?", [id], (error, results) => {
        if (error) {
            req.flash("warning", "La marca seleccionada no puede ser eliminada");
            res.redirect("/articulos/marcas");
        }
        else {
            req.flash("success", "Marca Eliminada Correctamente");
            res.redirect("/articulos/marcas");   
        }
    });
    
}

/* Tipo de Articulo */


/* Garantia */
artController.getGarantias = async (req, res) => {
    res.render('articulos/garantias')
}

module.exports = artController
const myConn = require('../db')
const artController = {}

/* ----------- ARTICULOS --------------- */

// Articulos Listar 
artController.listArticulos = async (req, res) => {
    const queryArt = `SELECT articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR
    FROM articulos
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`
    const articulos = await myConn.query(queryArt)

    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")

    res.render('articulos/items', { articulos, color, marca, linea_articulo })
}

/* GET ARTICULO POR ID */
artController.getArtById = async (req, res) => {
    const { id } = req.params

    const articulos = await myConn.query("SELECT * FROM articulos WHERE ID_ARTICULO = ?", [id])

    res.json(articulos)
}

/* ------------- FIN ARTICULOS ------------- */

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
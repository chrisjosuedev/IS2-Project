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

// Ropa Listar
artController.listRopaArticulos = async (req, res ) => {
    const queryRopa = `SELECT ropa.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR, 
	tipos_ropa.DESC_TIPOSROPA
    FROM ropa
    INNER JOIN articulos ON articulos.ID_ARTICULO = ropa.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_ropa ON ropa.ID_TIPOSROPA = tipos_ropa.ID_TIPOSROPA
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")

    // Consulta Ropa
    const ropa = await myConn.query(queryRopa)

    res.render('articulos/ropa', { ropa, color, marca, linea_articulo, tipos_ropa })
}

// Calzado Listar
artController.listRopaCalzado = async (req, res ) => {
    const queryCalzado = `SELECT calzado.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR,
	tipos_calzado.DESC_TIPOCALZADO
    FROM calzado
    INNER JOIN articulos ON articulos.ID_ARTICULO = calzado.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_calzado ON calzado.ID_TIPOCALZADO = tipos_calzado.ID_TIPOCALZADO
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")

    // Consulta Ropa
    const calzado = await myConn.query(queryCalzado)

    res.render('articulos/calzado', { calzado, color, marca, linea_articulo, tipos_calzado })
}

// Accesorios Listar
artController.listRopaAccesorio = async (req, res ) => {
    const queryAccesorios = `SELECT accesorios.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR,
	tipos_accesorios.DESC_TIPOACCESORIO
    FROM accesorios
    INNER JOIN articulos ON articulos.ID_ARTICULO = accesorios.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_accesorios ON accesorios.ID_TIPOACCESORIO = tipos_accesorios.ID_TIPOACCESORIO
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_accesorios = await myConn.query("SELECT * FROM tipos_accesorios")

    // Consulta Ropa
    const accesorios = await myConn.query(queryAccesorios)

    res.render('articulos/accesorios', { accesorios, color, marca, linea_articulo, tipos_accesorios })
}

/* POST */

// Articulos Ropa Agregar
artController.newRopa = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tiposropa, id_ban } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nueva Ropa

    await myConn.query("INSERT INTO ropa (ID_ARTICULO, ID_TIPOSROPA) VALUES (?, ?)", 
                        [id_articulo[0].ID_ARTICULO, id_tiposropa])

    req.flash("success", "Ropa Agregada Correctamente");

    // Redirect
    (id_ban === 'ropa') ? res.redirect("/articulos/ropa") : res.redirect("/articulos")

}

// ------------- EDITAR ARTICULO ROPA -----------------
artController.getArticuloByRopa = async (req, res) => {
    const { id } = req.params

    const queryRopa = `SELECT ropa.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR, 
	tipos_ropa.*
    FROM ropa
    INNER JOIN articulos ON articulos.ID_ARTICULO = ropa.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_ropa ON ropa.ID_TIPOSROPA = tipos_ropa.ID_TIPOSROPA
    WHERE articulos.ID_ARTICULO = ?
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC`

    // Consulta Ropa
    const ropa = await myConn.query(queryRopa, [id])

    res.json(ropa)
}

artController.editArticuloRopa = async (req, res) => {
    const { id } = req.params;
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tiposropa } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    const newRopa = {
        id_tiposropa
    }

    await myConn.query("UPDATE articulos set ? WHERE id_articulo = ?", [newArticulo, id])

    // Nueva Ropa

    await myConn.query("UPDATE ropa set ? WHERE id_articulo = ?", [newRopa, id])

    req.flash("success", "Ropa Editada Correctamente");

    res.redirect("/articulos/ropa")

}

// ---------- Eliminar Ropa
artController.deleteRopa = async (req, res) => {
    const { id } = req.params;

    await myConn.query("DELETE FROM ropa WHERE id_articulo = ?", [id]);
    await myConn.query("DELETE FROM articulos WHERE id_articulo = ?", [id]);
    
    req.flash("success", "Ropa Eliminado Correctamente");
    res.redirect("/articulos/ropa");
}

// Articulos Calzado Agregar
artController.newCalzado = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipocalzado, id_ban  } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit,  
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nuevo Calzado

    await myConn.query("INSERT INTO calzado (ID_ARTICULO, ID_TIPOCALZADO) VALUES (?, ?)",
                        [id_articulo[0].ID_ARTICULO, id_tipocalzado])

    req.flash("success", "Calzado Agregado Correctamente");

    // Redirect
    (id_ban === 'calzado') ? res.redirect("/articulos/calzado") : res.redirect("/articulos")
  
}

// ------------- EDITAR ARTICULO CALZADO -----------------
artController.getArticuloByCalzado = async (req, res) => {
    const { id } = req.params

    const queryCalzado = `SELECT calzado.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR, 
	tipos_calzado.*
    FROM calzado
    INNER JOIN articulos ON articulos.ID_ARTICULO = calzado.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_calzado ON calzado.ID_TIPOCALZADO = tipos_calzado.ID_TIPOCALZADO
    WHERE articulos.ID_ARTICULO = ?
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC`

    // Consulta Calzado
    const calzado = await myConn.query(queryCalzado, [id])

    res.json(calzado)
}

artController.editArticuloCalzado = async (req, res) => {
    const { id } = req.params;
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipocalzado } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    const newCalzado = {
        id_tipocalzado
    }

    await myConn.query("UPDATE articulos set ? WHERE id_articulo = ?", [newArticulo, id])

    // Nueva Ropa

    await myConn.query("UPDATE calzado set ? WHERE id_articulo = ?", [newCalzado, id])

    req.flash("success", "Calzado Editado Correctamente");

    res.redirect("/articulos/calzado")

}

// ---------- Eliminar Calzado
artController.deleteCalzado = async (req, res) => {
    const { id } = req.params;

    await myConn.query("DELETE FROM calzado WHERE id_articulo = ?", [id]);
    await myConn.query("DELETE FROM articulos WHERE id_articulo = ?", [id]);
    
    req.flash("success", "Calzado Eliminado Correctamente");
    res.redirect("/articulos/calzado");
}

// Articulos Accesorio Agregar
artController.newAccesorio = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipoaccesorio, id_ban } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nuevo Calzado

    await myConn.query("INSERT INTO accesorios (ID_ARTICULO, ID_TIPOACCESORIO) VALUES (?, ?)",
                        [id_articulo[0].ID_ARTICULO, id_tipoaccesorio])

    req.flash("success", "Accesorio Agregado Correctamente");

    // Redirect
    (id_ban === 'accesorio') ? res.redirect("/articulos/accesorios") : res.redirect("/articulos")

}

// ------------- EDITAR ARTICULO ACCESORIO -----------------

artController.getArticuloByAccesorio = async (req, res) => {
    const { id } = req.params

    const queryAccesorio = `SELECT accesorios.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR, 
	tipos_accesorios.*
    FROM accesorios
    INNER JOIN articulos ON articulos.ID_ARTICULO = accesorios.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_accesorios ON accesorios.ID_TIPOACCESORIO = tipos_accesorios.ID_TIPOACCESORIO
    WHERE articulos.ID_ARTICULO = ?
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC`

    // Consulta Accesorio
    const accesorios = await myConn.query(queryAccesorio, [id])

    res.json(accesorios)
}

artController.editArticuloAccesorio = async (req, res) => {
    const { id } = req.params;
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipoaccesorio } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo
    }

    const newAccesorio = {
        id_tipoaccesorio
    }

    await myConn.query("UPDATE articulos set ? WHERE id_articulo = ?", [newArticulo, id])

    // Nueva Accesorio

    await myConn.query("UPDATE accesorios set ? WHERE id_articulo = ?", [newAccesorio, id])

    req.flash("success", "Accesorio Editado Correctamente");

    res.redirect("/articulos/accesorios")

}

// ---------- Eliminar Accesorio
artController.deleteAccesorio = async (req, res) => {
    const { id } = req.params;

    await myConn.query("DELETE FROM accesorios WHERE id_articulo = ?", [id]);
    await myConn.query("DELETE FROM articulos WHERE id_articulo = ?", [id]);
    
    req.flash("success", "Accesorio Eliminado Correctamente");
    res.redirect("/articulos/accesorios");
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

/* ---------- COLORES ----------- */

// Colores Listar
artController.listColores = async (req, res) => {
    const color_articulo = await myConn.query("SELECT * FROM color_articulo")
    res.render('articulos/colores', { color_articulo })
}

artController.newColor = async(req, res) => {
    const { desc_color } = req.body

    const newColor = {
        desc_color
    }

    await myConn.query("INSERT INTO color_articulo set ?", [newColor])

    req.flash("success", "Color Agregado Correctamente")

    res.redirect('/articulos/colores')
}

artController.getColorById = async (req, res) => {
    const { id } = req.params
    const color = await myConn.query("SELECT * FROM color_articulo WHERE id_color = ?", [id])
    res.json(color)
}

artController.editColor = async (req, res) => {
    const { id } = req.params;
    const { desc_color } = req.body;
    const newColor = {
        desc_color,
    }

    await myConn.query("UPDATE color_articulo set ? WHERE id_color = ?", [newColor, id])

    req.flash("success", "Color Actualizado Correctamente")

    res.redirect("/articulos/colores")
}

// -- Eliminar Marca
artController.deleteColor = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM color_articulo WHERE id_color = ?", [id],
    (error, results) => {
        if (error) {
            req.flash("warning", "El Color seleccionado no puede ser eliminado");
            res.redirect("/articulos/colores");    
        }
        else {
            req.flash("success", "Color Eliminado Correctamente");
            res.redirect("/articulos/colores");  
        }
    });
}

/* Tipos de Articulo List */
// Ropa
artController.listRopa = async (req, res) => {
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")
    res.render('articulos/tipos/ropa', { tipos_ropa })
}

artController.newTipoRopa = async (req, res) => {
    const { desc_tiposropa } = req.body

    const newTipoRopa = {
        desc_tiposropa
    }
    
    await myConn.query("INSERT INTO tipos_ropa set ?", [newTipoRopa])

    req.flash("success", "Tipo de Ropa Agregado Correctamente")

    res.redirect('/articulos/tipos/ropa')
}

// -- Editar Tipo de Ropa
artController.getTipoRopaById = async (req, res) => {
    const { id } = req.params;
    const ropa = await myConn.query("SELECT * FROM tipos_ropa WHERE id_tiposropa = ?",
      [id]
    )
    res.json(ropa)
}

artController.editTipoRopa = async (req, res) => {
    const { id } = req.params;
    const { desc_tiposropa } = req.body;
    const newTipoRopa = {
        desc_tiposropa
    }

    await myConn.query("UPDATE tipos_ropa set ? WHERE id_tiposropa = ?", [
      newTipoRopa,
      id,
    ])

    req.flash("success", "Tipo de Ropa Editado Correctamente");
    
    res.redirect("/articulos/tipos/ropa");
}

// -- Eliminar Tipo de Ropa
artController.deleteTipoRopa = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM tipos_ropa WHERE id_tiposropa = ?", [id],
    (error, results) => {
        if (error) {
            req.flash("warning", "El tipo de Ropa seleccionado no puede ser eliminado");
            res.redirect("/articulos/tipos/ropa");   
        }
        else {
            req.flash("success", "Tipo de Ropa Eliminado Correctamente");
            res.redirect("/articulos/tipos/ropa");  
        }
    });
}

// Calzado
artController.listCalzado = async (req, res) => {
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")
    res.render('articulos/tipos/calzado', { tipos_calzado })
}

artController.newTipoCalzado = async (req, res) => {
    const { desc_tipocalzado } = req.body

    const newTipoCalzado = {
        desc_tipocalzado
    }

    await myConn.query("INSERT INTO tipos_calzado set ?", [newTipoCalzado])

    req.flash("success", "Tipo de Calzado Agregado Correctamente")

    res.redirect('/articulos/tipos/calzado')

}

// -- Editar Tipo de Calzado
artController.getTipoCalzadoById = async (req, res) => {
    const { id } = req.params;
    const calzado = await myConn.query("SELECT * FROM tipos_calzado WHERE id_tipocalzado = ?",
      [id]
    )
    res.json(calzado)
}

artController.editTipoCalzado = async (req, res) => {
    const { id } = req.params;
    const { desc_tipocalzado } = req.body;

    const newTipoCalzado = {
        desc_tipocalzado
    }
    
    await myConn.query("UPDATE tipos_calzado set ? WHERE id_tipocalzado = ?", [
        newTipoCalzado,
      id,
    ])

    req.flash("success", "Tipo de Calzado Editado Correctamente");
    
    res.redirect('/articulos/tipos/calzado')
}

// -- Eliminar Tipo de Calzado
artController.deleteTipoCalzado = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM tipos_calzado WHERE id_tipocalzado = ?", [id],
    (error, results) => {
        if (error) {
            req.flash("warning", "El tipo de Calzado seleccionado no puede ser eliminado");
            res.redirect("/articulos/tipos/calzado");  
        }
        else {
            req.flash("success", "Tipo de Calzado Eliminado Correctamente");
            res.redirect("/articulos/tipos/calzado");   
        }
    });
}

// Accesorios
artController.listAccesorios = async (req, res) => {
    const tipos_accesorios = await myConn.query("SELECT * FROM tipos_accesorios")
    res.render('articulos/tipos/accesorios', { tipos_accesorios })
}

artController.newTipoAccesorio = async (req, res) => {
    const { desc_tipoaccesorio } = req.body

    const newTipoAccesorio = {
        desc_tipoaccesorio
    }

    await myConn.query("INSERT INTO tipos_accesorios set ?", [newTipoAccesorio])

    req.flash("success", "Tipo de Accesorio Agregado Correctamente")

    res.redirect('/articulos/tipos/accesorios')
}

// -- Editar Tipo de Accesorios
artController.getTipoAccesorioById = async (req, res) => {
    const { id } = req.params;
    const accesorio = await myConn.query("SELECT * FROM tipos_accesorios WHERE id_tipoaccesorio = ?",
      [id]
    )
    res.json(accesorio)
}

artController.editTipoAccesorio = async (req, res) => {
    const { id } = req.params;
    const { desc_tipoaccesorio } = req.body

    const newTipoAccesorio = {
        desc_tipoaccesorio
    }
    
    await myConn.query("UPDATE tipos_accesorios set ? WHERE id_tipoaccesorio = ?", [newTipoAccesorio, id])

    req.flash("success", "Tipo de Accesorio Editado Correctamente");
    
    res.redirect('/articulos/tipos/accesorios')
}

// -- Eliminar Tipo de Accesorio
artController.deleteTipoAccesorio = async (req, res) => {
    const { id } = req.params;
    await myConn.query("DELETE FROM tipos_accesorios WHERE id_tipoaccesorio = ?", [id], 
    (error, results) => {
        if (error) {
            req.flash("warning", "El tipo de Accesorio seleccionado no puede ser eliminado");
            res.redirect("/articulos/tipos/accesorios");
        }
        else {
            req.flash("success", "Tipo de Accesorio Eliminado Correctamente");
            res.redirect("/articulos/tipos/accesorios");   
        }
    });   
}

// JSON Tipos de Cada Articulo

// Tipos de Ropa
artController.listTiposRopa = async (req, res) => {
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")
    res.json(tipos_ropa)
}

// Tipos de Calzado
artController.listTiposCalzado = async (req, res) => {
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")
    res.json(tipos_calzado)
}

// Tipos de Accesorios
artController.listTiposAccesorios = async (req, res) => {
    const tipos_accesorio = await myConn.query("SELECT * FROM tipos_accesorios")
    res.json(tipos_accesorio)
}

/* Fin Tipos de Articulos */

module.exports = artController
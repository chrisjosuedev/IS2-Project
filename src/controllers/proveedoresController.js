const myConn = require('../db')
const provController = {}

// Proveedores
provController.listProveedores = async (req, res) => {
  const proveedores = await myConn.query("SELECT * FROM proveedores")
  res.render('proveedores/proveedores', { proveedores })
}


/* POST Proveedores */
provController.newProveedor = async (req, res) => {
  const { id_proveedor, 
      nombre_proveedor, 
      email_proveedor, 
      cel_proveedor } = req.body;

  const newProveedor = {
    id_proveedor,
    nombre_proveedor,
    email_proveedor,
    cel_proveedor,
  }

  await myConn.query("INSERT INTO proveedores set ?", [newProveedor])

  req.flash("success", "Proveedor Agregado Correctamente")

  res.redirect("/proveedores");
}

// -- Editar Proveedor
provController.getProveedorById = async (req, res) => {
  const { id } = req.params;
  const proveedores = await myConn.query("SELECT * FROM proveedores WHERE id_proveedor = ?",
    [id]
  )
  res.json(proveedores)
}

provController.editProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre_proveedor, email_proveedor, cel_proveedor } = req.body;
  const newProveedor = {
    nombre_proveedor,
    email_proveedor,
    cel_proveedor,
  };
  await myConn.query("UPDATE proveedores set ? WHERE id_proveedor = ?", [
    newProveedor,
    id,
  ])

  req.flash("success", "Proveedor Editado Correctamente");
  
  res.redirect("/proveedores");
}

// -- Eliminar Proveedor
provController.deleteProveedor = async (req, res) => {
  const { id } = req.params;
  await myConn.query("DELETE FROM proveedores WHERE id_proveedor = ?", [id], 
  (error, results) => {
    if (error) {
        req.flash("warning", "El Proveedor seleccionado no puede ser eliminado");
        res.redirect("/proveedores");   
    }
    else {
        req.flash("success", "Proveedor Eliminado Correctamente");
        res.redirect("/proveedores");
    }
  });

}



module.exports = provController
const myConn = require("../db");
const transaccionController = {};

/** METODOS DE PAGO **/

transaccionController.listMetodosPago = async (req, res) => {
  const modo_pago = await myConn.query("SELECT * FROM modo_pago");
  res.render("transacciones/metodo-pago", { modo_pago });
};

transaccionController.newMetodoPago = async (req, res) => {
  const { desc_modopago } = req.body;
  const newModoPago = {
    desc_modopago,
  };

  await myConn.query("INSERT INTO modo_pago set ?", [newModoPago]);

  req.flash("success", "Metodo de Pago Agregado Correctamente");

  res.redirect("/transacciones/metodos-pago");
};

// JSON Tipos Metodos Pago
transaccionController.getMetodoPago = async (req, res) => {
  const { id } = req.params;

  const modo_pago = await myConn.query(
    "SELECT * FROM modo_pago WHERE id_modopago = ?",
    [id]
  );

  res.json(modo_pago);
};

//  -------- Eliminar Metodo de Pago
transaccionController.deleteMetodoPago = async (req, res) => {
  const { id } = req.params;
  await myConn.query(
    "DELETE FROM modo_pago WHERE id_modopago = ?",
    [id],
    (error, results) => {
      if (error) {
        req.flash(
          "warning",
          "El Metodo de Pago seleccionado no puede ser eliminado"
        );
        res.redirect("/transacciones/metodos-pago");
      } else {
        req.flash("success", "Metodo de Pago Eliminado Correctamente");
        res.redirect("/transacciones/metodos-pago");
      }
    }
  );
};

// ------- EDITAR METODO DE PAGO
transaccionController.editMetodoPago = async (req, res) => {
  const { id } = req.params;
  const { desc_modopago } = req.body;
  const newModoPago = {
    desc_modopago,
  };
  await myConn.query("UPDATE modo_pago set ? WHERE id_modopago = ?", [
    newModoPago,
    id,
  ]);

  req.flash("success", "Modo Pago Actualizado Correctamente");
  res.redirect("/transacciones/metodos-pago");
};

/* ------------------------- Transacciones ----------------------------- */

// Compra a proveedores
transaccionController.newCompra = async (req, res) => {
  res.render("transacciones/comprar");
};

transaccionController.addNewCompra = async (req, res) => {
  const {
    id_proveedor, id_articulo, cantidad, precio_compra
  } = req.body;

  // Almacenar Compra del articulo
  const newCompraArticulo = {
    id_proveedor
  };

  await myConn.query("INSERT INTO compra_articulo set ?", [newCompraArticulo]);


  // Capturar el ID de la ultima compra generada
  const idCompraQuery = `SELECT ID_COMPRA FROM compra_articulo
                        ORDER BY ID_COMPRA DESC
                        LIMIT 1`;

  // Almacenar el valor del ID de la ultima Compra
  const idCompra = await myConn.query(idCompraQuery);


  // Object Compra Detalle

  const newCompraDetails = []

 
  for (let i = 0; i < id_articulo.length; i++) {
    newCompraDetails.push({
      id_compra: idCompra[0].ID_COMPRA,
      id_articulo: id_articulo[i],
      cantidad: cantidad[i],
      precio_compra: precio_compra[i]
    })
  }

  newCompraDetails.forEach(async (item) => {
    await myConn.query("INSERT INTO compra_articulo_detalle set ?", [item])
  })
  
  // Actualizar Stock
  const updateStockQuery = `UPDATE articulos set STOCK = (STOCK + ?) 
  WHERE ID_ARTICULO = ?;`;

  for (key in id_articulo) {
    await myConn.query(updateStockQuery, [ cantidad[key], id_articulo[key]]);
  }

  req.flash("success", "Compra registrada satisfactoriamente")
  res.redirect('/transacciones/facturas/new')
}

transaccionController.addNewFactura = async (req, res) => {
  const {
    id_persona,
    id_empleado,
    id_modopago,
    id_articulo,
    cantidad,
    precio_unit,
    efectivo,
  } = req.body;

  // Factura General
  const newFactura = {
    id_persona,
    id_empleado,
    id_modopago,
  };

  // Guardar Factura General
  await myConn.query("INSERT INTO factura set ?", [newFactura])

  // Capturar ID de Factura
   const idVentaQuery = `SELECT ID_FACTURA FROM factura
   ORDER BY ID_FACTURA DESC
   LIMIT 1`;

  const idVenta = await myConn.query(idVentaQuery);


  // Object Factura Detalle

  const newProductDetails = []

 
  for (let i = 0; i < id_articulo.length; i++) {
    newProductDetails.push({
      id_factura: idVenta[0].ID_FACTURA,
      id_articulo: id_articulo[i],
      cantidad: cantidad[i],
      precio_unit: precio_unit[i]
    })
  }

  newProductDetails.forEach(async (item) => {
    await myConn.query("INSERT INTO factura_detalle set ?", [item])
  })
  
  // Actualizar Stock
  const updateStockQuery = `UPDATE articulos set STOCK = (STOCK - ?) 
  WHERE ID_ARTICULO = ?;`;

  for (key in id_articulo) {
    await myConn.query(updateStockQuery, [ cantidad[key], id_articulo[key] ]);
  }

  req.flash("success", "Venta registrada satisfactoriamente")
  res.redirect('/transacciones/facturas/new')
}

// Facturar un producto
transaccionController.newFactura = async (req, res) => {
  const metodopago = await myConn.query("SELECT * FROM modo_pago");
  const departamentos = await myConn.query("SELECT * FROM departamentos");
  res.render("transacciones/facturar", { metodopago, departamentos });
};

/** Arqueos */
transaccionController.newArqueo = async (req, res) => {
  res.render('transacciones/arqueos')
}

/** Devoluciones **/
transaccionController.newDevolucion = async (req, res) => {
  res.render('transacciones/devoluciones')
}

module.exports = transaccionController;

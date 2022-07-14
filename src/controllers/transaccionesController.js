const myConn = require("../db");
const transaccionController = {};

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

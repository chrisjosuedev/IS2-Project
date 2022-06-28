const myConn = require('../db')
const consultasController = {}

/* ------------------------- COMPRAS ----------------------------- */

// Listar todas las compras
consultasController.listCompras = async (req, res) => {
  const comprasQuery = `SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  GROUP BY compra_articulo.ID_COMPRA
  ORDER BY compra_articulo.ID_COMPRA ASC;`;
  const compras = await myConn.query(comprasQuery);
  res.render("consultas/compras/general", { compras });
}

// JSON de todas las compras
consultasController.totalCompras = async (req, res) => {
  const comprasQuery = `SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  GROUP BY compra_articulo.ID_COMPRA
  ORDER BY compra_articulo.ID_COMPRA ASC;`;
  const compras = await myConn.query(comprasQuery);
  res.json(compras);
}

// Filtrado de Compras por Fecha
consultasController.findCompraByDate = async (req, res) => {
  const { fechain, fechaout } = req.params

  const comprasDateQuery = `
  SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  WHERE compra_articulo.FECHA BETWEEN ? AND ?
  GROUP BY compra_articulo.ID_COMPRA
  `
  const compras = await myConn.query(comprasDateQuery, [fechain, fechaout])
  res.json(compras)
}

// Detalle Compra
consultasController.getCompraByID = async (req, res) => {
  const { id } = req.params;
  const queryDetails = `
    SELECT compra_articulo_detalle.ID_COMPRA, compra_articulo_detalle.ID_ARTICULO, 
    articulos.DESCRIPCION,
    compra_articulo_detalle.CANTIDAD, compra_articulo_detalle.PRECIO_COMPRA,
    round(sum(compra_articulo_detalle.CANTIDAD * compra_articulo_detalle.PRECIO_COMPRA), 2) as  SUBTOTAL
    FROM compra_articulo_detalle
    INNER JOIN articulos ON articulos.ID_ARTICULO = compra_articulo_detalle.ID_ARTICULO
    WHERE ID_COMPRA = ?
    GROUP BY compra_articulo_detalle.ID_ARTICULO
  `;

  const compraDetails = await myConn.query(queryDetails, [id]);

  const proveedorCompra = await myConn.query(`
      SELECT compra_articulo.ID_COMPRA, proveedores.NOMBRE_PROVEEDOR
      FROM compra_articulo
      INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
      WHERE ID_COMPRA = ?
      GROUP BY compra_articulo.ID_COMPRA;
  `, [id])

  res.render("consultas/compras/detalle", {
    compraDetails,
    proveedorCompra: proveedorCompra[0]
  });

}

/* ------------------- FACTURAS -------------------- */
consultasController.listVentas = async (req, res) => {
  const ventasQuery = `
    SELECT factura.*, persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA, modo_pago.DESC_MODOPAGO
    FROM factura_detalle
    INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
    INNER JOIN persona ON factura.ID_PERSONA = persona.ID_PERSONA
    INNER JOIN modo_pago ON modo_pago.ID_MODOPAGO = factura.ID_MODOPAGO 
    GROUP BY factura.ID_FACTURA
    ORDER BY factura.ID_FACTURA ASC`;
  const ventas = await myConn.query(ventasQuery);
  res.render("consultas/ventas/general", { ventas });
}

// JSON
consultasController.totalVentas = async (req, res) => {
  const ventasQuery = `
    SELECT factura.*, persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA, modo_pago.DESC_MODOPAGO
    FROM factura_detalle
    INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
    INNER JOIN persona ON factura.ID_PERSONA = persona.ID_PERSONA
    INNER JOIN modo_pago ON modo_pago.ID_MODOPAGO = factura.ID_MODOPAGO 
    GROUP BY factura.ID_FACTURA
    ORDER BY factura.ID_FACTURA ASC`;
  const ventas = await myConn.query(ventasQuery);
  res.json(ventas);
}

// Filtrado de Ventas por Fecha
consultasController.findVentaByDate = async (req, res) => {
  const { fechain, fechaout } = req.params

  const ventasDateQuery = `
  SELECT factura.*, persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA, modo_pago.DESC_MODOPAGO
  FROM factura_detalle
  INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
  INNER JOIN persona ON factura.ID_PERSONA = persona.ID_PERSONA
  INNER JOIN modo_pago ON modo_pago.ID_MODOPAGO = factura.ID_MODOPAGO
  WHERE factura.FECHA BETWEEN ? AND ?
  GROUP BY factura.ID_FACTURA
  `
  const ventas = await myConn.query(ventasDateQuery, [fechain, fechaout])
  res.json(ventas)
}

// Detalle Venta
consultasController.getVentaByID = async (req, res) => {
  const { id } = req.params;
  const queryDetails = `
    SELECT factura_detalle.ID_FACTURA, factura_detalle.ID_ARTICULO, articulos.DESCRIPCION,
    factura_detalle.CANTIDAD, factura_detalle.PRECIO_UNIT,
    round(sum(factura_detalle.CANTIDAD * factura_detalle.PRECIO_UNIT), 2) as SUBTOTAL
    FROM factura_detalle
    INNER JOIN articulos ON articulos.ID_ARTICULO = factura_detalle.ID_ARTICULO
    WHERE ID_FACTURA = ?
    GROUP BY factura_detalle.ID_ARTICULO;
  `;
  const facturaDetails = await myConn.query(queryDetails, [id]);

  // General Factura
  const queryGeneral = `
  SELECT ID_FACTURA, FECHA, (SELECT concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) FROM persona, factura
  WHERE persona.ID_PERSONA = factura.ID_PERSONA AND ID_FACTURA = ?) as Cliente, 
  (SELECT concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) FROM persona, empleado,  factura
  WHERE persona.ID_PERSONA = empleado.ID_PERSONA AND empleado.ID_EMPLEADO = factura.ID_EMPLEADO AND ID_FACTURA = ?) as Empleado,
  modo_pago.DESC_MODOPAGO
  FROM factura
  INNER JOIN modo_pago ON modo_pago.ID_MODOPAGO = factura.ID_MODOPAGO
  Where ID_FACTURA = ?;
  `;

  const facturaGeneral = await myConn.query(queryGeneral, [id, id, id]);

  res.render("consultas/ventas/detalle", {
    facturaDetails,
    facturaGeneral: facturaGeneral[0],
  });

}


module.exports = consultasController
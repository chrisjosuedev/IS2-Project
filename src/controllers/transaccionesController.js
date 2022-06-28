const myConn = require("../db");
const transaccionController = {};
const PDF = require("pdfkit-construct");
const { lineGap } = require("pdfkit-construct");

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

// ------------------------ Registrar Compra a Proveedor ----------------- //
transaccionController.agregarCompra = async (req, res) => {
  const { id_proveedor, id_articulo, cantidad, precio_compra, filas } =
    req.body;

  // Almacenar Compra del articulo
  const newCompraArticulo = {
    id_proveedor,
  };

  await myConn.query("INSERT INTO compra_articulo set ?", [newCompraArticulo]);

  // Capturar el ID de la ultima compra generada
  const idCompraQuery = `SELECT ID_COMPRA FROM compra_articulo
                        ORDER BY ID_COMPRA DESC
                        LIMIT 1`;

  // Almacenar el valor del ID de la ultima Compra
  const idCompra = await myConn.query(idCompraQuery);

  // Insertar en Compra Articulo Detalle
  const detalleCompraQuery = `
      INSERT INTO compra_articulo_detalle (ID_COMPRA, ID_ARTICULO, CANTIDAD, PRECIO_COMPRA) 
      VALUES (?, ?, ?, ?)
    `;

  // Si filas === 1 el carrito tiene solamente 1 producto
  if (filas === "1") {
    // Insertar en Tabla normal
    await myConn.query(detalleCompraQuery, [
      idCompra[0].ID_COMPRA,
      id_articulo,
      cantidad,
      precio_compra,
    ]);

    // Actualizar en Stock
    await myConn.query(
      `UPDATE articulos set STOCK = (STOCK + ?) 
    WHERE ID_ARTICULO = ?;`,
      [cantidad, id_articulo]
    );
  }
  // Si no, el carrito tiene mas de 1 producto
  else {
    let idArticulo = Object.values(id_articulo);
    let amount = Object.values(cantidad);
    let price = Object.values(precio_compra);

    for (index in idArticulo) {
      await myConn.query(detalleCompraQuery, [
        idCompra[0].ID_COMPRA,
        idArticulo[index],
        amount[index],
        price[index],
      ]);
    }

    // Actualizar Stock
    const updateStockQuery = `UPDATE articulos set STOCK = (STOCK + ?) 
    WHERE ID_ARTICULO = ?;`;

    for (key in id_articulo) {
      await myConn.query(updateStockQuery, [amount[key], idArticulo[key]]);
    }
  }

  req.flash("success", "Compra almacenada satisfactoriamente");
  res.redirect("/transacciones/compras/new");
};

// -------------------- Registrar una Nueva Factura ------------------------------ //
transaccionController.agregarFactura = async (req, res) => {
  const {
    id_persona,
    id_empleado,
    id_modopago,
    id_articulo,
    cantidad,
    precio_unit,
    filas,
    efectivo,
  } = req.body;

  // Almacenar nueva factura
  const newFactura = {
    id_persona,
    id_empleado,
    id_modopago,
  };

  
  if (id_modopago === '2') {
    var factEfectivo = 0.00
  }
  else {
    var factEfectivo = Number(parseFloat(efectivo).toFixed(2))
  }

  // Guardar Factura General
  await myConn.query("INSERT INTO factura set ?", [newFactura]);

  // Capturar ID de Factura
  const idVentaQuery = `SELECT ID_FACTURA FROM factura
                        ORDER BY ID_FACTURA DESC
                        LIMIT 1`;

  const idVenta = await myConn.query(idVentaQuery);

  // Insertar Venta Factura_Detalle
  const detalleVentaQuery = `
    INSERT INTO factura_detalle (ID_FACTURA, ID_ARTICULO, CANTIDAD, PRECIO_UNIT) 
    VALUES (?, ?, ?, ?)
    `;

  if (filas === "1") {
    await myConn.query(detalleVentaQuery, [
      idVenta[0].ID_FACTURA,
      id_articulo,
      cantidad,
      precio_unit,
    ]);

    // Actualizar en Stock
    await myConn.query(
      `UPDATE articulos set STOCK = (STOCK - ?) 
      WHERE ID_ARTICULO = ?;`,
      [cantidad, id_articulo]
    );
  } else {
    let idArticulo = Object.values(id_articulo);
    let amount = Object.values(cantidad);
    let price = Object.values(precio_unit);

    for (index in idArticulo) {
      await myConn.query(detalleVentaQuery, [
        idVenta[0].ID_FACTURA,
        idArticulo[index],
        amount[index],
        price[index],
      ]);
    }

    // Actualizar Stock
    const updateStockQuery = `UPDATE articulos set STOCK = (STOCK - ?) 
                            WHERE ID_ARTICULO = ?;`;

    for (key in idArticulo) {
      await myConn.query(updateStockQuery, [amount[key], idArticulo[key]]);
    }
  }

  //* -------------- Crear PDF ---------------- *//
  var id = idVenta[0].ID_FACTURA

  const queryDetails = `
    SELECT LPAD(factura_detalle.ID_FACTURA, 8, '0') as ID_DOC, factura_detalle.ID_ARTICULO, articulos.DESCRIPCION,
    factura_detalle.CANTIDAD, factura_detalle.PRECIO_UNIT,
    round(sum(factura_detalle.CANTIDAD * factura_detalle.PRECIO_UNIT), 2) as SUBTOTAL
    FROM factura_detalle
    INNER JOIN articulos ON articulos.ID_ARTICULO = factura_detalle.ID_ARTICULO
    WHERE ID_FACTURA = ?
    GROUP BY factura_detalle.ID_ARTICULO;
  `;

  const facturaDetails = await myConn.query(queryDetails, [id]);

  var numDocumento = facturaDetails[0].ID_DOC

  const queryTotal = `SELECT round(sum(factura_detalle.CANTIDAD * factura_detalle.PRECIO_UNIT), 2) as Total
  FROM factura_detalle WHERE ID_FACTURA = ?;`;


  const facturaTotal = await myConn.query(queryTotal, [id]);

  // General Factura
  const queryGeneral = `SELECT FECHA, (SELECT concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) FROM persona, factura
      WHERE persona.ID_PERSONA = factura.ID_PERSONA AND ID_FACTURA = ?) as Cliente,
      (SELECT persona.ID_PERSONA FROM persona, factura
        WHERE persona.ID_PERSONA = factura.ID_PERSONA AND ID_FACTURA = ?) as ID_PERSONA,
    (SELECT concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) FROM persona, empleado, factura
      WHERE persona.ID_PERSONA = empleado.ID_PERSONA AND empleado.ID_EMPLEADO = factura.ID_EMPLEADO AND ID_FACTURA = ?) as Empleado,
       modo_pago.DESC_MODOPAGO
    FROM factura
    INNER JOIN modo_pago ON modo_pago.ID_MODOPAGO = factura.ID_MODOPAGO
    Where ID_FACTURA = ?;`;

  const facturaGeneral = await myConn.query(queryGeneral, [id, id, id, id]);

  // Datos Empresa
  const empresa = await myConn.query(`
  SELECT empresa.*, upper(ciudad.NOMBRE_CIUDAD) as CIUDAD, departamentos.NOMBRE_DEPTO
  FROM empresa
  INNER JOIN ciudad on empresa.ID_CIUDAD = ciudad.ID_CIUDAD and ciudad.ID_DEPTO = empresa.ID_DEPTO
  INNER JOIN departamentos on empresa.ID_DEPTO = departamentos.ID_DEPTO;`)

  // Datos Resolucion
  const resolucion = await myConn.query("SELECT * FROM resoluciones")

  // Format de Fecha
  var now = new Date(facturaGeneral[0].FECHA);
  var day = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear();
  var time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  var fecha = day + "/" + month + "/" + year + " " + time;

  // Format de Fecha Emision
  var limiteEmision = new Date(resolucion[0].FECHA_LIMITE);
  var dayEmision = limiteEmision.getDate();
  var monthEmision = limiteEmision.getMonth() + 1;
  var yearEmision = limiteEmision.getFullYear();

  var fechaEmision = dayEmision + "/" + monthEmision + "/" + yearEmision;

  // Generacion PDF
  const doc = new PDF({ bufferPages: true });

  const filename = `Factura-Documento-#${numDocumento}.pdf`;

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-disposition": `attachment;filename=${filename}`,
  });

  doc.on("data", (data) => {
    stream.write(data);
  });
  doc.on("data", () => {
    stream.end();
  });

  // Header
  doc.setDocumentHeader(
    {
      height: "35",
    },
    () => {
      doc
        .fontSize(9)
        .text(`${empresa[0].RAZON_SOCIAL}`, {
          align: "center"
        });

      doc
        .fontSize(9)
        .text(`${empresa[0].DIRECCION_EMPRESA}`, {
          align: "center"
        });
        
      doc
        .fontSize(9)
        .text(`R.T.N.: ${empresa[0].RTN_EMPRESA}`, {
          align: "center"
        });

      doc
        .fontSize(9)
        .text(`Propietario: ${empresa[0].REP_LEGAL}`, {
          align: "center"
        });
      
      doc
      .fontSize(9)
      .text(`${empresa[0].EMAIL}`, {
        align: "center"
      });

      doc
      .fontSize(9)
      .text(`TEL.: ${empresa[0].CELULAR}`, {
        align: "center",
        lineGap: 4,
      });

      doc.fontSize(9);

      doc.text(`CAI: ${resolucion[0].CAI}`, { align: "left" });

      doc.text(`Fecha Limite de Emisión: ${fechaEmision}`, { align: "left" });

      doc.text(`Rango autorizado del ${resolucion[0].SERIE}-${resolucion[0].NUM_INICIAL} al ${resolucion[0].SERIE}-${resolucion[0].NUM_FINAL}`, { align: "left" });

      doc.text(`Factura N°: ${numDocumento}`, { align: "left" });

      doc.text(`Fecha: ${fecha}`, { align: "left" });

      doc.text(` `, { align: "left" });

      doc.text(`Cliente: ${facturaGeneral[0].Cliente}`, { align: "left" });

      doc.text(`R.T.N.: ${facturaGeneral[0].ID_PERSONA}`, { align: "left" });

      doc.text(`Atendió: ${facturaGeneral[0].Empleado}`, { align: "left" });

      doc.text(`Pagó con: ${facturaGeneral[0].DESC_MODOPAGO}`, {
        align: "left",
      });
    }
  );

  const invoice = facturaDetails.map((fact) => {
    const item = {
      description: fact.DESCRIPCION,
      amount: fact.CANTIDAD,
      unit_price: fact.PRECIO_UNIT,
      subtotal: fact.SUBTOTAL,
    };

    return item;
  });

  doc.addTable(
    [
      { key: "description", label: "Descripcion", align: "center" },
      { key: "amount", label: "Cantidad", align: "center" },
      { key: "unit_price", label: "Precio Unit", align: "center" },
      { key: "subtotal", label: "Subtotal", align: "center" },
    ],
    invoice,
    {
      border: null,
      align: "center",
      width: "fill_body",
      striped: true,
      headBackground: "#23282A",
      headColor: "#FFFFFF",
      headFont: "Helvetica-Bold",
      headFontSize: 9,
      cellsFont: "Helvetica",
      cellsFontSize: 9,
      headAlign: "center",
    }
  );

  // Footer
  doc.setDocumentFooter(
    {
      height: "40",
    },
    () => {
      doc.fontSize(9);
      doc.text(
        `Subtotal:            L. ${(facturaTotal[0].Total).toFixed(2)}`,
        { align: "right" },
        doc.footer.y + 10
      );
      doc.text(` `, { align: "right" });
      doc.text(
        `I.S.V. al 15%:       L. ${(facturaTotal[0].Total * 0.15).toFixed(2)}`,
        { align: "right" },
        doc.footer.y + 25
      );
      doc.text(` `, { align: "right" });
      doc.text(
        `Total a pagar:       L. ${(facturaTotal[0].Total + (facturaTotal[0].Total * 0.15)).toFixed(2)}`,
        { align: "right" },
        doc.footer.y + 40
      );
      doc.text(` `, { align: "right" });
      doc.text(
        `Efectivo Recibido:   L. ${factEfectivo.toFixed(2)}`,
        { align: "right" },
        doc.footer.y + 60
      );

      

      if (factEfectivo === 0) {
        var totalCambio = '0.00'
      }
      else {
        var totalCambio = ((factEfectivo) - (facturaTotal[0].Total + (facturaTotal[0].Total * 0.15)).toFixed(2)).toFixed(2)
      }
      
      doc.text(` `, { align: "right" });
      doc.text(
        `Cambio entregado:    L. ${totalCambio}`,
        { align: "right" },
        doc.footer.y + 75
      );

      doc.text(
        `¡LA FACTURA ES BENEFICIO DE TODOS, EXIGALA!`,
        { align: "center" },
        doc.footer.y + 120
      );

      doc.text(
        `Que Dios Bendiga su dia.`,
        { align: "center" },
        doc.footer.y + 150
      );
      
    }
  );

  // render tables
  doc.render();
  doc.end();

  //req.flash("success", "Venta registrada satisfactoriamente");
  //res.redirect("/transacciones/facturas/new");
};

// Facturar un producto
transaccionController.newFactura = async (req, res) => {
  const metodopago = await myConn.query("SELECT * FROM modo_pago");
  const departamentos = await myConn.query("SELECT * FROM departamentos");
  res.render("transacciones/facturar", { metodopago, departamentos });
};

module.exports = transaccionController;

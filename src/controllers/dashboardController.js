const myConn = require('../db')
const dashboardController = {}


dashboardController.dashboardData = async (req, res) => {

  const ventasAlDia = await myConn.query(`
    SELECT date_format(factura.FECHA, '%Y-%m-%d') as Fecha, 
    FORMAT(sum(CANTIDAD * PRECIO_UNIT) + (sum(CANTIDAD * PRECIO_UNIT) * 0.15), 2) as Total
    FROM factura_detalle
    INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
    WHERE date_format(factura.FECHA, '%Y-%m-%d') = (SELECT CURDATE())
    group by day(factura.FECHA);
  `)

  const ventasAlMes = await myConn.query(`
    SELECT date_format(factura.FECHA, '%Y-%m-%d') as Fecha, 
    FORMAT(sum(CANTIDAD * PRECIO_UNIT) + (sum(CANTIDAD * PRECIO_UNIT) * 0.15), 2) as Total
    FROM factura_detalle
    INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
    WHERE MONTH(factura.FECHA) = MONTH(CURRENT_DATE())
    group by month(factura.FECHA);
  `)

  const compraAlDia = await myConn.query(`
    SELECT compra_articulo.FECHA, 
    FORMAT(round((sum(CANTIDAD * PRECIO_COMPRA) + (sum(CANTIDAD * PRECIO_COMPRA) * 0.15)), 2), 2) as    Total
    FROM compra_articulo_detalle
    INNER JOIN compra_articulo ON compra_articulo.ID_COMPRA = compra_articulo_detalle.ID_COMPRA
    WHERE date_format(compra_articulo.FECHA, '%Y-%m-%d') = (SELECT CURDATE())
    group by day(compra_articulo.FECHA)
  `)

  const totalClientes = await myConn.query(`
    SELECT count(*) as TotalClientes
    FROM persona
    left join empleado on persona.ID_PERSONA = empleado.ID_PERSONA 
    WHERE (persona.ID_PERSONA NOT IN (SELECT empleado.ID_PERSONA FROM empleado))
  `)

  res.render('home/dashboard', 
  { ventasAlDia: ventasAlDia[0],
    ventasAlMes: ventasAlMes[0],
    compraAlDia: compraAlDia[0],
    totalClientes: totalClientes[0]
  })
}

// Ventas de los ultimos 5 dias
dashboardController.ventasDiarias = async (req, res) => {
  const queryNivel = `
  SELECT factura.FECHA, (sum(CANTIDAD * PRECIO_UNIT) + (sum(CANTIDAD * PRECIO_UNIT) * 0.15)) as Total
  FROM factura_detalle
  INNER JOIN factura ON factura.ID_FACTURA = factura_detalle.ID_FACTURA
  group by factura.FECHA
  order by factura.FECHA DESC
  LIMIT 5;`;

  const queryVentasNivel = await myConn.query(queryNivel);
  res.json(queryVentasNivel)
}

// Cantidad de productos en Stock
dashboardController.totalStock = async (req, res) => {
  const queryStock = await myConn.query(`
    SELECT DESCRIPCION, STOCK
    FROM articulos
    GROUP BY ID_ARTICULO
    ORDER BY STOCK ASC
    LIMIT 10;
  `)

  res.json(queryStock)
}

module.exports = dashboardController
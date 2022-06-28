const myConn = require('../db')
const sysController = {}

sysController.general = async(req, res) => {
  const queryEmpresa = `
  SELECT empresa.*, upper(ciudad.NOMBRE_CIUDAD) as CIUDAD, departamentos.NOMBRE_DEPTO
  FROM empresa
  INNER JOIN ciudad on empresa.ID_CIUDAD = ciudad.ID_CIUDAD and ciudad.ID_DEPTO = empresa.ID_DEPTO
  INNER JOIN departamentos on empresa.ID_DEPTO = departamentos.ID_DEPTO
  `
  const empresa = await myConn.query(queryEmpresa)

  res.json(empresa)
}


sysController.editInfoEmpresa = async (req, res) => {
  const { id }  = req.params

  const {
    rtn_empresa,
    razon_social,
    rep_legal,
    rtn_rep_legal,
    email,
    celular,
    id_ciudad,
    id_depto,
    direccion_empresa,
    inicio_periodo,
    fin_periodo
  } = req.body

  const newEmpresa = {
    rtn_empresa,
    razon_social,
    rep_legal,
    rtn_rep_legal,
    email,
    celular,
    id_ciudad,
    id_depto,
    direccion_empresa,
    inicio_periodo,
    fin_periodo
  }

  await myConn.query("UPDATE empresa SET ? WHERE id_empresa = ?", [newEmpresa, id])

  req.flash("success", "Datos Actualizados Correctamente")

  res.redirect("/sys/general")
}

sysController.detalleResolucion = async (req, res) => {
  const resolucion = await myConn.query("SELECT * FROM resoluciones")
  res.json(resolucion)
}

sysController.editInfoResolucion = async (req, res) => {
  const { id }  = req.params

  const {
    cai,
    serie,
    num_inicial,
    num_final,
    fecha_limite,
    notificar
  } = req.body

  const newResolucion = {
    cai,
    serie,
    num_inicial,
    num_final,
    fecha_limite,
    notificar
  }

  await myConn.query("UPDATE resoluciones SET ? WHERE id_resolucion = ?", [newResolucion, id])

  const numRes = await myConn.query("SELECT NUM_INICIAL FROM resoluciones WHERE id_resolucion = ?;", [id])

  var numInicial = parseInt(numRes[0].NUM_INICIAL)

  console.log(numInicial)

  await myConn.query("ALTER TABLE factura AUTO_INCREMENT = ?", [ numInicial ])

  req.flash("success", "Resolucion Actualizada Correctamente")

  res.redirect("/sys/resoluciones")
}


module.exports = sysController
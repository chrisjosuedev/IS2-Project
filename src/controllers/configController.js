const myConn = require("../db");
const helpers = require("../lib/helpers");
const confController = {};

// ---------------- USUARIOS

confController.listUsuarios = async (req, res) => {
  const userQuery = `SELECT usuario.USERNAME, rol_users.DESC_ROL, 
                        concat_ws(' ', persona.    NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as NOMBRE_EMPLEADO
                        FROM usuario 
                        INNER JOIN rol_users ON rol_users.ID_ROL = usuario.ID_ROL
                        INNER JOIN empleado ON usuario.ID_EMPLEADO = empleado.ID_EMPLEADO
                        INNER JOIN persona ON persona.ID_PERSONA = empleado.ID_PERSONA`;

  const usuario = await myConn.query(userQuery);

  const roles = await myConn.query("SELECT * FROM rol_users");

  res.render("config/usuario", { usuario, roles });
};

/** POST NUEVO USUARIO **/
confController.newUsuario = async (req, res) => {
  const { id_empleado, username, password, id_rol } = req.body;
  const newUser = {
    id_empleado,
    username,
    password,
    id_rol,
  };

  // Cifrar Contraseña
  newUser.password = await helpers.encryptPassword(password);

  await myConn.query("INSERT INTO usuario set ?", [newUser]);
  req.flash("success", "Usuario Guardado Correctamente");
  res.redirect("/config/usuarios");
};

confController.getEmpleadoByUser = async (req, res) => {
  const { username } = req.params;
  const users = await myConn.query("SELECT * FROM usuario WHERE username = ?", [
    username,
  ]);

  res.json(users);
};

confController.editUser = async (req, res) => {
  const { username } = req.params;
  const { password, id_rol } = req.body;

  var newUser = {};

  if (password === "") {
    newUser = { id_rol };
  } else {
    newUser = { id_rol, password };
    newUser.password = await helpers.encryptPassword(password);
  }

  await myConn.query("UPDATE usuario set ? WHERE username = ?", [
    newUser,
    username,
  ]);

  req.flash("success", "Usuario Actualizado Correctamente");
  res.redirect("/config/usuarios");
};

confController.getUserByIdEmpleado = async (req, res) => {
  const { id } = req.params;

  const users = await myConn.query(
    "SELECT * FROM usuario WHERE id_empleado = ?",
    [id]
  );

  res.json(users);
};

//  -------- Eliminar Usuario
confController.deleteUsuario = async (req, res) => {
  const { username } = req.params;
  await myConn.query("DELETE FROM usuario WHERE username = ?", [username]);
  req.flash("success", "Usuario Eliminado Correctamente");
  res.redirect("/config/usuarios");
};

// -------- Mi Perfil
confController.verMiPerfil = async (req, res) => {
  const { id } = req.params;

  const serQuery = `
  SELECT persona.NOMBRE_PERSONA as NOMBRE, persona.APELLIDO_PERSONA as APELLIDO, 
  persona.SEXO, usuario.*, rol_users.DESC_ROL as ROL,
  categoria_laboral.DESCRIPCION_CATEGORIA, empleado.FECHA_CONTRATACION
  FROM persona
  left join empleado on persona.ID_PERSONA = empleado.ID_PERSONA
  inner join usuario on usuario.ID_EMPLEADO = empleado.ID_EMPLEADO
  inner join categoria_laboral on empleado.ID_CATEGORIA = categoria_laboral.ID_CATEGORIA
  inner join rol_users on usuario.ID_ROL = rol_users.ID_ROL
  WHERE (persona.ID_PERSONA IN (SELECT empleado.ID_PERSONA FROM empleado)) AND usuario.ID_EMPLEADO = ?
  `
  const user = await myConn.query(serQuery, [id]);

  res.render("auth/mi-perfil", { 
    user: user[0] 
  });
};

// ----- Cambiar Contraseña
confController.getEditPerfil = async (req, res) => {
  const { username } = req.body;
  const users = await myConn.query("SELECT * FROM usuario WHERE username = ?", [
    username,
  ]); 
  res.render("config/password-edit", {
    users: users[0],
  });
};

confController.EditPerfil = async (req, res) => {
  const { username } = req.params;
  const { password_old, password } = req.body;

  const rows = await myConn.query("SELECT * FROM usuario WHERE username = ?;", [
    username
  ]);
  const user = rows[0];

  const validPassword = await helpers.matchPassword(
    password_old,
    user.PASSWORD
  );

  if (validPassword) {
    const newUser = {
      password,
    };

    newUser.password = await helpers.encryptPassword(password);

    await myConn.query("UPDATE usuario set ? WHERE username = ?", [
      newUser,
      username,
    ]);

    req.flash("success", "Contraseña Actualizada Correctamente");
    res.redirect("/config/mi-perfil");
  } else {
    req.flash("error", "Contraseña anterior incorrecta");
    res.redirect(req.originalUrl);
  }
};

module.exports = confController;

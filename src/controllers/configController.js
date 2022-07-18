require('dotenv').config()
const myConn = require("../db");
const helpers = require("../lib/helpers");
const nodemailer = require('nodemailer')
const generatePassword = require('generate-password')
const confController = {};

// ---------------- USUARIOS

confController.listUsuarios = async (req, res) => {
  const userQuery = `SELECT usuario.*, rol_users.DESC_ROL, 
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
  const { username, id_empleado, email_user, id_rol } = req.body;

  console.log(username)

  const password = generatePassword.generate({
    length: 8,
    strict: true
  })

  // Contenido a Enviar por Email
  contentHTML = `
  <h1> ¡Bienvenido al Equipo! </h1>
  <p> Las credenciales de acceso al sistema son: </p> 
  <ul> 
    <li> Username: ${username} </li>
    <li> Password: ${password} </li>
  </ul>
  <p> Recuerde cambiar su contraseña en el siguiente inicio de sesión. </p>
  `

  const newUser = {
    username,
    id_empleado,
    email_user,
    password,
    id_rol
  };

  // Cifrar Contraseña
  newUser.password = await helpers.encryptPassword(password);

  await myConn.query("INSERT INTO usuario set ?", [newUser]);

  const expPass = {
    username,
    updated: false
  }

  await myConn.query("INSERT INTO expiracion_password set ?", [expPass])


  // Envio de Credenciales
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  })

  const info = await transporter.sendMail({
    from: `'IS2 Solutions' <${process.env.EMAIL}>`,
    to: email_user,
    subject: 'Credenciales de Usuario',
    html: contentHTML
  })

  req.flash("success", "Usuario e Informacion Enviada Correctamente");
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

confController.verPerfil = async (req, res) => {
  res.render('auth/mi-perfil')
}

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
      password
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

confController.recoveryPassword = async (req, res) => {
  const { username } = req.params;
  const { password_old, password } = req.body;

  console.log(username, password_old, password)

  const rows = await myConn.query("SELECT * FROM usuario WHERE username = ?;", [
    username
  ]);
  const user = rows[0];

  const validPassword = await helpers.matchPassword(
    password_old,
    user.PASSWORD
  )

  if (validPassword) {
    const newUser = {
      password
    };

    newUser.password = await helpers.encryptPassword(password);

    await myConn.query("UPDATE usuario set ? WHERE username = ?", [
      newUser,
      username
    ]);

    const newExpiracion = {
      updated: true
    }

    await myConn.query("UPDATE expiracion_password set ? WHERE username = ?" , [
      newExpiracion,
      username
    ])

    req.flash('success', 'Bienvenid@ ' + user.USERNAME);
    res.redirect("/dashboard");
  } else {
    req.flash("error", "Contraseña anterior incorrecta");
    res.redirect('/recovery-password');
  }
};

module.exports = confController;

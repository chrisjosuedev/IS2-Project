const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const myConn = require('../db')
const helpers = require('../lib/helpers')

// Inicio de Sesion
passport.use('local.signin', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const queryUser = `
  select * from usuario where USERNAME = ?;
  `
  const rows = await myConn.query(queryUser, [username]);
  
  // Validacion de Contraseña
  if (rows.length > 0) {
      const user = rows[0];
      console.log(user)
      const validPassword = await helpers.matchPassword(password, user.PASSWORD);
      if (validPassword) {
          done(null, user, req.flash('success', 'Bienvenid@ ' + user.USERNAME));
      }
      else {
          done(null, false, req.flash('error', 'Contraseña Incorrecta'));
      }
  }
  else {
      return done(null, false, req.flash('error', 'Usuario no existe'));
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.ID_EMPLEADO);
});

passport.deserializeUser(async (id, done) => {
  const serQuery = `
  SELECT persona.NOMBRE_PERSONA as NOMBRE, persona.APELLIDO_PERSONA as APELLIDO, 
  usuario.*
  FROM persona
  left join empleado on persona.ID_PERSONA = empleado.ID_PERSONA
  inner join usuario on usuario.ID_EMPLEADO = empleado.ID_EMPLEADO
  WHERE (persona.ID_PERSONA IN (SELECT empleado.ID_PERSONA FROM empleado)) AND 
  usuario.ID_EMPLEADO = ?
  `
  const rows = await myConn.query(serQuery, [id]);
  done(null, rows[0]);
});

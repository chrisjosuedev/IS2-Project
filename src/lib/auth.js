module.exports = {

  isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      else {
          return res.redirect('/')
      }
  },

  // Si ya está logeado, no acceder a pantalla Login
  isLoggedInLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard')
    }
    else {
        return next()
    }
  }

}
require('dotenv').config()

module.exports = {
    database: {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: 'db_magistral'
    }
}

// Cambiar a base de datos --> db_is2_solutions


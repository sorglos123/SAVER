require('dotenv').config({ 
    path: __dirname + `/../../.env` 
});

module.exports = {
    port: process.env.BACKEND_PORT || 4001 ,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
    db: {
        database: process.env.DB ||'saver',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT,
            host: process.env.DB_HOST
        }
    }
}
require('dotenv').config({ 
    path: __dirname + `/../../.env` 
});

module.exports = {
    port: process.env.BACKEND_PORT,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
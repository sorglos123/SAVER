const StatusController = require('./controllers/StatusController');
const AuthenticationController = require('./controllers/AuthenticationController');
const LoginController = require('./controllers/LoginController');

module.exports = (app) => {
    /* Route 0: Status */
    app.get('/', StatusController.status);

    /* Route 1: Authentifizierung/Registrierung DB */
    app.post('/register', AuthenticationController.register);

    /* Route 2: Login */
    app.post('/login', LoginController.login);
}
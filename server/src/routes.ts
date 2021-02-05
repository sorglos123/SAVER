const StatusController = require('./controllers/StatusController');
const AuthenticationController = require('./controllers/AuthenticationController');

module.exports = (app) => {
    /* Route 0: Status */
    app.get('/', StatusController.status);

    /* Route 1: Registrierung */
    app.post('/register', AuthenticationController.register);

    /* Route 2: Login */
    app.post('/login', AuthenticationController.login);
}
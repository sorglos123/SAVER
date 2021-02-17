const StatusController = require('./controllers/StatusController');
const AuthenticationController = require('./controllers/AuthenticationController');
const UpdateController = require('./controllers/UpdateController');
const ReceiptController = require('./controllers/ReceiptController');

module.exports = (app) => {
    /* Route 0: Status */
    app.get('/', StatusController.status);

    /* Route 1: Registrierung */
    app.post('/register', AuthenticationController.register);

    /* Route 2: Login */
    app.post('/login', AuthenticationController.login);

    /* Route 3: Update user data */
    app.post('/updateUser', UpdateController.updateUser);

    /* Route 4: Get a receipt for a specific date */
    app.post('/calendar', ReceiptController.getReceipt);

}
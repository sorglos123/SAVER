const StatusController = require('./controllers/StatusController');
const AuthenticationController = require('./controllers/AuthenticationController');
const UpdateController = require('./controllers/UpdateController');
const ReceiptController = require('./controllers/ReceiptController');
import * as multer from 'multer';
const upload = multer({ dest: '../../images' });

module.exports = (app) => {
    /* Route 0: Status */
    app.get('/', StatusController.status);

    /* Route 1: Registrierung */
    app.post('/register', AuthenticationController.register);

    /* Route 2: Login */
    app.post('/login', AuthenticationController.login);

    /* Route 3: Update user data */
    app.post('/updateUser', UpdateController.updateUser);

    /* Route 4: Get all receipts for a specific user id*/
    app.post('/receipts', ReceiptController.getAllReceipts);

    /* Route 5: Get a receipt for a specific date */
    app.post('/calendar', ReceiptController.getReceipt);

    /* Route 6: Get a calendar dates for a specific date */
    app.post('/updatecalender', ReceiptController.getDates);

    /* Route 5: Get a calendar dates for a specific date */
    app.put('/uploadReceipt',upload.single('receipt'), ReceiptController.uploadReceipt);


}
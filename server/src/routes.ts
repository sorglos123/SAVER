import * as multer from 'multer';

const StatusController = require('./controllers/StatusController');
const AuthenticationController = require('./controllers/AuthenticationController');
const UpdateController = require('./controllers/UpdateController');
const ReceiptController = require('./controllers/ReceiptController');

const upload = multer({ dest: '../../images' });

module.exports = (app) => {
    
    /* Route 0: Status */
    app.get('/', StatusController.status);

    /* Route 1: Registrierung */
    app.post('/register', AuthenticationController.register);

    /* Route 2: Login */
    app.post('/login', AuthenticationController.login);

    /* Route 3: Update von Benutzerdaten */
    app.post('/updateUser', UpdateController.updateUser);

    /* Route 4: Abfrage aller Belege für eine BenutzerID*/
    app.post('/receipts', ReceiptController.getAllReceipts);

    /* Route 5: Abfrage aller Rezepte eines Benutzers für ein Datum */
    app.post('/calendar', ReceiptController.getReceipt);

    /* Route 6: Hochladen von Belegen inkl. Beleginformationen */
    app.put('/uploadReceipt',upload.single('receipt'), ReceiptController.uploadReceipt);

    /* Route 7: Abfrage aller Datumsangaben der Belege eines Benutzers (noch nicht implementiert) */
    app.post('/updatecalender', ReceiptController.getDates);
}
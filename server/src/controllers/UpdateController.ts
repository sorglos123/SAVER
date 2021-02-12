import * as EmailValidator from 'email-validator';
    
const config = require('../config/config');
    
module.exports = {
    updateUser(req, res) {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.username);
        console.log('E-Mail: ' + req.body.email);
        console.log('Altes Passwort: ' + req.body.oldpw);
        console.log('Neues Passwort: ' + req.body.newpw);
        console.log('Neuew Passwort bestätigen: ' + req.body.confirm);
    
        if ((req.body.username != '') && (req.body.email != '') && (req.body.oldpw != '') && (req.body.newpw != '') && (req.body.confirm != '')) {
            if(req.body.oldpw != req.body.newpw) {
                if (req.body.confirm == req.body.passwd) {
                    if (EmailValidator.validate(req.body.email)) {
    
                    } else {
                        return res.status(400).send({
                            error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                        });
                    }
                } else {
                    return res.status(400).send({
                        error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                    });
                }
            } else {
                return res.status(400).send({
                    error: 'Ihr neues Passwort darf nicht mit dem bisherigen Passwort übereinstimmen.'
                });
            }
        } else {
            return res.status(400).send({
                error: 'Bitte befüllen Sie alle Felder.'
            });
        }
    }
}
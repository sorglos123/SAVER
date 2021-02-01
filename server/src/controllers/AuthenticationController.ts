import * as EmailValidator from 'email-validator';

/* Route 1: 
    1) Server bekommt Login-Daten vom Frontend im Format { benutzername 'abc', passwort: 'xyz' }; 
    2) Danach schaut in der Datenbank, ob ein entsprechender Datensatz vorhanden ist.
    3) Nach der Datenbank-Kommunikation kann über den res-Parameter eine 
        Antwort ans Frontend geschickt werden. */

module.exports = {
    register (req, res) {    
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.lastname);
        console.log('Passwort: ' + req.body.firstname);
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        console.log('Passwort bestätigen: ' + req.body.confirm);
        
        /* Abfangen ... 
            ... ob Passwort == bestätigtes Passwort; wichtig, BEVOR es in die DB geht! Sowie 
            ... ob E-Mail-Adresse valide ist (externe Bibliothek) */
        if(req.body.confirm == req.body.passwd) {
            if(EmailValidator.validate(req.body.email)) {
                /* <- Hier kommt die Datenbank-Logik -> */
                res.send({
                    message: `Registration of ${req.body.email} was successful!`
                }); 
            } else {
                res.send({
                    message: 'Your E-Mail address is invalid!'
                });
            }
        } 
    }
}

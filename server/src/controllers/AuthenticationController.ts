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
            /* Benötigen wir auch eine Passwort-Schema-Validierung für unseren Prototypen? */
            if(EmailValidator.validate(req.body.email)) {
                
                /* <- Hier kommt die Datenbank-Logik 
                Bitte beim Beantworten der Anfragen auch den HTTP-Status
                (200/400) entsprechend setzen! -> */
                
                res.status(200).send({
                    message: `Willkommen ${req.body.email}! Ihre Registrierung war erfolgreich!`
                }); 
            } else {
                res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                });
            }
        } else {
            res.status(400).send({
                error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
            });
        }
    }
}

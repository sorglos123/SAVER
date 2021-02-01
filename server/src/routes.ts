module.exports = (app) => {
    /* Route 0: Hello World :-) */
    app.get('/', (req,res) => {
        res.send({
            message: 'Hello World!'
        });
    });

    /* Route 1: 
    1) Server bekommt Login-Daten vom Frontend im Format { benutzername 'abc', passwort: 'xyz' }; 
    2) Danach schaut in der Datenbank, ob ein entsprechender Datensatz vorhanden ist.
    3) Nach der Datenbank-Kommunikation kann über den res-Parameter eine 
        Antwort ans Frontend geschickt werden.  
    */
    app.post('/register', (req, res) => {    
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.lastname);
        console.log('Passwort: ' + req.body.firstname);
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        console.log('Passwort bestätigen: ' + req.body.confirm);
        
        /* Abfangen, ob Passwort == bestätigtes Passwort; wichtig, BEVOR es in die DB geht! */
        if(req.body.confirm == req.body.passwd) {
            /* <- Hier kommt die Datenbank-Logik -> */
            res.send({
            message: `Registration of ${req.body.email} was successful!`
            }) 
        } 
    });

    app.post('/login', (req,res) => {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        /* <- Hier kommt die Datenbank-Logik -> */
        res.send({
            message: `Welcome ${req.body.email}, your login was successful!`
        })
    })
}
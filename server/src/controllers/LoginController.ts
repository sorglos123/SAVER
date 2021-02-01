/* Route 2: Login = ähnlich wie Registrierung bzgl. DB-Logik */

module.exports = {
    login (req,res) {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        /* <- Hier kommt die Datenbank-Logik -> */
        res.send({
            message: `Welcome ${req.body.email}, your login was successful!`
        })
    }
}

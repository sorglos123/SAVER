/* Route 2: Login = ähnlich wie Registrierung bzgl. DB-Logik */

module.exports = {
    login (req,res) {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        /* <- Hier kommt die Datenbank-Logik -> */
        res.status(200).send({
            message: `Hallo ${req.body.email}, Ihr Login war erfolgreich!`
        })
    }
}

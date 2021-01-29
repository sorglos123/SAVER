import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

require('dotenv').config({ 
    path: __dirname + `/../.env` 
});

const app = express();
const port = process.env.BACKEND_PORT;

app.use(morgan('combine'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {  
    console.log('Listening on port ' + port);
});

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
    console.log('Benutzername: ' + req.body.email);
    console.log('Passwort: ' + req.body.passwd);
    /* <- Hier kommt die Datenbank-Logik -> */
    res.send({
        message: `Registration of ${req.body.email} was successful!`
    })  
});
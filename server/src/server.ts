import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('combine'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {  
    console.log('Listening on port ' + port);
});

/* Route 0: Hello World :-) */
app.get('/status', (req,res) => {
    res.send({
        message: 'Hello World!'
    });
});

/* Route 1: 
1) Server bekommt Login-Daten... 
    ... vom Frontend im Format { benutzername 'abc', passwort: 'xyz' }; 
2) Danach schaut in der Datenbank, ob ein entsprechender Datensatz vorhanden ist.  
*/
app.post('/register', (req, res) => {    
    console.log('Benutzername: ' + req.body.email);
    console.log('Passwort: ' + req.body.passwd);
    res.send({
        message: `Registration of ${req.body.email} was successful!`
    })  
});
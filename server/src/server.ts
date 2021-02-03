import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

const config = require('./config/config');

require('dotenv').config({ 
    path: __dirname + `/../.env` 
});

const app = express();

app.use(morgan('combine'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

const port = config.port;
app.listen(port, () => {  
    console.log('Listening on port ' + port);
});


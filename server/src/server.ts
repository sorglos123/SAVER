import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

const {Sequelize} = require('./models');
const config = require('./config/config');


const port = config.port;

require('dotenv').config({ 
    path: __dirname + `/../.env` 
});

const app = express();

app.use(morgan('combine'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

Sequelize
    .authenticate()
    .then(() =>{
        app.listen(port, () => {  
            console.log('Listening on port ' + port);
        })
    })

;


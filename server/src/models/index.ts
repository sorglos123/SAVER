import * as sequelize  from "sequelize";
import {Users} from "./Users";

const config = require('../config/config');

const db : any = {};

export const dbConfig = new sequelize.Sequelize (
    config.db.database,
    config.db.user,
    config.db.password,
    {
      host: config.db.options.host,
      dialect: config.db.options.dialect,
      pool: {
        min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
      }
    }
    
)


db.sequelize = sequelize
db.Sequelize = dbConfig

module.exports = db

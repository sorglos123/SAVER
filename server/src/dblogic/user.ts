import * as mariadb from 'mariadb';
import * as prmise from "bluebird";

const bcrypt = prmise.promisifyAll(require("bcrypt-nodejs"));

const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database: 'saver', connectionLimit: 5 });

class User {
    user_id: number;
    user_name: string;
    password: string;
    email: string;
    creation_date: Date;

    constructor(user_name: string, password: string, email: string) {
        this.user_name = user_name;
        this.password = password; 
        this.email = email;
    }

    greet() {
        return "Hello, " + this.user_name;
    }
    async getUserID(){
        var conn;
        console.log("trying to get userID");
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT user_id FROM users WHERE email = ?;", [this.email]);
            return console.log(res[0]['user_id']);
            
        } catch (error) {
            console.log(error);
            throw error; 
        }
        finally {
            console.log("trying to close");
            conn.end();
        }

    }

    async create() {

        await hashPW(this);
        var conn;
        try {
            conn = await pool.getConnection();
            
            const res = await conn.query("INSERT INTO users(user_name, password, email) VALUES (?, ?, ?);", [this.user_name, this.password, this.email]);
            console.log("awaiting response");
            console.log(res);
            const u_id = await conn.query("SELECT LAST_INSERT_ID()");
            this.user_id = u_id[0]['LAST_INSERT_ID()'];

        } catch (err) {
            if (err.errno == 1062) {
                console.log("User already exists");
            }
            console.log("Hier kommt nen Error");

            throw err;
        }
        finally {
            console.log("trying to close");
            conn.end();
        }

    }
    async login() {
        var conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT password, user_id FROM users WHERE email = ?;", [this.email]);
            if (res.length > 0) {
                
                console.log(this.password);
                if(await comparePW(this.password, res[0]['password']))
                {   
                    this.user_id = res[0]['user_id'];
                    console.log("welcome");
                }
                else{
                    console.log("incorrect");
                    throw new Error("Incorrect User/PW");
                }
               
            } else {
                console.log("incorrect");
                throw new Error("Incorrect User/PW");
            }

        }
        catch (err) {
            console.log("no");
            console.log(err)
            throw err;

        }
        finally {
            console.log("trying to close");
            conn.end();
        }
    }
    toJSON(){
        return {
            user_id : this.user_id,
            email : this.email,
            passwd: this.password

        }
    }
    hashPassword(password: string){
        const SALT_FACTOR = 8; 
        
         bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync(password, salt, null)).then(hash => this.password = hash);
         return this.password; 
         
    }

}
function hashPW(u: User){
    const SALT_FACTOR = 8; 
    bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync(u.password, salt, null)).then(hash => u.password = hash);
}

function comparePW(password: string, hash:string){
    return bcrypt.compareAsync(password, hash);
}

export { User }; 

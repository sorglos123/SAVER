import * as mariadb from 'mariadb';
import * as prmise from "bluebird";

const bcrypt = prmise.promisifyAll(require("bcrypt-nodejs"));

const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB, connectionLimit: 10 });

class User {
    user_id: number;
    user_name: string;
    password: string;
    email: string;
    creation_date: Date;

    constructor(user_name: string, password: string, email: string, uid?: number) {
        this.user_name = user_name;
        this.password = password;
        this.email = email;
        this.user_id = uid;
    }

    greet() {
        return "Hello, " + this.user_name;
    }
    async getUserID() {
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
                if (await comparePW(this.password, res[0]['password'])) {
                    this.user_id = res[0]['user_id'];
                    console.log("welcome");
                }
                else {
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
            if (conn != null){
                conn.end();
            }
        }
    }
    toJSON() {
        return {
            user_id: this.user_id,
            email: this.email,

        }
    }
    async updateUserPW(newPW: string) {
        await this.checkUserPW();
        this.password = newPW;
        await hashPW(this);
        var conn;
        try {
            
            conn = await pool.getConnection();
            const res = await conn.query("UPDATE users SET password = ? WHERE user_id = ?;", [this.password, this.user_id]);
        } catch (error) {
            console.log(error);
            console.log("error aus update user");
            throw error;
        }
        finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }
        }
    }

    async updateEmail() {
        var conn;
        try {
            await this.checkUserPW();
            conn = await pool.getConnection();
            const res = await conn.query("UPDATE users SET email = ? WHERE user_id = ?;", [this.email, this.user_id]);
        } catch (error) {
            console.log(error);
            console.log("error aus update Email");
            throw error;
        }
        finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }
        }

    }

    async updateUserName() {
        var conn;
        try {
            await this.checkUserPW();
            conn = await pool.getConnection();
            const res = await conn.query("UPDATE users SET user_name = ? WHERE user_id = ?;", [this.user_name, this.user_id]);
        } catch (error) {
            console.log(error);
            console.log("error aus update User Name");
            throw error;
        }
        finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }
        }

    }

    async checkUserPW() {
        var conn;
        console.log("trying to check user PW");
        console.log(this.user_id);
        console.log(this.password);
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT password FROM users WHERE user_id = ?;", [this.user_id]);
            console.log(res[0]['password']);
            if (res.length > 0) {

                console.log(this.password);
                if (await comparePW(this.password, res[0]['password'])) {
                    console.log("welcome");
                }
                else {
                    console.log("incorrect");
                    throw new Error("Incorrect User/PW");
                }

            }
        } catch (error) {
            console.log("Catching another error");
            console.log(error)
            throw error;
        }
        finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }
        }

    }

}
function hashPW(u: User) {
    const SALT_FACTOR = 8;
    bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync(u.password, salt, null)).then(hash => u.password = hash);
}

function comparePW(password: string, hash: string) {
    return bcrypt.compareAsync(password, hash);
}


export { User }; 

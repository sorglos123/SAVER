import * as mariadb from 'mariadb';
const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database:'saver', connectionLimit: 5});

class User {
    user_id: number;
    user_name: string;
    password: string;
    email:string;
    creation_date: Date;

    constructor(user_name: string, password: string, email: string) {
      this.user_name = user_name;
      this.password = password;
      this.email = email;
    }
  
    greet() {
      return "Hello, " + this.user_name;
    }

    async create()  {
        
        var conn;
        try{
            conn = await pool.getConnection();
            
            const res =  await conn.query("INSERT INTO users(user_name, password, email) VALUES (?, ?, ?);",[this.user_name, this.password, this.email]);
            console.log("awaiting response");
            console.log(res); 
            
            
        }  catch (err) {
            if(err.errno==1062){
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
    

}
  
export {User}; 

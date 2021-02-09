 /* Route 0: Hello World :-) 
 Der Server gibt nur eine Seite mit "Hello World" zurück, wenn er läuft. */

import * as mariadb from 'mariadb';

 mariadb.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database:'saver'})
 .then(conn => {
   conn.query("SELECT * FROM users")
     .then(rows => {
       console.log(rows); // [{ "1": 1 }]
       conn.end();
     })
     .catch(err => { 
      console.log("nonono");
     });
 })
 .catch(err => {
   //handle connection error
 });

module.exports = {
    status (req,res) {
        res.status(200).send({
            message: 'Hello World '

        });
    }
}

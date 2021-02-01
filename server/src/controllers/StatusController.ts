 /* Route 0: Hello World :-) 
 Der Server gibt nur eine Seite mit "Hello World" zurück, wenn er läuft. */

module.exports = {
    status (req,res) {
        res.send({
            message: 'Hello World!'
        });
    }
}
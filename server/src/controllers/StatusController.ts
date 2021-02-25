module.exports = {
    status (req,res) {
        res.status(200).send({
            message: 'Hello World '

        });
    }
}

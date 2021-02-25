const receipt = require("../dblogic/receipt"); 
import * as r from "../dblogic/receipt";

module.exports = {
    async getAllReceipts(req, res) {
        console.log("User ID: " + req.body.uid);
        try {
            const receiptList = await r.getUserReceipts(req.body.uid);
            
            return res.status(200).send({
                message: "Folgende Belege wurden gefunden",
                receipts: receiptList,
            })
        } catch (error) {
            console.log(error);
        }
    },
    async getDates(req, res){
        //load only dates for all available receipts in database
    },
    async getReceipt(req, res){
        //loading receipt for a specific date
        console.log("Datum: " + req.body.receiptDate);
        console.log("User ID: " + req.body.uid); 
        try {
            const receiptJson = await r.getReceipts(req.body.uid, req.body.receiptDate);
            const itemsJson = await r.getItems(receiptJson)
            
            return res.status(200).send({
                message: "Folgende Belege wurden gefunden",
                receipts: receiptJson,
                items: itemsJson
            })
        } catch (error) {
            console.log(error);
        }   
        //response: per Receipt: Receipt ID, Date & Time, Supermarket, Total Value, n-Items (name + volume + category + price)

        //indivudal response: overview Receipt + Individual Items
    },
    async uploadReceipt(req, res){
        try {
            console.log(req.file["path"]); 
            console.log(req.body.total);
            console.log(req.body.date);
            console.log(req.body.supermarket);
            await r.uploadReceipt(req.body.uid, req.file["path"], req.body.supermarket, req.body.date, req.body.total); 
           
            return res.status(200).send({
                message: "Der Beleg wurde erfolgreich hochgeladen"
            })
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                error: "irgendwas ist schief gegangen"
            })
        }
        
        //  files in req.files ; body in req.body
    }
}
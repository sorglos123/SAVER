const receipt = require("../dblogic/receipt"); 
import * as r from "../dblogic/receipt";

module.exports = {
    async getAllReceipts(req, res) {
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
        /* Abfrage aller Datumsangaben der Belege eines Benutzers (noch nicht implementiert) */ 
    },
    async getReceipt(req, res){
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
            await r.uploadReceipt(req.body.uid, req.file["path"], req.body.supermarket, req.body.date, req.body.total); 
            return res.status(200).send({
                message: "Der Beleg wurde erfolgreich hochgeladen"
            })
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                error: "Ihr Beleg konnte leider nicht hochgeladen werden. ist schief gegangen"
            })
        }
        //  files in req.files ; body in req.body
    },
}
import * as express from "express";
import * as body_parser from "body-parser";

const server = express();
const port = 4000;

console.log('Node.js server running...');

// Spezifiziere den Port, auf dem der Server lauscht
server.listen(port, () => {
    console.log('Server listening at port ' + port);
});

// Jede Funtion server.<methode> ist ein sog. route handler!
/**
 * Ein GET-Request an den Server unter "/" liefert index.html zurück.
 */
server.get("/", (req, res) => {
    /* Stelle eine HTML-Seite bereit, bspw. res.sendFile(lokale Pfadangabe); */
});

/**
 * Per GET-Request an den Server unter "/:id", wobei :id ein URL-Parameter ist, 
 * kann die ID ausgelesen werden & entsprechend darauf reagiert werden.
 */
server.get("/:id", (req, res) => {
    const itemID : number = parseInt(req.params.id);
    
    if (itemID == 0) {
        /* Mach irgendetwas */
    } else {
        /* Mach irgendetwas anderes */
    }
});

/**
 * Ein GET-Request an den Server unter "/json" liefert eine JSON-Datei mit der Nachricht 
 * "Hello World" zurück.
 */
server.get("/json", (req, res) => {
    res.json({ message: "Hello world!"});
});

/**
 * Benutze body_parser als Middleware zum Parsen von JSON-Request-Bodys.
 */
server.use(body_parser.json());

/**
 * Ein POST-Request an den Server unter "/items" fügt dem Array ein im Request-Body spezifiziertes
 * Element zur weiteren Verarbeitung hinzu.
 */
server.post("/items", (req, res) => {
    
})

/**
 * Durch einen PUT-Request kann eine Ressource mit der angegebenen ID 
 * auf dem Server geupdatet werden.
 */
server.put("/items/:id", (req, res) => {

});

/**
 * Durch einen DELETE-Request kann eine Ressource mit der angegebenen ID 
 * auf dem Server gelöscht werden.
 */
server.delete("/items/:id", (req, res) => {

})
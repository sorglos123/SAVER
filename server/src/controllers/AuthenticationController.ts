/* Achtung: Bitte darauf achten, dass wir Typescript verwenden. Du musst also bei allen Konstanten, Variablen, 
    usw. angeben, welchem Typ dieses Objekt angehört!
    Bsp.:
    Nicht erlaubt: const tmp = 1;
    Erlaubt: const tmp : number = 1; */

/* Bitte das Passwort-Hashing im Rahmen der DB-Logik mit implementieren. 
    Bspw. könnte das mit bcrypt-nodejs (bereits installiert) passieren:
    https://www.youtube.com/watch?v=H6hM_5ilhqw&t=1323s&ab_channel=freeCodeCamp.org (siehe Teil 2 und 3 der Reihe)

    In diesem Tutorial wird das so gemacht, dass das Passwort-Hashing im DB-Modell des Users stattfindet. 
    So wird in der DB nur ein Passwort-Hash gespeichert! */ 

import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';

import {Users} from "../models/Users";

const config = require('../config/config');


/* Helper function: gibt einen sehr langen String-Token zurück, welcher bspw. 
    in Zeile 64 oder 83 vom Backend ans Frontend übergeben werden kann. */
function jwtLogin(user: any) {
    const oneWeek: number = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: oneWeek
    });
}

/* Route 1: /register
    1) Server bekommt Login-Daten vom Frontend im Format { benutzername 'abc', passwort: 'xyz' }; 
    2) Danach schaut in der Datenbank, ob ein entsprechender Datensatz vorhanden ist.
    3) Nach der Datenbank-Kommunikation kann über den res-Parameter eine 
        Antwort ans Frontend geschickt werden. */

/* Route 2: /login = ähnlich wie Registrierung bzgl. DB-Logik */

module.exports = {
    async register(req, res) {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.user_name);
        console.log('Email: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);
        console.log('Passwort bestätigen: ' + req.body.confirm);

        /* Abfangen ... 
            ... ob ein vollständiger Datensatz vom Benutzer angegeben wurde und ...
            ... ob Passwort == bestätigtes Passwort; wichtig, BEVOR es in die DB geht! Sowie ...
            ... ob E-Mail-Adresse valide ist (externe Bibliothek) */
        if (( req.body.user_name != '') && (req.body.email != '') && (req.body.passwd != '') && (req.body.confirm != '')) {
            if (req.body.confirm == req.body.passwd) {
                if (EmailValidator.validate(req.body.email)) {
                    /* Benötigen wir auch eine Passwort-Schema-Validierung für unseren Prototypen? */

                    
                    try{
                        const newUser = await Users.create({
                            user_name : req.body.user_name,
                            password : req.body.passwd,
                            email : req.body.email
                        });
                        newUser.save();

                    } catch (err){
                        console.log(req.body.user_name)
                        console.log(err)
                        res.status(400).send({
                            error: "Something went wrong"
                        })
                       
                    }
                    /* <- Hier kommt die Datenbank-Logik 
                    Bitte beim Beantworten der Anfragen auch den HTTP-Status
                    (200/400/403/...) entsprechend setzen! -> */

                    ;
                } else {
                    return res.status(400).send({
                        error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                    });
                }
            } else {
                return res.status(400).send({
                    error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                });
            }
        } else {
            return res.status(400).send({
                error: 'Bitte befüllen Sie alle Felder.'
            });
        }
    },
    login(req, res) {
        /* Konsolen-Ausgaben nur für Testzwecke */
        console.log('Benutzername: ' + req.body.email);
        console.log('Passwort: ' + req.body.passwd);

        if ((req.body.email != '') && (req.body.passwd != '')) {
            if (EmailValidator.validate(req.body.email)) {

                const {
                    email,
                    passwd
                } = req.body;
                /* <- Hier kommt die Datenbank-Logik 
                    Bitte beim Beantworten der Anfragen auch den HTTP-Status
                    (200/400) entsprechend setzen! -> */

                return res.status(200).send({
                    message: `Hallo ${req.body.email}, Ihr Login war erfolgreich!`,
                    /* Helper function hier verwenden: token: jwtLogin(datenbankuser) */
                });
            } else {
                return res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
                });
            }
        } else {
            return res.status(400).send({
                error: 'Bitte befüllen Sie alle Felder.'
            });
        }
    }
}
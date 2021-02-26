import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';
import { User } from "../dblogic/user";

const config = require('../config/config');

function jwtLogin(user: any) {
    const oneWeek: number = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: oneWeek
    });
}

module.exports = {
    async register(req, res) {
        if ((req.body.user_name != '') && (req.body.email != '') && (req.body.passwd != '') && (req.body.confirm != '')) {
            if (req.body.confirm == req.body.passwd) {
                if (EmailValidator.validate(req.body.email)) {
                    try {
                        const c = new User(req.body.user_name, req.body.passwd, req.body.email);
                        await c.create();
                        const userJson = c.toJSON();
                        return res.status(200).send({
                            message: `Hallo ${req.body.email}, Ihre Registrierung war erfolgreich!`, 
                            user: userJson,
                            token: jwtLogin(userJson)
                        })
                    } catch (error) {
                        console.log(error);
                        if (error.errno == 1062) {
                            return res.status(400).send({
                                error: 'Die E-Mail Adresse oder Benutzername existiert bereits'
                            })
                        }
                        else {
                            return res.status(400).send({
                                error: 'Irgendwas ist schief gegangen ¯\_(ツ)_/¯'
                            })
                        }
                    }
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
    async login(req, res) {
        if ((req.body.email != '') && (req.body.passwd != '')) {
            if (EmailValidator.validate(req.body.email)) {
                try {
                    const c = new User("NA", req.body.passwd, req.body.email);
                    console.log(c.password);
                    await c.login();
                    const userJson = c.toJSON();
                    return res.status(200).send({
                        message: `Hallo ${req.body.email}, Willkommen zurück!`,
                        user: userJson,
                        token: jwtLogin(userJson)
                    })
                } catch (error) {
                    return res.status(403).send({
                        error: 'Falscher Login und/oder Passwort'
                    })
                }
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
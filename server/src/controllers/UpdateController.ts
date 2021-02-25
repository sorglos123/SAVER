import * as EmailValidator from 'email-validator';
import { User } from "../dblogic/user";

const config = require('../config/config');

module.exports = {
    async updateUser(req, res) {
        //mögliche Fälle: Ändern Benutzername; erforderliche Eingabe: Benutzername + altes Passwort

        //ändern PW: altes PW + neues PW
        if ((req.body.uid != '') && (req.body.username == '') && (req.body.email == '') && (req.body.oldpw != '') && (req.body.newpw != '') && (req.body.confirm != '')) {
            console.log("PW wird aktualisiert");
            if (req.body.newpw == req.body.oldpw) {
                return res.status(400).send({
                    error: 'Ihr neues Passwort darf nicht mit dem bisherigen Passwort übereinstimmen.'
                });
            }
            else if (req.body.newpw != req.body.confirm) {
                return res.status(400).send({
                    error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                });
            }
            else {
                try {
                    const c = new User("NA", req.body.oldpw, req.body.email, req.body.uid);
                    //altes pw braucht man eigl nicht übergeben, man kann über den angelegten user gehen
                    await c.updateUserPW(req.body.newpw);
                    return res.status(200).send({
                        message: "Das Passwort wurde aktualisiert"
                    })
                } catch (error) {
                    console.log(error.message);
                    if (error.message == "Incorrect User/PW") {
                        return res.status(400).send({
                            error: "Das eingegebene Passwort ist nicht korrekt"
                        })
                    }
                    else {
                        return res.status(400).send({
                            error: "Passwort konnte nicht aktualsiert werden"
                        })
                    }
                }
            }
        }
        //ändern EMail: email + altes PW
        else if ((req.body.uid != '') && (req.body.username == '') && (req.body.email != '') && (req.body.oldpw != '') && (req.body.newpw == '') && (req.body.confirm == '')) {
            console.log("Email wird aktualisiert");
            if (EmailValidator.validate(req.body.email)) {
                try {
                    const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                    await c.updateEmail();
                    return res.status(200).send({
                        message: "Die E-Mail Adresse wurde erfolgreich aktualisiert"
                    })
                } catch (error) {
                    console.log(error);
                    if (error.message == "Incorrect User/PW") {
                        return res.status(400).send({
                            error: "Das eingegebene Passwort ist nicht korrekt"
                        })
                    }
                    else if (error.errno == 1062) {
                        return res.status(400).send({
                            error: 'Die E-Mail Adresse existiert bereits'
                        })
                    }
                    else {
                        return res.status(400).send({
                            error: "Etwas ist schief gegangen."
                        })
                    }
                }
            } else {
                return res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                });
            }
        }
        //ändern Username: username + altes PW
        else if ((req.body.uid != '') && (req.body.username != '') && (req.body.email == '') && (req.body.oldpw != '') && (req.body.newpw == '') && (req.body.confirm == '')) {
            console.log("Benutzername wir aktualisiert");
            try {
                const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                await c.updateUserName();
                return res.status(200).send({
                    message: "Der Benutzername wurde erfolgreich aktualisiert"
                })
            } catch (error) {
                console.log(error);
                if (error.message == "Incorrect User/PW") {
                    return res.status(400).send({
                        error: "Das eingegebene Passwort ist nicht korrekt"
                    })
                }
                else if (error.errno == 1062) {
                    return res.status(400).send({
                        error: 'Der Benutzername existiert bereits'
                    })
                }
                else {
                    return res.status(400).send({
                        error: "Etwas ist schief gegangen."
                    })
                }
            }
        }

        //ändern E-Mail und pw: email + altes pw + neues pw
        else if ((req.body.uid != '') && (req.body.username == '') && (req.body.email != '') && (req.body.oldpw != '') && (req.body.newpw != '') && (req.body.confirm != '')) {
            console.log("Ändere Email und Passwort");
            if (req.body.newpw == req.body.oldpw) {
                return res.status(400).send({
                    error: 'Ihr neues Passwort darf nicht mit dem bisherigen Passwort übereinstimmen.'
                });
            }
            else if (req.body.newpw != req.body.confirm) {
                return res.status(400).send({
                    error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                });
            }
            else if (EmailValidator.validate(req.body.email)) {
                try {
                    const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                    await c.updateEmail();
                    await c.updateUserPW(req.body.newpw);
                    return res.status(200).send({
                        message: "Die E-Mail Adresse und das Passwort wurden erfolgreich aktualisiert"
                    })
                } catch (error) {
                    if (error.message == "Incorrect User/PW") {
                        return res.status(400).send({
                            error: "Das eingegebene Passwort ist nicht korrekt"
                        })
                    }
                    else if (error.errno == 1062) {
                        return res.status(400).send({
                            error: 'Die E-Mail Adresse existiert bereits'
                        })
                    }
                }
            }
            else if (!EmailValidator.validate(req.body.email)) {
                return res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                });
            }
            else {
                return res.status(400).send({
                    error: 'Das sollte nicht passeren.'
                });
            }
        }

        //ändern Username + pw: username + altes pw + neues pw
        else if ((req.body.uid != '') && (req.body.username != '') && (req.body.email == '') && (req.body.oldpw != '') && (req.body.newpw != '') && (req.body.confirm != '')) {
            console.log("Ändere username und Passwort");
            if (req.body.newpw == req.body.oldpw) {
                return res.status(400).send({
                    error: 'Ihr neues Passwort darf nicht mit dem bisherigen Passwort übereinstimmen.'
                });
            }
            else if (req.body.newpw != req.body.confirm) {
                return res.status(400).send({
                    error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                });
            }
            else {
                try {
                    const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                    await c.updateUserName();
                    await c.updateUserPW(req.body.newpw);
                    return res.status(200).send({
                        message: "Die E-Mail Adresse und das Passwort wurden erfolgreich aktualisiert"
                    })
                } catch (error) {
                    if (error.message == "Incorrect User/PW") {
                        return res.status(400).send({
                            error: "Das eingegebene Passwort ist nicht korrekt"
                        })
                    }
                    else if (error.errno == 1062) {
                        return res.status(400).send({
                            error: 'Der eingegebene Benutzername existiert bereits'
                        })
                    } 
                    else {
                        console.log(error);
                        return res.status(400).send({
                            error: 'Das sollte nicht passeren.'
                        });
                    }
                }
            }
        }

        //ändern E-Mail und Username: email + username + altes pw 
        else if ((req.body.uid != '') && (req.body.username != '') && (req.body.email != '') && (req.body.oldpw != '') && (req.body.newpw == '') && (req.body.confirm == '')) {
            console.log("Ändere email und username");
            if (!EmailValidator.validate(req.body.email)) {
                return res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                });
            }
            else {
                try {
                    const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                    await c.updateEmail();
                    await c.updateUserName();
                    return res.status(200).send({
                        message: "Die E-Mail Adresse und der Benutzername wurden erfolgreich aktualisiert"
                    })
                } catch (error) {
                    if (error.message == "Incorrect User/PW") {
                        return res.status(400).send({
                            error: "Das eingegebene Passwort ist nicht korrekt"
                        })
                    }
                    else if (error.errno == 1062) {
                        return res.status(400).send({
                            error: 'Der eingegebene Benutzername und/oder E-Mail existieren bereits'
                        })
                    }
                    else {
                        console.log(error);
                        return res.status(400).send({
                            error: 'Das sollte nicht passeren.'
                        });
                    }
                }
            }
        }
        //ändern username und email und pw: email + username + altes pw + neues pw
        else if ((req.body.uid != '') && (req.body.username != '') && (req.body.email != '') && (req.body.oldpw != '') && (req.body.newpw != '') && (req.body.confirm != '')) {
            console.log("Ändere username, email und pw");
            if (req.body.newpw == req.body.oldpw) {
                return res.status(400).send({
                    error: 'Ihr neues Passwort darf nicht mit dem bisherigen Passwort übereinstimmen.'
                });
            }
            else if (req.body.newpw != req.body.confirm) {
                return res.status(400).send({
                    error: 'Ihr Bestätigungspasswort stimmt nicht mit dem eingegebenen Passwort überein.'
                });
            }
            else if (!EmailValidator.validate(req.body.email)) {
                return res.status(400).send({
                    error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
                });
            }
            try {
                const c = new User(req.body.username, req.body.oldpw, req.body.email, req.body.uid);
                await c.updateEmail();
                await c.updateUserName();
                
                await c.updateUserPW(req.body.newpw);
                return res.status(200).send({
                    message: "Die E-Mail Adresse, Benutzername und Passwort wurden erfolgreich aktualisiert"
                })
            } catch (error) {
                if (error.message == "Incorrect User/PW") {
                    return res.status(400).send({
                        error: "Das eingegebene Passwort ist nicht korrekt"
                    })
                }
                else if (error.errno == 1062) {
                    return res.status(400).send({
                        error: 'Der eingegebene Benutzername und/oder E-Mail existieren bereits'
                    })
                }
                else {
                    console.log(error);
                    return res.status(400).send({
                        error: 'Das sollte nicht passeren.'
                    });
                }
            }
        }
    }
}
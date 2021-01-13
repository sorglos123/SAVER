const app = new Vue({
    el: '#app',
    data: {
        username: '',
        passwd: '',
        created: null,
    },
    methods: {
        login() {
            console.log("Erfolgreich eingeloggt als " + this.username + " (Passwort: " + this.passwd + ")");
        },
        async loginAsynch() {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    passwd: this.passwd
                })
            });
            this.created = await response.json();
        }
    }
})
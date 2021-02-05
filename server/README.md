Die Grundstruktur besteht aus einem src-Ordner, einer package.json sowie einer tsconfig.json.
Zum Bauen und Ausführen wird folgendes benötigt:
    - npm (Paketmanager für node.js)
    - Node.js
    - Typescript

Mit dem Befehl "npm install" (dort, wo die package.json liegt) werden die Dependencies installiert.
Danach wird der Build mit "npm run build" ausgeführt und schließlich kann der Server nicht-detached mit
dem Befehl "npm run start" gestartet werden.
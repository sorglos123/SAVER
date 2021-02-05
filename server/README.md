Die Grundstruktur besteht aus einem src-Ordner, einer package.json sowie einer tsconfig.json.
Zum Bauen und Ausführen wird folgendes benötigt:
    - npm (Paketmanager für node.js)
    - Node.js
    - Typescript

Mit dem Befehl "npm install" (dort, wo die package.json liegt) werden die Dependencies installiert.
Danach wird der Build mit "npm run build" ausgeführt und schließlich kann der Server nicht-detached mit
dem Befehl "npm run start" gestartet werden.

Für Docker Standalone start:
Build:
sudo docker build -t backend .

Anschließend den Container starten mit
sudo docker run -d -p 4001:4001 backend

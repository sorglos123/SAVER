# Willkommen bei SAVER
SAVER (Speicherung, Analyse, Verarbeitung, von Einkaufszetteln und Rechnungen) ist eine Webapplikation, welche der Speicherung, Analyse und Verarbeitung
von Kassenzetteln, Rechnungen und anderen Kaufbelegen dient. Hierfür wird für den
Benutzer ein Web-Frontend bereitgestellt, welches mit einem Server mit OCRFunktionalitäten
sowie einer angebundenen Datenbank kommuniziert.
Nach der Anmeldung mit einem individuellen Benutzerkonto können nicht nur
erhaltene Kaufbelege, sondern auch die darauf abgebildeten Einzelposten gespeichert
werden. Diese Informationen können in unterschiedlichen Darstellungen abgerufen,
gefiltert und durchsucht werden. Zudem können Benutzer sich ihre Belegdaten in Form
von Auswertungen grafisch aufbereiten lassen.

Hierbei handelt es sich um einen Prototypen der als Softwareprojekt bei der BA Leipzig eingereicht wurde. 

## Komponenten:
- database
- frontend
- backend/server
- docker-compose files

## Quickstart:

1. Docker Volumes für Quittungen und die Datenbank müssen auf dem Docker-Host erstellt werden:
```
docker-volume create mariaSQL_01
docker-volume create images
```
2. Die Umgebung wird auf einem Docker-Host über folgenden Befehl gestartet:
```
ducker-compose up 
```

3. Über die IP des Docker-Hosts wird über den Port 8080 das Datenbankwerkzeug "Adminer" erreicht. Folgende Anmeldedaten werden genutzt:
```
server: mariadb
benutzer: root
passwort: password
```
4. Initiale Anlage der Datenbank über folgendes SQL-Statement:
https://github.com/smartledore94/SAVER/blob/main/database/saver_init.sql

5. Saver kann über die IP des Docker-Hosts erreicht und verwendet werden 

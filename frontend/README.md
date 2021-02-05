# vueproject-v2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Für Docker Standalone start:
Build:
```
sudo docker build -t frontend .
```

Anschließend den Container starten mit
```
sudo docker run -d -p 8080:8080 frontend
```

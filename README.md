# Instaclone Server
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/instaclonedb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Reconstruir módulos de node y levantar servidor
```
yarn install
yarn dev
```
<h1>Creando el Backend</h1>

1. Primero creo el `package.json` con el comando `npm init -y` el (-y) es opcional y esto hace que no te pregunte la configuración cuando creas el `json`

2. Creo la carpeta `src/` y dentro creo dos archivos el `server.ts` y el `index.ts`

    - server.ts: es donde voy a tener la configuración de mi servidor

    - index.ts: será el punto de entrada de mi app

Como `node.js` es un entorno de ejecución de javaScript no puedo ejecuta código de typeScript. Si quiero usar typeScript con node tengo que instalar las siguientes dependencias:

    npm install (i) -D typeScript ts-node

- -D: indica que esas dependencias serán de desarrollo

- typeScript: para dar soporte al lenguage

- ts-node: para trabajar node con typeScript

Para ejecutar el código uso el comando:

    npx ts-node nombre-de-tu-carpeta/nombre-del-archivo -> que queres ejecutar

Pero cada vez que hagas un cambio voy a tener que ejecutar el mismo comando para no hacer eso y que este escuchando por los cambios, instalo la siguiente dependencia y creo el siguiente `script` en mi `package.json`

    npm i -D nodemon

    "dev": "nodemon --exec ts-node nombre-de-tu-carpeta/nombre-del-archivo"

<h2>Creando el servidor con Express</h2>

Instalo las dependencias:

    npm i express -> si estas trabajando con TS necesitas también instalar los tipos

`server.ts`

    import express from "express"

    const server = express()

    export default server

`index.ts`

    import server from "./server"

    server.listen(port, () => {
        console.log(REST API funcionando en el puerto "port")
    })
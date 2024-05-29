import colors from 'colors';
import db from './config/db';
import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import cors, { CorsOptions } from 'cors';

// Conectar con la DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.bgGreen.bold("Conexión exitosa a la base de datos"));
    

  } catch (error) {
    console.error(error);
    console.log(colors.bgRed.bold("Hubo un error al conectarse con la base de datos"));
  }
}

connectDB()

// instancia de express
const server = express()

// permitir conexiones
const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    // console.log(origin);
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    }
    else {
      callback(new Error("Error de CORS"))
    }
  }
}
server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())

server.use("/api/products", router)

// documentación
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server
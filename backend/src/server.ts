import express from 'express'
import productsRouter from './routes'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './config/swagger'
import cors from 'cors'
import morgan from 'morgan'
import { corsOptions } from './config/cors'

// conectar a DB
export async function connectDB() {
  try {
    await db.authenticate()
    
    db.sync()
    // console.log(colors.green("Conección exitosa a la BD"));
    
  } catch (error) {
    // console.log(error);
    console.log(colors.red("Hubo un error al conectarse a la BD"));
    
  }
}
connectDB()
const server = express()

// habilito la lectura en formato json
server.use(express.json())

// habilito los CORS
server.use(cors(corsOptions))

// habilito el logging de morgan
server.use(morgan("dev"))
server.use("/api/products", productsRouter) // .use engloba todos los verbos http
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

export default server
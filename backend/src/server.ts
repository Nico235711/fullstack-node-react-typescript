import express from 'express'
import productRouter from './routes'
import db from './config/db'
import colors from 'colors'

// conectar a DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta("Conección exitosa a la BD"));
    
  } catch (error) {
    console.log(error);
    console.log(colors.red("Hubo un error al conectarse a la BD"));
    
  }
}
connectDB()
const server = express()
server.use("/api/products", productRouter) // .use engloba todos los verbos http

export default server
import express from 'express'
import productRouter from './routes'
import db from './config/db'

// conectar a DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log("Conección exitosa a la BD");
    
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectarse a la BD");
    
  }
}
connectDB()
const server = express()
server.use("/api/products", productRouter) // .use engloba todos los verbos http

export default server
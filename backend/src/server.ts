import express from 'express'
import productRouter from './routes'

const server = express()
server.use("/api/products", productRouter) // .use engloba todos los verbos http

export default server
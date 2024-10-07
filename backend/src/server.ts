import express from 'express'

const server = express()
// routing
server.get("/", (req, res) => {
  res.send("Hola API")
})

export default server
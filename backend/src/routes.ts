import { Router } from 'express' // instacia del router para no tener que importar el server

const router = Router()

// routing
router.get("/", (req, res) => {
  res.send("Hola API")
})

export default router
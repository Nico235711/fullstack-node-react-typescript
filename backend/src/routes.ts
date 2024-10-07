import { Router } from 'express' // instacia del router para no tener que importar el server
import { createProduct } from './handlers/product'

const router = Router()

// routing
router.post("/", createProduct)

export default router
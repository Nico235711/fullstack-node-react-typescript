import { Router } from 'express' // instacia del router para no tener que importar el server
import { createProduct } from './handlers/product'
import { body } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

// routing
router.post("/", 
  // validación
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .isNumeric().withMessage("Valor del producto no válido")
    .custom(value => value > 0).withMessage("Precio del producto no válido"),
  // middleware
  handleInputErrors,
  createProduct
)

export default router
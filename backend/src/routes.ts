import { Router } from 'express' // instacia del router para no tener que importar el server
import { createProduct, getAllProducts, getProductById, updateAvailability, updateProductById } from './handlers/product'
import { body, param } from 'express-validator'
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

router.get("/", getAllProducts)

router.get("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  getProductById
)

router.put("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  body("name")
  .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .isNumeric().withMessage("Valor del producto no válido")
    .custom(value => value > 0).withMessage("Precio del producto no válido"),
  body("availability")
    .notEmpty().withMessage("El valor de la disponibilidad no puede ir vacío")
    .isBoolean().withMessage("Valor no válido"),
  handleInputErrors,
  updateProductById
)

router.patch("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  updateAvailability
)

router.delete("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  getProductById
)

export default router
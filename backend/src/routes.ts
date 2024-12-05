import { Router } from 'express' // instancia del router para no tener que importar el server
import { createProduct, deleteProduct, getAllProducts, getProductById, updateAvailability, updateProductById } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number 
 *           description: ID del producto 
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: "Wireless Headphones"
 *         price:
 *           type: number
 *           description: Precio del producto
 *           example: 49.99
 *         availability:
 *           type: boolean
 *           description: Disponibilidad del producto
 *           example: true
 */

// routing

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error al crear el producto
 */
router.post("/", 
  // validación
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .isNumeric().withMessage("Precio del producto no válido")
    .custom(value => value > 0).withMessage("El precio del producto debe ser mayor 0"),
  // middleware
  handleInputErrors,
  createProduct
)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getAllProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Id no válido
 */
router.get("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  getProductById
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Id no válido
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Actualizar la disponibilidad de un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Id no válido
 */
router.patch("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Id no válido
 */

router.delete("/:id",
  param("id")
    .isInt().withMessage("Id no válido"),
  handleInputErrors,
  deleteProduct
)

export default router
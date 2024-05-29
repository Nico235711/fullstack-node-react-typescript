import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties: 
 *        id:
 *          type: integer
 *          description: The Product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The Product name
 *          example: Monitor HD de 30 pulgadas 
 *        price:
 *          type: number
 *          description: The Product price
 *          example: 50
 *        availability:
 *          type: boolean
 *          description: The Product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a lists of products
 *    tags: 
 *      - Products 
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Product"
 */

// routing
router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags: 
 *      - Products 
 *    description: Return a specific product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to get
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      404:
 *        description: Not found
 *      400:
 *        description: Bad Request - Invalid ID
 */

// :id -> me crea en la url el parametro id
router.get("/:id", 
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags: 
 *      - Products 
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor HD de 30 pulgadas
 *              price:
 *                type: number
 *                example: 50
 *    responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request - Validation error
 */

router.post("/", 
  // validar
  body("name")
    .notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric().withMessage("Valor no Válido")
    .notEmpty().withMessage("El valor del producto es obligatorio")
    .custom(value => value > 0).withMessage("El valor del producto debe ser mayor a cero"),
  handleInputErrors,
  createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags: 
 *      - Products 
 *    description: Return an updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to get
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor HD de 30 pulgadas - PUT
 *              price:
 *                type: number
 *                example: 50
 *              availability:
 *                type: boolean
 *                example: false
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid ID
 */

router.put("/:id", 
  body("name")
    .notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric().withMessage("Valor no Válido")
    .notEmpty().withMessage("El valor del producto es obligatorio")
    .custom(value => value > 0).withMessage("El valor del producto debe ser mayor a cero"),
  body("availability")
    .isBoolean().withMessage("Valor de la disponibilidad no válido"),
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateProduct

)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product
 *    tags: 
 *      - Products 
 *    description: Return a message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to get
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete("/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
)

export default router
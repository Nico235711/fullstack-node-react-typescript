import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    tags: [
      {
        name: 'Productos',
        description: 'Endpoints de productos'
      }
    ],
    info: {
      title: 'Documentación de la API de productos',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes.ts']
}

const swaggerSpecs = swaggerJSDoc(options)

export default swaggerSpecs
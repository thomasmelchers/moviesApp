import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'], // path to your route files
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerSetup(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export { swaggerSetup }

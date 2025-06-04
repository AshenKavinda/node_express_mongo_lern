import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API documentation for the Authentication Service',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      

      schemas: {
        // ... existing schemas ...
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password', 'age', 'role'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 50
            },
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 30,
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
            },
            age: {
              type: 'integer',
              minimum: 18,
              maximum: 120
            },
            role: {
              type: 'string',
              enum: ['user', 'admin']
            }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 50
            },
            age: {
              type: 'integer',
              minimum: 18,
              maximum: 120
            }
          },
          minProperties: 1
        },
        User: {
          type: 'object',
          properties: {
            userID: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin']
            },
            isVerified: {
              type: 'boolean'
            },
            age: {
              type: 'integer'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
    }


    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
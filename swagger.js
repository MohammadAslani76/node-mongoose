// const swaggerJsdoc = require('swagger-jsdoc');
import swaggerJsdoc from "swagger-jsdoc"

// Swagger configuration options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API title',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
    },
    apis: ['./routes/*.js'], // Path to your API route files
};

export const specs = swaggerJsdoc(options);

// module.exports = specs;
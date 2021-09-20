import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    info: {
        title: 'Microservice',
        version: '1.0.0',
        description: 'Description',
    },
    host: 'localhost:8080',
    basePath: '/api/v1',
};

const options = {
    swaggerDefinition,
    apis: ['./docs/**/*.yaml'],
};

export default swaggerJSDoc(options);

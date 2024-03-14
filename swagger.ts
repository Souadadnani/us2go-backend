const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: '52.70.155.19:8080'
};

const outputFile = './swagger/swagger-output.json';
const routes = ['./index.ts'];

swaggerAutogen(outputFile, routes, doc);
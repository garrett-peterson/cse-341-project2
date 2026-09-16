const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Quests API',
        description: 'Quests API'
    },
    host: 'localhost:3333',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
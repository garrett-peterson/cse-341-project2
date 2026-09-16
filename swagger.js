const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Quests API',
        description: 'Quests API'
    },
    host: 'cse-341-project2-cqkx.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
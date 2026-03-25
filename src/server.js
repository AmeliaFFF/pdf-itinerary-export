const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).json({
        message: 'PDF itinerary export service is running'
    });
});

module.exports = app;
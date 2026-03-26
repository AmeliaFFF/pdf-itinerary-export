const { prepareItineraryData } = require('../services/itineraryService');

const exportItinerary = (request, response) => {
    try {
        // Pass the request body to the itinerary service to validate and prepare the data.
        const preparedData = prepareItineraryData(request.body);

        // If successful, return the processed data.
        response.status(200).json({
            message: "Itinerary data processed successfully",
            preparedData
        });
    } catch (error) {
        // If validation fails, return a 400 error with the message.
        response.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    exportItinerary
};

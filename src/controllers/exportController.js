const { prepareItineraryData } = require('../services/itineraryService');
const { generateItineraryPDF } = require('../services/pdfService');

const exportItinerary = (request, response) => {
    try {
        // Pass the request body to the itinerary service to validate and prepare the data.
        const preparedData = prepareItineraryData(request.body);

        // Tell the browser/client that the response is a PDF file.
        response.setHeader("Content-Type", "application/pdf");
        response.setHeader("Content-Disposition", `attachment; filename="${preparedData.trip.title} itinerary.pdf"`);

        // Generate the PDF and send it in the response.
        generateItineraryPDF(preparedData, response);
    } catch (error) {
        // If validation fails, return a 400 error with the error message.
        response.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    exportItinerary
};

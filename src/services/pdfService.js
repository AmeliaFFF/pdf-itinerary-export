const PDFDocument = require("pdfkit");

const generateItineraryPDF = (preparedData, response) => {
    const trip = preparedData.trip;

    // Create a new PDF document.
    const doc = new PDFDocument();

    // Pipe the PDF output directly into the response.
    doc.pipe(response);

    // Add a title and basic trip summary information.
    doc.fontSize(20).text(`${trip.title} Itinerary`);
    doc.moveDown();

    doc.fontSize(12).text(`Trip Title: ${trip.title}`);
    doc.text(`Destination: ${trip.destination}`);

    // Finalise the PDF document.
    doc.end();
};

module.exports = {
    generateItineraryPDF
};

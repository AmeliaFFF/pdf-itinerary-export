const PDFDocument = require("pdfkit");
const { formatDate, formatTime } = require("../utils/dateUtils");

// Return context-specific labels for start and end times based on trip item type.
const getTimeLabels = (type) => {
    switch (type) {
        case "flight":
        case "cruise":
            return { start: "Departure", end: "Arrival" };
        case "accommodation":
            return { start: "Check-in", end: "Check-out" };
        default:
            return { start: "Start", end: "End" };
    }
}

const generateItineraryPDF = (preparedData, response) => {
    const trip = preparedData.trip;
    const groupedTripItems = preparedData.groupedTripItems;

    // Create a new PDF document.
    const doc = new PDFDocument();

    // Pipe the PDF output directly into the response.
    doc.pipe(response);

    // Add the main title.
    doc.fontSize(20).text(`${trip.title} Itinerary`);
    doc.moveDown();

    // Add a basic trip summary section.
    doc.fontSize(14).text("Trip Summary");
    doc.moveDown(0.5);

    if (trip.startDate) {
        doc.text(`Start Date: ${formatDate(trip.startDate)}`);
    }

    if (trip.endDate) {
        doc.text(`End Date: ${formatDate(trip.endDate)}`);
    }

    if (trip.status) {
        doc.text(`Status: ${trip.status}`);
    }

    doc.moveDown();

    // Add each day and its trip items.
    doc.fontSize(14).text("Daily Itinerary");
    doc.moveDown(0.5);

    for (const dateKey in groupedTripItems) {
        doc.fontSize(12).text(formatDate(dateKey));
        doc.moveDown(0.5);

        const tripItemsForDay = groupedTripItems[dateKey];

        for (let i = 0; i < tripItemsForDay.length; i++) {
            const tripItem = tripItemsForDay[i];

            doc.text(`• ${tripItem.title}`);

            if (tripItem.type) {
                doc.text(`  Type: ${tripItem.type.charAt(0).toUpperCase() + tripItem.type.slice(1)}`);
            }

            const labels = getTimeLabels(tripItem.type);

            if (tripItem.startDateTime) {
                doc.text(`  ${labels.start}: ${formatDate(tripItem.startDateTime)}, ${formatTime(tripItem.startDateTime)}`);
            }

            if (tripItem.endDateTime) {
                doc.text(`  ${labels.end}: ${formatDate(tripItem.endDateTime)}, ${formatTime(tripItem.endDateTime)}`);
            }

            if (tripItem.location) {
                doc.text(`  Location: ${tripItem.location}`);
            }

            doc.moveDown(0.5);
        }

        doc.moveDown();        
    }

    // Finalise the PDF document.
    doc.end();
};

module.exports = {
    generateItineraryPDF
};

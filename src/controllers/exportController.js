const exportItinerary = (request, response) => {
    response.status(200).json({
        message: "Itinerary export endpoint is working",
        receivedData: request.body
    });
};

module.exports = {
    exportItinerary
};

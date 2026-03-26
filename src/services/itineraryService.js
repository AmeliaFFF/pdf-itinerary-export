const prepareItineraryData = (payload) => {
    const trip = payload.trip;
    const tripItems = payload.tripItems;

    // 1. Check that trip data exists in the payload; if not, throw an error.
    if (!trip) {
        throw new Error("Trip data is required");
    }

    // 2. Check that tripItems is an array; if not, throw an error.    
    if (!Array.isArray(tripItems)) {
        throw new Error("Trip items must be an array");
    }

    return {
        trip,
        tripItems
    };
};

module.exports = {
    prepareItineraryData
};

// TODO:

// 3. Sort tripItems by startDateTime.

// 4. Group tripItems by day.

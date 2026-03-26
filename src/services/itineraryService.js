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

    // 3. Sort tripItems by startDateTime.
    const sortedTripItems = tripItems.sort((a, b) => {
        const dateA = new Date(a.startDateTime);
        const dateB = new Date(b.startDateTime);

        return dateA - dateB;
    })

    return {
        trip,
        tripItems: sortedTripItems
    };
};

module.exports = {
    prepareItineraryData
};

// TODO:

// 4. Group tripItems by day.

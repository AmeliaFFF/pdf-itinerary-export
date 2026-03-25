const express = require("express");
const { exportItinerary } = require("../controllers/exportController");

const router = express.Router();

router.post("/itinerary", exportItinerary);

module.exports = router;

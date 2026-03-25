const express = require("express");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).json({
        message: "PDF itinerary export service is running"
    });
});

app.use("/export", exportRoutes);

module.exports = app;

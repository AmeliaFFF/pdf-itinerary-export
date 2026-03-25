# PDF Itinerary Export Service

## Overview

This project is a standalone Express API that generates a PDF itinerary from structured trip data.

It accepts a `Trip` and associated `TripItems` as JSON, sorts and groups the items into a chronological itinerary, and returns a generated PDF as a downloadable response.

The service is intentionally stateless and does not include authentication, a database, or a frontend. It is focused purely on transforming structured data into a clean, readable itinerary document.

This project is part of a Coder Academy Hackathon and is intended to be reused later in the Voyager MERN application.
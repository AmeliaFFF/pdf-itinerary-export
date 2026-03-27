# PDF Itinerary Export Service

*A lightweight Express service that processes trip data and generates a formatted printable PDF itinerary.*

## Table of Contents

- [Overview](#overview)
- [Purpose](#purpose)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Using the API](#using-the-api)
- [Example Request](#example-request)
- [Example Output](#example-output)
- [Tech Stack](#tech-stack)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)

## Overview

This project is a standalone Express API that generates a PDF itinerary from structured trip data.

It accepts a `Trip` and associated `TripItems` as JSON, sorts and groups the items into a chronological itinerary, and returns a generated PDF as a downloadable response.

The service is intentionally stateless and does not include authentication, a database, or a frontend. It is focused purely on transforming structured data into a clean, readable itinerary document.

## Purpose

This project was developed as part of a Coder Academy hackathon and is intended to be reused later in the Voyager Travel Planner MERN application.

The goal was to build a small, focused service that performs a single responsibility well, while aligning with a larger application architecture.

The PDF itinerary export feature was selected as it provides clear real-world value and can be reused within the main Voyager application.

## Features

- Accepts structured trip and itinerary data as JSON.
- Sorts itinerary items chronologically.
- Groups itinerary items by day.
- Generates a clean, formatted, readable PDF itinerary.
- Applies context-specific labels for different item types (e.g., Departure, Check-in).
- Conditionally displays optional data fields (e.g., provider, booking reference, notes).
- Supports multi-page PDF output for larger itineraries.

## How It Works

1. The client sends a POST request containing `trip` and `tripItems` data.
2. The service validates the incoming payload.
3. Trip items are sorted by start date/time (regardless of input order).
4. Items are grouped by day.
5. The processed data is passed to the PDF generator.
6. A PDF document is created and streamed back as the response.

## Getting Started

Follow the steps below to run the PDF itinerary export service locally.

### Clone the Repository

Clone the repository to your local machine:
- **HTTPS:**
    ```bash
    git clone https://github.com/AmeliaFFF/pdf-itinerary-export.git
    ```
- **SSH:**
    ```bash
    git clone git@github.com:AmeliaFFF/pdf-itinerary-export.git
    ```

Navigate into the project directory:
```bash
cd pdf-itinerary-export
```

### Install Dependencies

Install the required dependencies using npm:
```bash
npm install
```

### Start the Server

Start the Express server:
```bash
npm run start
```

The server will start on:  
http://localhost:3000


## Using the API

Use an API client (e.g., Bruno, Insomnia, Postman) to send a POST request to: `/export/itinerary`

### Steps

1. Open your API client.
2. Create a POST request to:
   http://localhost:3000/export/itinerary
3. Set the request body to JSON.
4. Paste the example request payload (see below).
5. Send the request.

The response will be a downloadable PDF itinerary.

## Example Request

The following example intentionally includes trip items out of chronological order to demonstrate that the service sorts and groups them automatically.

```json
{
  "trip": {
    "title": "Japan 2026",
    "destination": "Japan",
    "status": "booked",
    "startDate": "2026-04-10",
    "endDate": "2026-04-20",
    "notes": "Cherry blossom trip"
  },
  "tripItems": [
    {
      "title": "Universal Studios Japan",
      "type": "activity",
      "status": "planned",
      "location": "Osaka",
      "startDateTime": "2026-04-19T09:00",
      "endDateTime": "2026-04-19T17:00"
    },
    {
      "title": "Flight to Tokyo",
      "type": "flight",
      "status": "booked",
      "location": "Brisbane Airport",
      "startDateTime": "2026-04-10T08:00",
      "endDateTime": "2026-04-10T18:00",
      "provider": "Qantas",
      "bookingReference": "QF123ABC",
      "cost": 1200,
      "currencyCode": "AUD",
      "notes": "Arrive early"
    },
    {
      "title": "Gion Evening Walk",
      "type": "activity",
      "status": "planned",
      "location": "Kyoto",
      "startDateTime": "2026-04-16T18:00",
      "endDateTime": "2026-04-16T21:00"
    },
    {
      "title": "Hotel Check-in",
      "type": "accommodation",
      "status": "booked",
      "location": "Tokyo",
      "startDateTime": "2026-04-10T15:00",
      "endDateTime": "2026-04-14T10:00",
      "provider": "Hotel Gracery",
      "bookingReference": "HOTEL456",
      "cost": 900,
      "currencyCode": "AUD",
      "notes": "Late check-in available"
    },
    {
      "title": "Train to Osaka",
      "type": "transport",
      "status": "planned",
      "location": "Kyoto Station",
      "startDateTime": "2026-04-18T10:30",
      "endDateTime": "2026-04-18T11:30"
    },
    {
      "title": "Shibuya Walking Tour",
      "type": "activity",
      "status": "planned",
      "location": "Shibuya",
      "startDateTime": "2026-04-11T09:00",
      "endDateTime": "2026-04-11T12:00",
      "provider": "Tokyo Tours",
      "bookingReference": "TOUR789",
      "cost": 75,
      "currencyCode": "AUD",
      "notes": "Meet outside station"
    },
    {
      "title": "Kyoto Hotel Check-in",
      "type": "accommodation",
      "status": "booked",
      "location": "Kyoto",
      "startDateTime": "2026-04-14T15:00",
      "endDateTime": "2026-04-18T10:00",
      "provider": "Kyoto Inn",
      "bookingReference": "KYOTO123",
      "cost": 800,
      "currencyCode": "AUD"
    },
    {
      "title": "Fushimi Inari Shrine Visit",
      "type": "activity",
      "status": "planned",
      "location": "Kyoto",
      "startDateTime": "2026-04-15T08:00",
      "endDateTime": "2026-04-15T11:00"
    },
    {
      "title": "TeamLab Planets",
      "type": "activity",
      "status": "planned",
      "location": "Tokyo",
      "startDateTime": "2026-04-11T14:00",
      "endDateTime": "2026-04-11T16:00",
      "provider": "TeamLab",
      "bookingReference": "ART123",
      "cost": 40,
      "currencyCode": "AUD"
    },
    {
      "title": "Bullet Train to Kyoto",
      "type": "transport",
      "status": "booked",
      "location": "Tokyo Station",
      "startDateTime": "2026-04-14T09:00",
      "endDateTime": "2026-04-14T12:00",
      "provider": "JR Rail",
      "bookingReference": "JR456",
      "cost": 150,
      "currencyCode": "AUD"
    },
    {
      "title": "Osaka Hotel Check-in",
      "type": "accommodation",
      "status": "planned",
      "location": "Osaka",
      "startDateTime": "2026-04-18T14:00",
      "endDateTime": "2026-04-20T10:00"
    },
    {
      "title": "Arashiyama Bamboo Forest",
      "type": "activity",
      "status": "planned",
      "location": "Kyoto",
      "startDateTime": "2026-04-16T09:00",
      "endDateTime": "2026-04-16T12:00"
    },
    {
      "title": "Dotonbori Food Tour",
      "type": "tour",
      "status": "planned",
      "location": "Osaka",
      "startDateTime": "2026-04-18T18:00",
      "endDateTime": "2026-04-18T21:00"
    }
  ]
}
```

## Example Output

A formatted PDF itinerary is returned as a downloadable response.

An example PDF output for the above request is [included in this repository](https://github.com/user-attachments/files/26294074/Japan.2026.itinerary.pdf).

## Tech Stack

- Node.js
- Express
- PDFKit

## Design Decisions

### Generic Date Fields

- The data model uses generic `startDateTime` and `endDateTime` fields for all trip items.
- This allows flexibility across different item types (e.g., flights, accommodation, activities), while the presentation layer applies context-specific labels such as "Departure", "Check-in", or "Start".

### Local Time Handling

- Date and time values are treated as local to the destination, rather than being converted between time zones.
- This reflects real-world usage, where travellers think in terms of local time at their destination rather than their home time zone.

### Conditional Field Rendering

- Optional fields such as provider, booking reference, and notes are only displayed when data is present.
- This ensures the PDF remains clean and avoids displaying empty or irrelevant information.

### Cost and Currency Handling

- Cost values are only displayed when a corresponding currency code is provided.
- This avoids ambiguity, particularly for trips involving multiple currencies.

### Separation of Concerns

The project is structured to separate responsibilities:

- Export controller: handles request and response.
- Itinerary service: validates and processes data.
- PDF service: handles document generation.

This structure supports maintainability and future integration into the Voyager application.

## Future Improvements

- Add support for custom fonts and branding (e.g., Voyager logo).
- Improve pagination (e.g., repeating headers on new pages).
- Add currency formatting and localisation.
- Integrate with the main Voyager application.
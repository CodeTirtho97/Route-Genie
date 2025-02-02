const express = require("express");
const { body } = require("express-validator");
const {
    getItineraries,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    generateItinerary
} = require("../controllers/itineraryController"); // Ensure all functions exist
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Existing CRUD operations
router.get("/", protect, getItineraries);
router.post(
    "/",
    protect,
    [
        body("destination", "Destination is required").notEmpty(),
        body("startDate", "Start Date is required").isISO8601(),
        body("endDate", "End Date is required").isISO8601(),
    ],
    createItinerary
);
router.put("/:id", protect, updateItinerary);
router.delete("/:id", protect, deleteItinerary);

// ✅ New Route for Generating Itinerary
router.post("/generate-itinerary", protect, [
    body("destination", "Destination is required").notEmpty(),
    body("startDate", "Start Date is required").isISO8601(),
    body("endDate", "End Date is required").isISO8601(),
    body("numPersons", "Number of Persons is required").isNumeric(),
    body("tripType", "Trip Type is required").notEmpty(),
    body("budget", "Budget is required").isNumeric(),
], generateItinerary);

module.exports = router;

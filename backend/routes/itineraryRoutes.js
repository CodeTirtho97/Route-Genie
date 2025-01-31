const express = require("express");
const { body } = require("express-validator");
const { getItineraries, createItinerary, updateItinerary, deleteItinerary } = require("../controllers/itineraryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

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

module.exports = router;

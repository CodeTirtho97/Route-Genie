const express = require("express");
const { body } = require("express-validator");
const { getBookings, createBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getBookings);
router.post(
    "/",
    protect,
    [
        body("type", "Type must be Hotel, Flight, or Activity").isIn(["Hotel", "Flight", "Activity"]),
        body("name", "Name is required").notEmpty(),
        body("date", "Date is required").isISO8601(),
    ],
    createBooking
);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

module.exports = router;

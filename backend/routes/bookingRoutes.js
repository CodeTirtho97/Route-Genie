const express = require("express");
const { body } = require("express-validator");
const { getBookings, createManualBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getBookings);
router.post("/manual", protect, createManualBooking);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

module.exports = router;

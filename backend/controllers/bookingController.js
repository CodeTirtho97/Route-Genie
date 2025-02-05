const Booking = require("../models/Booking");
const Itinerary = require("../models/Itinerary");

// @desc Get all bookings for logged-in user
// @route GET /api/bookings
// @access Private
const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user });
        res.json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a booking manually
// @route   POST /api/bookings/manual
// @access  Private
const createManualBooking = async (req, res) => {
    try {
        const { itinerary, category, name, origin, date, time, price, notes } = req.body;

        // Validate required fields
        if (!itinerary || !category || !name || !date || !price) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // Ensure the itinerary exists and belongs to the user
        // console.log("Incoming Itinerary ID:", req.body.itinerary);
        // console.log("Decoded User:", req.user); // Debugging the user info

        if (!req.user) {
            return res.status(401).json({ message: "User authentication failed. Please log in again." });
        }

        const userItinerary = await Itinerary.findOne({ _id: req.body.itinerary, user: req.user._id });

        if (!userItinerary) {
            console.log("Itinerary Not Found or Unauthorized for User:", req.user._id);
            return res.status(404).json({ message: "Itinerary not found or unauthorized" });
        }

        // Create new booking
        const booking = new Booking({
            itinerary,
            category,
            name,
            origin: category === "Flight" || category === "Train" ? origin : undefined,
            date,
            time,
            price,
            notes,
            user: req.user._id,
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete a booking
// @route DELETE /api/bookings/:id
// @access Private
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        // Ensure the user deleting the booking is the same user who created it
        if (booking.user.toString() !== req.userId) {
            return res.status(403).json({ msg: "Not authorized to delete this booking" });
        }

        await booking.deleteOne();
        res.json({ msg: "Booking deleted successfully" });

    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ msg: "Server error: Unable to delete booking" });
    }
};


// @desc Update a booking
// @route PUT /api/bookings/:id
// @access Private
const updateBooking = async (req, res) => {
    try {
        console.log("🔹 Incoming Request to Update Booking");
        console.log("🔹 Authenticated User:", req.user); // Log the authenticated user
        console.log("🔹 Booking ID:", req.params.id);
        console.log("🔹 Request Body:", req.body);

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        console.log("🔹 Booking Found:", booking);

        // ✅ Convert req.user to an ObjectId for proper comparison
        if (booking.user.toString() !== req.userId) {
            console.error("❌ Not Authorized - User Mismatch");
            return res.status(401).json({ msg: "Not authorized" });
        }

        //console.log("✅ User is authorized. Updating booking...");

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedBooking);
    } catch (error) {
        console.error("❌ Server Error Updating Booking:", error);
        res.status(500).json({ msg: "Server error: Unable to update booking" });
    }
};


module.exports = { 
    createManualBooking,
    updateBooking,
    deleteBooking,
    getBookings
};
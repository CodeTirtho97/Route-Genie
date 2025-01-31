const Booking = require("../models/Booking");

// @desc Get all bookings for logged-in user
// @route GET /api/bookings
// @access Private
exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user });
        res.json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc Create a new booking
// @route POST /api/bookings
// @access Private
exports.createBooking = async (req, res, next) => {
    const { type, name, date, details } = req.body;

    if (!type || !name || !date) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    try {
        const booking = new Booking({ user: req.user, type, name, date, details });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        next(error);
    }
};

// @desc Delete a booking
// @route DELETE /api/bookings/:id
// @access Private
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        // Check if the booking belongs to the logged-in user
        if (booking.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await booking.deleteOne(); // Use deleteOne() instead of remove()
        res.json({ msg: "Booking deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error: Unable to delete booking" });
    }
};


// @desc Update a booking
// @route PUT /api/bookings/:id
// @access Private
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        // Check if the booking belongs to the logged-in user
        if (booking.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Update the booking fields
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update with new data
            { new: true } // Return updated booking
        );

        res.json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error: Unable to update booking" });
    }
};
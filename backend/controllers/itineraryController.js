const Itinerary = require("../models/Itinerary");

// @desc Get all itineraries for logged-in user
// @route GET /api/itineraries
// @access Private
exports.getItineraries = async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find({ user: req.user });
        res.json(itineraries);
    } catch (error) {
        next(error); // Passes error to global error handler
    }
};

// @desc Create a new itinerary
// @route POST /api/itineraries
// @access Private
exports.createItinerary = async (req, res, next) => {
    const { destination, startDate, endDate, activities } = req.body;

    if (!destination || !startDate || !endDate) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    try {
        const itinerary = new Itinerary({ user: req.user, destination, startDate, endDate, activities });
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        next(error);
    }
};

// @desc Delete an itinerary
// @route DELETE /api/itineraries/:id
// @access Private
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        
        if (!itinerary) {
            return res.status(404).json({ msg: "Itinerary not found" });
        }

        // Check if the itinerary belongs to the logged-in user
        if (itinerary.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await itinerary.deleteOne(); // Use deleteOne() instead of remove()
        res.json({ msg: "Itinerary deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error: Unable to delete itinerary" });
    }
};


// @desc Update an itinerary
// @route PUT /api/itineraries/:id
// @access Private
exports.updateItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({ msg: "Itinerary not found" });
        }

        // Check if the itinerary belongs to the logged-in user
        if (itinerary.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Update the itinerary fields
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update with new data
            { new: true } // Return updated itinerary
        );

        res.json(updatedItinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error: Unable to update itinerary" });
    }
};
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const Itinerary = require("../models/Itinerary");

// Fetch coordinates of the location using OpenStreetMap (Nominatim API)
async function getCoordinates(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await axios.get(url);
    return response.data.length > 0 ? { lat: response.data[0].lat, lon: response.data[0].lon } : null;
}

// Fetch places from OpenStreetMap (Overpass API)
async function fetchPlaces(latitude, longitude, category) {
    const query = `[out:json];
      node["tourism"="${category}"](around:5000, ${latitude}, ${longitude});
      out;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    return response.data.elements.map(place => place.tags.name).filter(name => name);
}

// Controller Function to Generate Itinerary
const generateItinerary = async (req, res) => {
    try {
        const { destination, startDate, endDate, numPersons, tripType, budget } = req.body;
        const coords = await getCoordinates(destination);
        if (!coords) return res.status(400).json({ error: "Invalid location" });

        // Fetch categorized places
        const attractions = await fetchPlaces(coords.lat, coords.lon, "attraction");
        const hotels = await fetchPlaces(coords.lat, coords.lon, "hotel");
        const restaurants = await fetchPlaces(coords.lat, coords.lon, "restaurant");

        // Create a structured itinerary (with `days`)
        const itineraryDays = [];
        const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < totalDays; i++) {
            itineraryDays.push({
                title: `Day ${i + 1}`,
                activities: [
                    attractions[i % attractions.length] || "Explore local area",
                    restaurants[i % restaurants.length] || "Try local cuisine",
                    hotels[i % hotels.length] || "Relax at your hotel"
                ]
            });
        }

        res.json({
            destination,
            startDate,
            endDate,
            numPersons,
            tripType,
            budget,
            days: itineraryDays  // Include generated `days`
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate itinerary" });
    }
};

// Fetch all itineraries for a user
const getItineraries = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        const itineraries = await Itinerary.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Fetch a single itinerary by ID
const getItineraryById = asyncHandler(async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        if (itinerary.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to access this itinerary" });
        }

        // Ensure `days` is included
        res.json({ ...itinerary.toObject(), days: itinerary.days || [] });
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Create a new itinerary (without auto-generated plan)
const createItinerary = async (req, res) => {
    try {
        // console.log("Received Itinerary Data:", req.body); // Debugging line

        const { destination, startDate, endDate, numPersons, tripType, budget, days } = req.body;

        if (!destination || !startDate || !endDate || !numPersons || !tripType || !budget) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        // Check if itinerary already exists (for the same user, destination, and date)
        const existingItinerary = await Itinerary.findOne({
            user: req.user.id,
            destination,
            startDate,
            endDate
        });

        if (existingItinerary) {
            return res.status(400).json({ msg: "An itinerary for this destination and date already exists!" });
        }

        // Ensure `days` are present before saving
        if (!days || days.length === 0) {
            return res.status(400).json({ msg: "Itinerary must include a day-wise plan" });
        }

        // Save itinerary with `days`
        const itinerary = new Itinerary({
            user: req.user.id,
            destination,
            startDate,
            endDate,
            numPersons,
            tripType,
            budget,
            days  // Store `days`
        });

        await itinerary.save();
        // console.log("Itinerary successfully saved to MongoDB:", itinerary); // Debugging line

        res.status(201).json(itinerary);
    } catch (error) {
        console.error("Error saving itinerary:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// ✅ Update an existing itinerary
const updateItinerary = asyncHandler(async (req, res) => {
    try {
        const { numPersons, budget, tripType } = req.body;

        // Ensure only these fields can be updated
        const updatedFields = { numPersons, budget, tripType };

        const itinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true } // Return updated itinerary
        );

        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        console.error("Error updating itinerary:", error);
        res.status(500).json({ error: "Failed to update itinerary" });
    }
});

// ✅ Delete an itinerary
const deleteItinerary = asyncHandler(async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        if (itinerary.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to delete this itinerary" });
        }

        await itinerary.deleteOne();

        res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        console.error("Error deleting itinerary:", error);
        res.status(500).json({ error: "Failed to delete itinerary" });
    }
});

// ✅ Export all functions
module.exports = {
    getItineraries,
    getItineraryById, // ✅ Added missing export
    createItinerary,
    updateItinerary,
    deleteItinerary,
    generateItinerary
};

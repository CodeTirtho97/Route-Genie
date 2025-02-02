const axios = require("axios");
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

// ✅ Controller Function to Generate Itinerary
const generateItinerary = async (req, res) => {
    try {
        const { destination, startDate, endDate, numPersons, tripType, budget, travelMode } = req.body;
        const coords = await getCoordinates(destination);
        if (!coords) return res.status(400).json({ error: "Invalid location" });

        // Fetch categorized places
        const attractions = await fetchPlaces(coords.lat, coords.lon, "attraction");
        const hotels = await fetchPlaces(coords.lat, coords.lon, "hotel");
        const restaurants = await fetchPlaces(coords.lat, coords.lon, "restaurant");

        // Create a structured itinerary
        const itinerary = [];
        const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < totalDays; i++) {
            itinerary.push({
                day: `Day ${i + 1}`,
                morning: attractions[i % attractions.length] || "Explore local area",
                afternoon: restaurants[i % restaurants.length] || "Try local cuisine",
                evening: hotels[i % hotels.length] || "Relax at your hotel"
            });
        }

        res.json({ itinerary, destination, startDate, endDate, numPersons, tripType, budget, travelMode });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate itinerary" });
    }
};

// ✅ Add CRUD functions for Itineraries
const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const createItinerary = async (req, res) => {
    try {
        // console.log("Received Itinerary Data:", req.body); // ✅ Debugging line

        const { destination, startDate, endDate, numPersons, tripType, budget } = req.body;

        if (!destination || !startDate || !endDate || !numPersons || !tripType || !budget) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        const itinerary = new Itinerary({
            user: req.user.id, // ✅ Assign the user ID
            destination,
            startDate,
            endDate,
            numPersons,
            tripType,
            budget,
        });

        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        console.error("Error saving itinerary:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

const updateItinerary = async (req, res) => {
    try {
        // Dummy response for updating itinerary
        res.json({ message: "Itinerary updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update itinerary" });
    }
};

const deleteItinerary = async (req, res) => {
    try {
        // Dummy response for deleting itinerary
        res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete itinerary" });
    }
};


// ✅ Ensure all functions are exported properly
module.exports = {
    getItineraries,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    generateItinerary
};

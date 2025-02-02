const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // User is required
    },
    destination: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    numPersons: { type: Number, required: true },
    tripType: { type: String, required: true },
    budget: { type: Number, required: true },
}, { timestamps: true });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = Itinerary;

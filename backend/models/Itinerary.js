const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", itinerarySchema);

const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        destination: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        numPersons: { type: Number, required: true },
        tripType: { type: String, required: true },
        budget: { type: Number, required: true },
        days: [
            {
                title: { type: String, required: true },
                activities: { type: [String], required: true }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);

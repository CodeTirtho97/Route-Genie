const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["Hotel", "Flight", "Activity"], required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    details: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);

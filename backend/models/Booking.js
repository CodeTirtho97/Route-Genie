const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
      required: true,
    },
    category: {
      type: String,
      enum: ["Flight", "Train", "Hotel", "Restaurant", "Activity"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String, // Required only for flights/trains
      required: function () {
        return this.category === "Flight" || this.category === "Train";
      },
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Example: "10:30 AM"
    },
    price: {
      type: Number,
      required: true,
    },
    notes: {
      type: String, // Optional user notes
    },
    ticketCopy: {
      type: String, // PDF file URL (disabled for now)
      required: false,
      default: null, // Ensuring it remains inactive
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

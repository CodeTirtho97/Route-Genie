require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Global Error Handler (Must be after all routes)
app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
    res.send("RouteGenie Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

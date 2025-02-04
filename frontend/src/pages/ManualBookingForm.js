import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, MenuItem, Button, Paper, Typography, Box, CircularProgress, Snackbar } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MuiAlert from "@mui/material/Alert";
import API from "../utils/api";
import { motion } from "framer-motion";

//Dynamic Background Images
import bgStart from "../assets/booking-bg-start.png";
import bgFlight from "../assets/booking-bg-flight.png";
import bgTrain from "../assets/booking-bg-train.png";
import bgHotel from "../assets/booking-bg-hotel.png";
import bgRestaurant from "../assets/booking-bg-restaurant.png";
import bgActivity from "../assets/booking-bg-activity.png";

const ManualBookingForm = () => {
    const { itineraryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(bgStart);

    // Function to dynamically update background image
    useEffect(() => {
        const bgMap = {
            "Flight": bgFlight,
            "Train": bgTrain,
            "Hotel": bgHotel,
            "Restaurant": bgRestaurant,
            "Activity": bgActivity,
        };
        setBackgroundImage(category ? bgMap[category] : bgStart);
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!category || !name || !date || !price) {
            setError("Please fill all required fields.");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated. Please log in.");
                setLoading(false);
                return;
            }
    
            // Prepare payload
            const bookingData = {
                itinerary: itineraryId,
                category,
                name,
                origin: category === "Flight" || category === "Train" ? origin : undefined,
                date,
                time,
                price,
                notes,
            };
    
            console.log("Posting Booking Data:", bookingData); // Debugging: Log the data before sending
    
            // Axios API Call
            const response = await API.post("/bookings/manual", bookingData, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Response:", response.data); // Debugging: Log the response
    
            setSuccess(true);
            setTimeout(() => navigate(`/itinerary/${itineraryId}`), 2000);
        } catch (error) {
            console.error("Error creating booking:", error.response ? error.response.data : error.message);
            setError("Failed to save booking. Please check your input and try again.");
        }
    
        setLoading(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative", // Needed for overlay positioning
                overflow: "hidden",
            }}
        >
            {/* Background Image */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "background 0.5s ease-in-out",
                    filter: "brightness(50%)", // Darkens the image for a faded effect
                }}
            />

            {/* Semi-transparent Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay (adjust alpha for more/less fade)
                }}
            />
            <Box sx={{ flexGrow: 1, padding: "40px", maxWidth: "70%", margin: "auto", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Paper sx={{
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.15)",
                        textAlign: "center",
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(255, 255, 255, 0.85)"
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#ff9800", fontFamily: "'Poppins', sans-serif" }}>
                            ✏️ Enter Your Booking Details
                        </Typography>

                        {error && <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                select
                                label="Select Booking Type"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                fullWidth
                                margin="dense"
                                sx={{ background: "white" }}
                            >
                                <MenuItem value="Flight">✈️ Flight</MenuItem>
                                <MenuItem value="Train">🚆 Train</MenuItem>
                                <MenuItem value="Hotel">🏨 Hotel</MenuItem>
                                <MenuItem value="Restaurant">🍽️ Restaurant</MenuItem>
                                <MenuItem value="Activity">🎭 Activity</MenuItem>
                            </TextField>

                            {(category === "Flight" || category === "Train") && (
                                <TextField
                                    label="Origin/Destination City (Only for Flights/Trains)"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    fullWidth
                                    margin="dense"
                                    sx={{ background: "white" }}
                                />
                            )}

                            <TextField label="Booking Name (Flight/Hotel/Event Name)" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="dense" required sx={{ background: "white" }} />
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* Booking Date Picker */}
                                <DatePicker
                                    label="Booking Date"
                                    value={date ? dayjs(date) : null}
                                    onChange={(newValue) => setDate(newValue ? newValue.format("YYYY-MM-DD") : "")}
                                    sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderRadius: "5px",
                                        "& .MuiOutlinedInput-root": {
                                            fontSize: "1rem",
                                            padding: "10px",
                                        },
                                    }}
                                />

                                {/* Booking Time Picker */}
                                <TimePicker
                                    label="Booking Time (Optional)"
                                    value={time ? dayjs(time, "HH:mm") : null}
                                    onChange={(newValue) => setTime(newValue ? newValue.format("HH:mm") : "")}
                                    sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderRadius: "5px",
                                        marginTop: "10px",
                                        "& .MuiOutlinedInput-root": {
                                            fontSize: "1rem",
                                            padding: "10px",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField label="Total Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="dense" required sx={{ background: "white" }} />
                            
                            <TextField
                                label="Additional Notes (Max 100 Characters)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                fullWidth
                                margin="dense"
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 100 }}
                                sx={{ background: "white" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    background: "#ff9800",
                                    color: "white",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    "&:hover": { background: "#ff5722" }
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "🚀 Save Booking"}
                            </Button>
                        </form>
                    </Paper>
                </motion.div>
            </Box>

            {/* Success Snackbar */}
            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <MuiAlert severity="success" sx={{ width: "100%" }}>
                    ✅ Booking Saved! Redirecting...
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default ManualBookingForm;

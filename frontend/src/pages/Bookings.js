import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch user authentication status
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    // Fetch bookings only if the user is logged in
    useEffect(() => {
        if (user) {
            API.get("/bookings")
                .then((res) => setBookings(res.data))
                .catch(() => setBookings([])); // Hide server error, default to empty array
        }
    }, [user]);

    return (
        <Box sx={{ background: "#f3f4f6", minHeight: "100vh", padding: "50px 10%" }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Typography variant="h1" sx={{ fontWeight: "bold", fontFamily: "'Mystery Quest', cursive", textAlign: "center", mb: 5, color: "#333", fontSize: "3rem" }}>
                    ✈️ Your Travel Bookings
                </Typography>
            </motion.div>

            {/* If user is NOT logged in, show Login prompt */}
            {!user ? (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Paper sx={{ padding: "30px", background: "#ff9800", borderRadius: "12px", textAlign: "center", color: "#fff", mb: 5, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                                🔒 Log in to View Your Bookings!
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem" }}>
                                Your trip details are saved for easy access. Log in to manage and edit your bookings.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#ffffff",
                                    color: "#ff5722",
                                    fontWeight: "bold",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "1.2rem",
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.05)", backgroundColor: "#fff3e0" }
                                }}
                                onClick={() => navigate("/login")}
                            >
                                🔑 LOGIN NOW
                            </Button>
                        </Paper>
                    </motion.div>

                    {/* Sample Booking for John Doe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper sx={{ padding: "30px", background: "#ffffff", borderRadius: "12px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)", mb: 5 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", textAlign: "center", mb: 2, fontFamily: "'Raleway', sans-serif" }}>
                                📜 Sample Booking: John Doe's Bali Adventure
                            </Typography>

                            <List sx={{ background: "#fafafa", borderRadius: "10px", padding: "20px" }}>
                                {[
                                    { 
                                        icon: "🛫", 
                                        title: "Flight Booking", 
                                        detail: "Round-trip from New York to Bali", 
                                        extra: "Flight No: GA881 | Airline: Garuda Indonesia | Departure: April 10, 10:00 AM | Fare: $750" 
                                    },
                                    { 
                                        icon: "🏨", 
                                        title: "Hotel Stay", 
                                        detail: "The Bali Beach Resort (5-star, Ocean View)", 
                                        extra: "Check-in: April 10 | Check-out: April 18 | Price: $1200 | Booking Ref: #BALI12345" 
                                    },
                                    { 
                                        icon: "🚗", 
                                        title: "Transport", 
                                        detail: "Private Car Rental for entire trip", 
                                        extra: "Provider: Bali Rent-A-Car | Pickup: Airport | Total Cost: $400" 
                                    },
                                    { 
                                        icon: "🏄‍♂️", 
                                        title: "Activity Booking", 
                                        detail: "Surfing Lessons at Kuta Beach", 
                                        extra: "Instructor: Bali Surf School | Duration: 2 hours | Price: $60 | Time: April 11, 9:00 AM" 
                                    },
                                    { 
                                        icon: "🍽️", 
                                        title: "Dining Reservation", 
                                        detail: "Romantic Dinner at Rock Bar Bali", 
                                        extra: "Time: April 12, 7:30 PM | Cuisine: Seafood & Asian | Price: $90 | Booking ID: #DINE789" 
                                    }
                                ].map((item, index) => (
                                    <motion.div whileHover={{ scale: 1.02 }} key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                                                        {item.icon} {item.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
                                                        {item.detail}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", color: "#666", ml: 4 }}>
                                            {item.extra}
                                        </Typography>
                                        <Divider />
                                    </motion.div>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                </>
            ) : (
                <Typography variant="h5" sx={{ textAlign: "center", fontFamily: "'Poppins', sans-serif", mt: 5, color: "#777" }}>
                    Your saved bookings will be displayed here once added!
                </Typography>
            )}
        </Box>
    );
};

export default Bookings;

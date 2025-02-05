import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import {
    Box, Typography, Paper, Button, CircularProgress, List, ListItem, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem
} from "@mui/material";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const ItineraryDetails = () => {
    const { itineraryId } = useParams();  
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [redirectSeconds, setRedirectSeconds] = useState(5);
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);
    const [openAddBookingDialog, setOpenAddBookingDialog] = useState(false);
    const [openBookingErrorDialog, setOpenBookingErrorDialog] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("");

    // Editable fields for update
    const [numPersons, setNumPersons] = useState("");
    const [budget, setBudget] = useState("");
    const [tripType, setTripType] = useState("");

    useEffect(() => {
        if (!itineraryId) {
            console.error("No itinerary ID found in URL.");
            setError("Invalid Itinerary ID.");
            setLoading(false);
            return;
        }

        const fetchItineraryDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized access. Please log in.");
                    setLoading(false);
                    return;
                }

                const { data } = await API.get(`/itineraries/${itineraryId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setItinerary(data);
                fetchBackgroundImage(data.destination);
            } catch (error) {
                console.error("Error fetching itinerary details:", error);
                setError("Itinerary not found!");
            }
            setLoading(false);
        };

        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get(`/bookings?itineraryId=${itineraryId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchItineraryDetails();
        fetchBookings();
    }, [itineraryId]);

    const handleDeleteItinerary = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/itineraries/${itineraryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDeleteMessage("Itinerary successfully deleted.");
            const countdown = setInterval(() => {
                setRedirectSeconds(prev => {
                    if (prev === 1) {
                        clearInterval(countdown);
                        navigate("/itinerary");
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            console.error("Error deleting itinerary:", error);
            setDeleteMessage("Failed to delete itinerary.");
        }
    };

    const handleUpdateItinerary = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.put(`/itineraries/${itineraryId}`, {
                numPersons,
                budget,
                tripType
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUpdateSuccessMessage("Itinerary Successfully Updated!");
            setTimeout(() => {
                setUpdateSuccessMessage(null);
            }, 5000);

            setOpenUpdateDialog(false);
            setItinerary(prev => ({ ...prev, numPersons, budget, tripType }));
        } catch (error) {
            console.error("Error updating itinerary:", error);
        }
    };

    // Function to handle showing booking details
    const handleShowBookings = () => {
        if (bookings.length === 0) {
            setOpenBookingErrorDialog(true); // Show error modal if no bookings exist
        } else {
            navigate(`/bookings/details/${itineraryId}`);
        }
    };

    // Function to handle opening Add Booking dialog
    const handleAddBooking = () => {
        setOpenAddBookingDialog(true);
    };

    // ✅ Fetch Background Image from Unsplash API
    const fetchBackgroundImage = async (destination) => {
        try {
            const apiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
            const apiUrl = process.env.REACT_APP_UNSPLASH_API_URL;

            //console.log("Unsplash API URL:", process.env.REACT_APP_UNSPLASH_API_URL);
            //console.log("Unsplash API Key:", process.env.REACT_APP_UNSPLASH_ACCESS_KEY);

            if (!apiKey || !apiUrl) {
                console.error("Unsplash API Key or URL is missing in .env file!");
                return;
            }

            // 🔹 Use the itinerary's `destination` value in the search query
            const response = await fetch(`${apiUrl}?query=${destination}&client_id=${apiKey}&per_page=1`);
            const result = await response.json();

            if (result.results && result.results.length > 0) {
                setBackgroundImage(result.results[0].urls.regular);
            } else {
                console.warn(`No images found for "${destination}".`);
            }
        } catch (error) {
            console.error("Error fetching background image:", error);
        }
    };


    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h5" sx={{ color: "red", fontWeight: "bold" }}>
                    ❌ {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: "100vh",
            background: backgroundImage
                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`
                : "#f4f4f4",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "50px 10%",
        }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, fontFamily: "'Raleway', sans-serif", color: "#ff5722" }}>
                    ✈️ {itinerary.destination} Trip
                </Typography>
            </motion.div>

            {updateSuccessMessage && (
                <Typography variant="h6" sx={{ color: "green", textAlign: "center", fontWeight: "bold", mb: 2 }}>
                    ✅ {updateSuccessMessage}
                </Typography>
            )}

            <Paper 
                sx={{ 
                    padding: "20px", 
                    borderRadius: "12px", 
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                }}
>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontFamily: "'Poppins', sans-serif" }}>
                        📅 Trip Duration: {itinerary.startDate} to {itinerary.endDate}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", color: "#555" }}>
                        👥 Travelers: {itinerary.numPersons} | 🎒 Type: {itinerary.tripType} | 💰 Budget: ₹{itinerary.budget}
                    </Typography>
                </Box>

                {/* Right-aligned button */}
                <Button
                    variant="outlined"
                    onClick={handleShowBookings}
                    sx={{
                        whiteSpace: "nowrap",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        borderWidth: "2px",
                        borderColor: "#2a9d8f",
                        color: "#2a9d8f",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        textTransform: "none",
                        transition: "all 0.5s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#2a9d8f",
                            color: "#fff",
                            // boxShadow: "0px 4px 10px rgba(42, 157, 143, 0.5)",
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    Show Booking Details 👀
                </Button>
            </Paper>

            {/* Day-Wise Itinerary with Bookings */}
            <Paper sx={{ padding: "20px", mt: 3, borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#ff9800" }}>
                    📌 Day-Wise Plan
                </Typography>

                {itinerary.days && itinerary.days.length > 0 ? (
                    <List>
                        {itinerary.days.map((day, index) => {
                            // Calculate date for this day
                            const dayDate = dayjs(itinerary.startDate).add(index, "day").format("YYYY-MM-DD");

                            return (
                                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                    <ListItem
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "15px",
                                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                                            borderRadius: "10px",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {/* Left: Day Activities */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#444", fontFamily: "'Raleway', sans-serif" }}>
                                                📅 Day {index + 1}
                                            </Typography>
                                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                                                {day.activities.join(", ")}
                                            </Typography>
                                        </Box>

                                        {/* Right: Booking Details */}
                                        <Box sx={{ flex: 1, textAlign: "right" }}>
                                            {bookings
                                                .filter((booking) => dayjs(booking.date).isSame(dayDate, "day"))
                                                .map((booking, bIndex) => {
                                                    // Define color coding for booking categories
                                                    const categoryColors = {
                                                        Flight: "#bd632f",
                                                        Train: "#0277bd",
                                                        Hotel: "#4caf50",
                                                        Restaurant: "#d32f2f",
                                                        Activity: "#8e24aa",
                                                    };

                                                    return (
                                                        <Paper
                                                            key={bIndex}
                                                            sx={{
                                                                display: "inline-block",
                                                                padding: "10px 15px",
                                                                borderRadius: "8px",
                                                                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                                                                backgroundColor: categoryColors[booking.category] || "#616161",
                                                                color: "#fff",
                                                                textAlign: "right",
                                                                fontFamily: "'Poppins', sans-serif",
                                                                marginLeft: "10px",
                                                            }}
                                                        >
                                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                                {booking.name}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {booking.category} | {dayjs(booking.date).format("DD MMM, YYYY")} {booking.time ? `| ${booking.time}` : ""}
                                                            </Typography>
                                                        </Paper>
                                                    );
                                                })}
                                        </Box>
                                    </ListItem>
                                </motion.div>
                            );
                        })}
                    </List>
                ) : (
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "gray", textAlign: "center" }}>
                        🚀 No detailed itinerary available. Plan your adventure!
                    </Typography>
                )}
            </Paper>

            {/* Add Booking Button - Right Aligned */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#ffa726", fontWeight: "bold", fontSize: "1.5rem", "&:hover": { backgroundColor: "#ff8000" } }}
                    onClick={handleAddBooking}
                >
                    ➕ Add Booking
                </Button>
            </Box>

            {/* Buttons Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button variant="contained" sx={{ backgroundColor: "#013a63", fontWeight: "bold", fontSize: "1.1rem", "&:hover": { backgroundColor: "#61a5c2" } }} onClick={() => setOpenUpdateDialog(true)}>
                    ✏️ Update Itinerary
                </Button>

                <Button variant="contained" sx={{ backgroundColor: "#590d22", fontWeight: "bold", fontSize: "1.1rem", "&:hover": { backgroundColor: "#c9184a" } }} onClick={() => setOpenDeleteDialog(true)}>
                    ❌ Delete Itinerary
                </Button>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>⚠️ Are you sure you want to delete?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#777", fontSize: "0.9rem" }}>
                        This action is irreversible and will delete the itinerary and its related booking details.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" sx={{ borderColor: "#023e8a", fontWeight: "bold", "&:hover": { backgroundColor: "#669bbc", color: "#fff" } }} onClick={() => setOpenDeleteDialog(false)}>Discard</Button>
                    <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }}  onClick={handleDeleteItinerary}>Accept</Button>
                </DialogActions>
            </Dialog>

            {/* Update Itinerary Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
                <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>✏️ Update Itinerary</DialogTitle>
                <DialogContent>
                    <TextField label="Destination" value={itinerary.destination} disabled fullWidth margin="dense" onClick={() => alert("Cannot be edited")} />
                    <TextField label="Start Date" value={itinerary.startDate} disabled fullWidth margin="dense" onClick={() => alert("Cannot be edited")} />
                    <TextField label="End Date" value={itinerary.endDate} disabled fullWidth margin="dense" onClick={() => alert("Cannot be edited")} />
                    <TextField label="Number of Persons" type="number" value={numPersons} onChange={e => setNumPersons(e.target.value)} fullWidth margin="dense" />
                    <TextField label="Budget (₹)" type="number" value={budget} onChange={e => setBudget(e.target.value)} fullWidth margin="dense" />
                    <TextField select label="Type of Trip" value={tripType} onChange={e => setTripType(e.target.value)} fullWidth margin="dense">
                        <MenuItem value="Solo">Solo</MenuItem>
                        <MenuItem value="Family">Family</MenuItem>
                        <MenuItem value="Friends">Friends</MenuItem>
                        <MenuItem value="Adventure">Adventure</MenuItem>
                        <MenuItem value="Road">Road</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }} onClick={() => setOpenUpdateDialog(false)} color="error">Cancel</Button>
                    <Button variant="outlined" sx={{ borderColor: "#588157", fontWeight: "bold", "&:hover": { backgroundColor: "#52b788", color: "#fff" } }} onClick={handleUpdateItinerary} color="success">Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for "Add Booking" options */}
            <Dialog open={openAddBookingDialog} onClose={() => setOpenAddBookingDialog(false)}>
                <DialogTitle variant="h5" >➕ Add a Booking</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: "1.1rem" }}>
                        Do you already have a booking, or would you like us to suggest options for you?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" sx={{ borderColor: "#003049", fontWeight: "bold", "&:hover": { backgroundColor: "#669bbc", color: "#fff" } }} onClick={() => navigate(`/bookings/existing/${itineraryId}`)} color="primary">
                        Enter Existing Booking
                    </Button>
                    <Button variant="outlined" sx={{ borderColor: "#3c096c", fontWeight: "bold", "&:hover": { backgroundColor: "#957fef", color: "#fff" } }} onClick={() => navigate(`/bookings/new/${itineraryId}`)} color="secondary">
                        Find a Booking
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for No Active Bookings Error */}
            <Dialog open={openBookingErrorDialog} onClose={() => setOpenBookingErrorDialog(false)}>
                <DialogTitle>No Active Bookings Found</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        There are no active bookings for this trip. Please add a booking to view details.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => setOpenBookingErrorDialog(false)} color="primary">
                        Okay
                    </Button> */}
                    <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }}onClick={() => setOpenBookingErrorDialog(false)} color="error">Okay</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ItineraryDetails;

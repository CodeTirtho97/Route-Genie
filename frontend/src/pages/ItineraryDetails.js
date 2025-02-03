import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import {
    Box, Typography, Paper, Button, CircularProgress, List, ListItem, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem
} from "@mui/material";
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
        <Box sx={{ padding: "50px 10%" }}>
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

            <Paper sx={{ padding: "20px", borderRadius: "12px", boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "'Poppins', sans-serif" }}>
                    📅 Trip Duration: {itinerary.startDate} to {itinerary.endDate}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", color: "#555" }}>
                    👥 Travelers: {itinerary.numPersons} | 🎒 Type: {itinerary.tripType} | 💰 Budget: ₹{itinerary.budget}
                </Typography>
            </Paper>

            {/* Day-Wise Itinerary with Bookings */}
            <Paper sx={{ padding: "20px", mt: 3, borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#ff9800" }}>
                    📌 Day-Wise Plan
                </Typography>

                {itinerary.days && itinerary.days.length > 0 ? (
                    <List>
                        {itinerary.days.map((day, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                <ListItem>
                                    <ListItemText
                                        primary={<Typography variant="h6" sx={{ fontWeight: "bold", color: "#444" }}>📅 {day.title}</Typography>}
                                        secondary={<Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>{day.activities.join(", ")}</Typography>}
                                    />
                                </ListItem>

                                {/* Show Bookings for this Day */}
                                {bookings
                                    .filter(booking => booking.day === index + 1)
                                    .map((booking, bIndex) => (
                                        <ListItem key={bIndex} sx={{ pl: 4 }}>
                                            <ListItemText
                                                primary={<Typography sx={{ fontWeight: "bold", color: "#388e3c" }}>✅ {booking.activity}</Typography>}
                                                secondary={`⏰ Time: ${booking.time} | 💰 Price: ₹${booking.price}`}
                                            />
                                        </ListItem>
                                    ))}

                                <Divider />
                            </motion.div>
                        ))}
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
                    onClick={() => navigate(`/bookings/new?itineraryId=${itineraryId}`)}
                >
                    ➕ Add Booking
                </Button>
            </Box>

            {/* Buttons Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button variant="contained" sx={{ backgroundColor: "#1976d2", fontWeight: "bold", "&:hover": { backgroundColor: "#1257a3" } }} onClick={() => setOpenUpdateDialog(true)}>
                    ✏️ Update Itinerary
                </Button>

                <Button variant="contained" sx={{ backgroundColor: "#d32f2f", fontWeight: "bold", "&:hover": { backgroundColor: "#b71c1c" } }} onClick={() => setOpenDeleteDialog(true)}>
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
                    <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }}onClick={() => setOpenUpdateDialog(false)} color="error">Cancel</Button>
                    <Button variant="outlined" sx={{ borderColor: "#588157", fontWeight: "bold", "&:hover": { backgroundColor: "#52b788", color: "#fff" } }} onClick={handleUpdateItinerary} color="success">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ItineraryDetails;

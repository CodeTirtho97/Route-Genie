import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box, Typography, Button, Grid, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import API from "../utils/api";

const BookingDetails = () => {
    const { itineraryId } = useParams();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [sortType, setSortType] = useState("departureDateTime");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterType, setFilterType] = useState("");

    // Add Booking Modal
    const [openAddBookingDialog, setOpenAddBookingDialog] = useState(false);
    
    // Edit Booking Modal
    const [editBookingOpen, setEditBookingOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    
    // Delete Booking Modal
    const [deleteBookingOpen, setDeleteBookingOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get(`/bookings?itineraryId=${itineraryId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // ✅ Correctly format date & time
                const formattedBookings = data.map(booking => ({
                    ...booking,
                    formattedDate: dayjs(booking.date).isValid()
                        ? dayjs(booking.date).format("DD MMM YYYY")
                        : "Invalid Date",
                    formattedTime: booking.time && dayjs(`${booking.date.split("T")[0]}T${booking.time}`, "YYYY-MM-DDTHH:mm", true).isValid()
                        ? dayjs(`${booking.date.split("T")[0]}T${booking.time}`).format("hh:mm A")
                        : "No Time Set"
                }));

                setBookings(formattedBookings);
                setFilteredBookings(formattedBookings);
                setTotalSpent(data.reduce((sum, booking) => sum + booking.price, 0));
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [itineraryId]);

    const handleAddBooking = () => {
        setOpenAddBookingDialog(true);
    };

    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.put(`/bookings/${selectedBooking._id}`, selectedBooking, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            setEditBookingOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };    
    
    const confirmDeleteBooking = async () => {
        try {
            if (!bookingToDelete || !bookingToDelete._id) {
                console.error("No booking selected for deletion");
                return;
            }
    
            console.log("Deleting booking ID:", bookingToDelete._id);
    
            const token = localStorage.getItem("token");
            const response = await API.delete(`/bookings/${bookingToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Delete Response:", response);
    
            if (response.status === 200) {
                setDeleteBookingOpen(false);
                window.location.reload();
            } else {
                console.error("Error: Unexpected response", response);
            }
        } catch (error) {
            console.error("Error deleting booking:", error.response ? error.response.data : error.message);
        }
    };
    
    

    // ✅ Function to sort bookings correctly
    const handleSort = (type) => {
        setSortType(type);
        let sortedBookings = [...filteredBookings];

        if (type === "price") {
            sortedBookings.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);
        } else if (type === "departureDateTime") {
            sortedBookings.sort((a, b) => {
                const dateTimeA = dayjs(a.date).isValid() && a.time
                    ? dayjs(`${a.date.split("T")[0]}T${a.time}`, "YYYY-MM-DDTHH:mm").unix()
                    : Infinity;
                const dateTimeB = dayjs(b.date).isValid() && b.time
                    ? dayjs(`${b.date.split("T")[0]}T${b.time}`, "YYYY-MM-DDTHH:mm").unix()
                    : Infinity;
                return sortOrder === "asc" ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
            });
        }

        setFilteredBookings(sortedBookings);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        handleSort(sortType);
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilterType(value);
        if (value === "") {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(booking => booking.category === value));
        }
    };

    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setEditBookingOpen(true);
    };

    // Open Delete Booking Modal
    const handleDeleteBooking = (booking) => {
        setBookingToDelete(booking);
        setDeleteBookingOpen(true);
    };

    const categoryColors = {
        "Flight": "#e3f2fd",
        "Train": "#ede7f6",
        "Hotel": "#f1f8e9",
        "Restaurant": "#ffebee",
        "Activity": "#fff3e0",
    };

    return (
        <Box sx={{ padding: "40px 10%", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, fontFamily: "'Raleway', sans-serif", color: "#ff5722" }}>
                    📌 Booking Details
                </Typography>
            </motion.div>

            {/* Actions Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Button
                    variant="outlined"
                    sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.2rem", borderColor: "#023e8a", borderRadius: "8px", "&:hover": { backgroundColor: "#1976d2", color: "#fff" } }}
                    onClick={() => navigate(`/itinerary/${itineraryId}`)}
                >
                    ⬅️ Back to Itinerary
                </Button>

                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2a9d8f" }}>
                    💰 Total Spent: ₹{totalSpent}
                </Typography>
            </Box>

            {/* Sorting & Filtering */}
            <Box sx={{ display: "flex", gap: "20px", mb: 4 }}>
                <FormControl sx={{ width: "200px", backgroundColor: "#fff" }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select label="Sort By" value={sortType} onChange={(e) => handleSort(e.target.value)}>
                        <MenuItem value="departureDateTime">📅 Departure Date & Time</MenuItem>
                        <MenuItem value="price">💵 Price</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#2a9d8f", fontWeight: "bold", borderRadius: "8px" }}
                    onClick={toggleSortOrder}
                >
                    {sortOrder === "asc" ? "⬆️ Ascending" : "⬇️ Descending"}
                </Button>

                <FormControl sx={{ width: "200px", backgroundColor: "#fff" }}>
                    <InputLabel>Filter by Type</InputLabel>
                    <Select label="Filter by Type" value={filterType} onChange={handleFilter}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Flight">✈️ Flight</MenuItem>
                        <MenuItem value="Train">🚆 Train</MenuItem>
                        <MenuItem value="Hotel">🏨 Hotel</MenuItem>
                        <MenuItem value="Restaurant">🍽️ Restaurant</MenuItem>
                        <MenuItem value="Activity">🎭 Activity</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Booking Cards */}
            <Grid container spacing={3}>
                {filteredBookings.map((booking, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card sx={{
                                padding: "20px",
                                borderRadius: "12px",
                                backgroundColor: categoryColors[booking.category] || "#ffffff",
                                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease-in-out"
                            }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>
                                        {booking.category}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", color: "#333" }}>
                                        {booking.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", color: "#555" }}>
                                        📅 {booking.formattedDate} | ⏰ {booking.formattedTime}
                                    </Typography>
                                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#d32f2f" }}>
                                        💰 ₹{booking.price}
                                    </Typography>

                                    {/* Edit & Delete Buttons */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ borderColor: "#013a63", fontWeight: "bold", fontSize: "0.8rem", "&:hover": { backgroundColor: "#61a5c2", color: "#fff" } }}
                                            onClick={() => handleEditBooking(booking)}
                                        >
                                            ✏️ Edit Booking
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{ borderColor: "#590d22", fontWeight: "bold", fontSize: "0.8rem", "&:hover": { backgroundColor: "#c9184a", color: "#fff" } }}
                                            onClick={() => handleDeleteBooking(booking)}
                                        >
                                            ❌ Delete Booking
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Add Booking Button */}
            <Typography sx={{ textAlign: "center", color: "#777", fontSize: "1rem", mb: 2, mt: 6 }}>
                Forgot to include one booking? No worries!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#ff9800", fontWeight: "bold", borderRadius: "8px", fontSize: "1.2rem" }}
                    onClick={() => handleAddBooking(true)}
                >
                    ➕ ADD BOOKING
                </Button>
            </Box>

            {/* Modals for Add, Edit, and Delete Booking are defined below */}
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
                {/* ✅ Edit Booking Modal */}
                <Dialog open={editBookingOpen} onClose={() => setEditBookingOpen(false)} fullWidth>
                    <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>✏️ Edit Booking</DialogTitle>
                    <DialogContent>
                        <Tooltip title="Cannot be edited" arrow>
                            <TextField fullWidth label="Booking Type" sx={{ mb: 2 }} value={selectedBooking?.category} disabled />
                        </Tooltip>

                        <Tooltip title="Cannot be edited" arrow>
                            <TextField fullWidth label="Booking Name" sx={{ mb: 2 }} value={selectedBooking?.name} disabled />
                        </Tooltip>

                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                            value={selectedBooking?.date || ""}
                            onChange={(e) => setSelectedBooking({ ...selectedBooking, date: e.target.value })}
                        />

                        <TextField
                            fullWidth
                            label="Time"
                            type="time"
                            sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                            value={selectedBooking?.time || ""}
                            onChange={(e) => setSelectedBooking({ ...selectedBooking, time: e.target.value })}
                        />

                        <TextField
                            fullWidth
                            label="Price (₹)"
                            type="number"
                            sx={{ mb: 2 }}
                            value={selectedBooking?.price || ""}
                            onChange={(e) => setSelectedBooking({ ...selectedBooking, price: parseInt(e.target.value) || 0 })}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }} onClick={() => setEditBookingOpen(false)} color="error">
                            Cancel
                        </Button>
                        <Button variant="outlined" sx={{ borderColor: "#588157", fontWeight: "bold", "&:hover": { backgroundColor: "#52b788", color: "#fff" } }} onClick={handleEditSave} color="primary" >
                            Accept Changes
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* ✅ Delete Booking Modal */}
                <Dialog open={deleteBookingOpen} onClose={() => setDeleteBookingOpen(false)} fullWidth>
                    <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>⚠️ Are you sure you want to delete?</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ color: "gray", mb: 2 }}>
                            This action is irreversible and will delete the booking details. Your itinerary will not be deleted.
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" sx={{ borderColor: "#023e8a", fontWeight: "bold", "&:hover": { backgroundColor: "#669bbc", color: "#fff" } }} onClick={() => setDeleteBookingOpen(false)} color="primary">
                            Discard
                        </Button>
                        <Button variant="outlined" sx={{ borderColor: "#c1121f", fontWeight: "bold", "&:hover": { backgroundColor: "#ee6055", color: "#fff" } }} onClick={confirmDeleteBooking} color="error">
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>



        </Box>
    );
};

export default BookingDetails;

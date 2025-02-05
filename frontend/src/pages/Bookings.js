import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {
    Box, Typography, Paper, Button, Tabs, Tab, CircularProgress, List, ListItem, ListItemText, Divider, 
    FormControl, InputLabel, Select, MenuItem, TextField, Grid, Card, CardContent, 
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [itineraryMap, setItineraryMap] = useState({});
    const [tabValue, setTabValue] = useState("upcoming"); // "upcoming" or "past"
    const [filterType, setFilterType] = useState(""); // Flight, Hotel, Train, etc.
    const [sortBy, setSortBy] = useState("date"); // Sorting method
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();

    // Filter upcoming and past bookings
    const upcomingBookings = filteredBookings.filter(booking => !booking.isPast);
    const pastBookings = filteredBookings.filter(booking => booking.isPast);

    // Fetch user authentication status
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        setLoading(false); // ✅ Set loading to false after fetching user
    }, []);

    // Fetch bookings only if the user is logged in
    useEffect(() => {
        if (user) {
            API.get("/bookings")
                .then((res) => {
                    const today = dayjs();
                    const categorizedBookings = res.data.map(booking => ({
                        ...booking,
                        formattedDate: dayjs(booking.date).isValid()
                            ? dayjs(booking.date).format("DD MMM YYYY")
                            : "Invalid Date",
                        formattedTime: booking.time && dayjs(`${booking.date.split("T")[0]}T${booking.time}`, "YYYY-MM-DDTHH:mm", true).isValid()
                            ? dayjs(`${booking.date.split("T")[0]}T${booking.time}`).format("hh:mm A")
                            : "No Time Set"
                    }));

                    setBookings(categorizedBookings);
                    setFilteredBookings(categorizedBookings);
                    fetchItineraries(categorizedBookings);
                })
                .catch(() => setBookings([]));
        }
    }, [user]);

    // Fetch Itinerary Names
    const fetchItineraries = async (bookings) => {
        const itineraryIds = [...new Set(bookings.map(b => b.itinerary))]; // Get unique itinerary IDs

        let itineraryMap = {};
        await Promise.all(itineraryIds.map(async (id) => {
            try {
                const res = await API.get(`/itineraries/${id}`);
                itineraryMap[id] = res.data.destination; // Store itinerary name
            } catch (error) {
                console.error(`Error fetching itinerary ${id}:`, error);
                itineraryMap[id] = "Unknown Itinerary"; // Fallback
            }
        }));

        setItineraryMap(itineraryMap);
    };

    // Handle Tab Change (Upcoming vs Past)
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Function to filter bookings dynamically
    const handleFilter = () => {
        let filtered = bookings;

        // Filter by travel type
        if (filterType) {
            filtered = filtered.filter(booking => booking.category === filterType);
        }

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(booking =>
                dayjs(booking.date).isAfter(dayjs(startDate).startOf("day")) &&
                dayjs(booking.date).isBefore(dayjs(endDate).endOf("day"))
            );
        }

        setFilteredBookings(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [filterType, startDate, endDate]);

    const handleSortChange = (sortType) => {
        setSortBy(sortType);
    
        let sortedBookings = [...filteredBookings];
    
        if (sortType === "itinerary-asc") {
            sortedBookings.sort((a, b) => (itineraryMap[a.itinerary] || "Unknown Itinerary").localeCompare(itineraryMap[b.itinerary] || "Unknown Itinerary"));
        } else if (sortType === "itinerary-desc") {
            sortedBookings.sort((a, b) => (itineraryMap[b.itinerary] || "Unknown Itinerary").localeCompare(itineraryMap[a.itinerary] || "Unknown Itinerary"));
        } else if (sortType === "date-asc") {
            sortedBookings.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
        } else if (sortType === "date-desc") {
            sortedBookings.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
        }
    
        setFilteredBookings(sortedBookings);
    };
    

    useEffect(() => {
        if (sortBy) {
            handleSortChange(sortBy);
        }
    }, [itineraryMap]);

    return (
        <Box sx={{ background: "#f3f4f6", minHeight: "100vh", padding: "50px 10%" }}>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "'Mystery Quest', cursive",
                        textAlign: "center",
                        mb: 5,
                        color: "#333",
                        fontSize: "3rem"
                    }}
                >
                    ✈️ Your Travel Bookings
                </Typography>
            </motion.div>
    
            {/* ✅ Show loading spinner while checking authentication */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : user ? (
                <>
                    {/* 🔹 Categorization Tabs (New Design) */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                background: "#fff",
                                borderRadius: "50px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                padding: "5px",
                                width: "250px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                onClick={() => setTabValue("upcoming")}
                                sx={{
                                    flex: 1,
                                    padding: "10px 20px",
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    color: tabValue === "upcoming" ? "#fff" : "#1976d2",
                                    background: tabValue === "upcoming" ? "#1976d2" : "transparent",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        background: tabValue === "upcoming" ? "#1565c0" : "#f0f0f0",
                                    },
                                }}
                            >
                                Upcoming
                            </Button>
                            <Button
                                onClick={() => setTabValue("past")}
                                sx={{
                                    flex: 1,
                                    padding: "10px 20px",
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    color: tabValue === "past" ? "#fff" : "#333",
                                    background: tabValue === "past" ? "#333" : "transparent",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        background: tabValue === "past" ? "#222" : "#f0f0f0",
                                    },
                                }}
                            >
                                Past
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 4,
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Travel Type Filter */}
                        <FormControl sx={{ width: "200px" }}>
                            <InputLabel>Filter by Type</InputLabel>
                            <Select label="Filter by Type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Flight">✈️ Flight</MenuItem>
                                <MenuItem value="Train">🚆 Train</MenuItem>
                                <MenuItem value="Hotel">🏨 Hotel</MenuItem>
                                <MenuItem value="Activity">🎡 Activity</MenuItem>
                                <MenuItem value="Restaurant">🍽️ Restaurant</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "220px" }}>
                            <InputLabel>Sort by</InputLabel>
                            <Select label="Sort by" value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="itinerary-asc">📖 Itinerary Name (A → Z)</MenuItem>
                                <MenuItem value="itinerary-desc">📖 Itinerary Name (Z → A)</MenuItem>
                                <MenuItem value="date-asc">📅 Departure Date (Earliest First)</MenuItem>
                                <MenuItem value="date-desc">📅 Departure Date (Latest First)</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Date Range Filter */}
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                renderInput={(params) => <TextField {...params} sx={{ width: "180px" }} />}
                            />

                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                renderInput={(params) => <TextField {...params} sx={{ width: "180px" }} />}
                            />
                        </LocalizationProvider> */}
                    </Box>

                    {/* ✅ Show message if there are no upcoming or past bookings */}
                    {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
                        <Typography variant="h5" sx={{ textAlign: "center", fontFamily: "'Poppins', sans-serif", mt: 5, color: "#777" }}>
                            🚀 No bookings yet! Start planning your next trip now.
                        </Typography>
                    ) : (
                        <>
                            {/* ✅ Show message if the selected tab has no bookings */}
                            {tabValue === "upcoming" && upcomingBookings.length === 0 ? (
                                <Typography variant="h5" sx={{ textAlign: "center", fontFamily: "'Poppins', sans-serif", mt: 5, color: "#777" }}>
                                    📅 No upcoming bookings. Plan your next journey today!
                                </Typography>
                            ) : tabValue === "past" && pastBookings.length === 0 ? (
                                <Typography variant="h5" sx={{ textAlign: "center", fontFamily: "'Poppins', sans-serif", mt: 5, color: "#777" }}>
                                    🕰️ No past bookings. Your travel history will appear here!
                                </Typography>
                            ) : (
                                <Grid container spacing={3} sx={{ mt: 3 }}>
                                    {filteredBookings
                                        .filter(booking => (tabValue === "upcoming" ? !booking.isPast : booking.isPast))
                                        .map((booking, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                                    <Card
                                                        sx={{
                                                            padding: "20px",
                                                            borderRadius: "16px",
                                                            backgroundColor:
                                                                booking.category === "Flight"
                                                                    ? "#e3f2fd"
                                                                    : booking.category === "Hotel"
                                                                    ? "#e8f5e9"
                                                                    : booking.category === "Train"
                                                                    ? "#ede7f6"
                                                                    : booking.category === "Restaurant"
                                                                    ? "#ffebee"
                                                                    : "#f3e5f5",
                                                            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                                                            transition: "transform 0.3s",
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ fontWeight: "bold", color: "#555", fontFamily: "'Raleway', sans-serif" }}
                                                            >
                                                                {booking.category}
                                                            </Typography>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", color: "#333" }}
                                                            >
                                                                {booking.name}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: "1.2rem", color: "#555" }}>
                                                                📅 {booking.formattedDate} | ⏰ {booking.formattedTime}
                                                            </Typography>

                                                            {/* Itinerary Name */}
                                                            <Box sx={{ mt: 2, p: 1, backgroundColor: "#FFF5E1", borderRadius: "8px", textAlign: "center" }}>
                                                                <Typography sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                                                                    📖 Itinerary: {itineraryMap[booking.itinerary] || "Loading..."}
                                                                </Typography>
                                                            </Box>

                                                            {/* See Details Button */}
                                                            <Button
                                                                variant="outlined"
                                                                sx={{
                                                                    mt: 3,
                                                                    backgroundColor: "#fcefb4",
                                                                    borderColor: "#ff7b00",
                                                                    fontWeight: "bold",
                                                                    width: "100%",
                                                                    "&:hover": { backgroundColor: "#ff8c00", color: "#fff" },
                                                                }}
                                                                onClick={() => navigate(`/bookings/details/${booking.itinerary}`)}
                                                            >
                                                                🔍 See Related Bookings
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                </Grid>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    {/* ✅ If user is NOT logged in, show login prompt */}
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Paper
                            sx={{
                                padding: "30px",
                                background: "#ff9800",
                                borderRadius: "12px",
                                textAlign: "center",
                                color: "#fff",
                                mb: 5
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                                🔒 Log in to View Your Bookings!
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 1,
                                    mb: 3,
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "1.2rem"
                                }}
                            >
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
                                    "&:hover": { backgroundColor: "#fff3e0" }
                                }}
                                onClick={() => navigate("/login")}
                            >
                                🔑 LOGIN NOW
                            </Button>
                        </Paper>
                    </motion.div>
    
                    {/* Sample Booking for John Doe */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                        <Paper
                            sx={{
                                padding: "30px",
                                background: "#ffffff",
                                borderRadius: "12px",
                                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                                mb: 5
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#ff9800",
                                    textAlign: "center",
                                    mb: 2,
                                    fontFamily: "'Raleway', sans-serif"
                                }}
                            >
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
                                    }
                                ].map((item, index) => (
                                    <motion.div whileHover={{ scale: 1.02 }} key={index}>
                                        <ListItem>
                                            <ListItemText primary={<Typography variant="h5" sx={{ fontWeight: "bold" }}>{item.icon} {item.title}</Typography>} secondary={<Typography>{item.detail}</Typography>} />
                                        </ListItem>
                                        <Typography>{item.extra}</Typography>
                                        <Divider />
                                    </motion.div>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                </>
            )}
        </Box>
    );
};    

export default Bookings;

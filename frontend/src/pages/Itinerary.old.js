import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {
    Box, Typography, Paper, Button, TextField, CircularProgress, MenuItem, Select, Grid, List, ListItem, ListItemText, Divider, FormControl, InputLabel
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {
    const [user, setUser] = useState(null);
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numPersons, setNumPersons] = useState("");
    const [tripType, setTripType] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedItinerary, setGeneratedItinerary] = useState(null);
    const [itineraries, setItineraries] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [newItineraryId, setNewItineraryId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleGenerateItinerary = async () => {
        if (!destination || !startDate || !endDate || !numPersons || !tripType || !budget) {
            return alert("Please fill all fields.");
        }
    
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authorization token found!");
                return;
            }
    
            const itineraryData = {
                destination,
                startDate: dayjs(startDate).format("YYYY-MM-DD"),
                endDate: dayjs(endDate).format("YYYY-MM-DD"),
                numPersons,
                tripType,
                budget
            };
    
            // ✅ Generate the itinerary first (to get the `days` array)
            const generatedResponse = await API.post("/itineraries/generate-itinerary", itineraryData, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            const generatedItinerary = generatedResponse.data;
    
            // ✅ Save the full itinerary (including `days`) to the DB
            const { data } = await API.post("/itineraries", { ...generatedItinerary }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // ✅ Show success message and save itinerary ID
            setSuccessMessage("Itinerary successfully created!");
            setNewItineraryId(data._id);
    
            // ✅ Reset form fields
            setDestination("");
            setStartDate(null);
            setEndDate(null);
            setNumPersons("");
            setTripType("");
            setBudget("");
    
            // ✅ Refresh saved itineraries list
            fetchSavedItineraries();
    
            // ✅ Auto-hide the success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch (error) {
            console.error("Failed to generate itinerary:", error);
            alert("Error: " + error.response?.data?.msg || "Something went wrong!");
        }
    
        setLoading(false);
    };
    
    

    const fetchSavedItineraries = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.get("/itineraries", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItineraries(data);
        } catch (error) {
            console.error("Error fetching itineraries", error);
        }
    };
    
    useEffect(() => {
        fetchSavedItineraries();
    }, []);

    return (
        <Box sx={{ background: "#f3f4f6", minHeight: "100vh", padding: "50px 10%" }}>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <Typography variant="h1" sx={{ fontWeight: "bold", fontFamily: "'Mystery Quest', cursive", textAlign: "center", mb: 5, color: "#333", fontSize: "3rem" }}>
                    🧞 Your Magical Travel Itinerary
                </Typography>
            </motion.div>

            {/* If user is NOT logged in, show Login prompt */}
            {!user ? (
                <>
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Paper sx={{ padding: "30px", background: "#ff9800", borderRadius: "12px", textAlign: "center", color: "#fff", mb: 5, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                                🔒 Unlock Your Personalized Itinerary!
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem" }}>
                                Your dream trips are waiting! Sign in now and let <strong>RouteGenie</strong> craft your perfect adventure.
                            </Typography>
                            <Button variant="contained" sx={{ backgroundColor: "#ffffff", color: "#ff5722", fontWeight: "bold", fontSize: "1.2rem", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)", backgroundColor: "#fff3e0" } }} onClick={() => navigate("/login")}>
                                🔑 LOGIN NOW
                            </Button>
                        </Paper>
                    </motion.div>

                    {/* Sample Itinerary (John Doe's Trip) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper sx={{ padding: "30px", background: "#ffffff", borderRadius: "12px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)", mb: 5 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", textAlign: "center", mb: 2, fontFamily: "'Raleway', sans-serif" }}>
                                🌍 Sample Itinerary: John Doe's Dream Trip
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontFamily: "'Poppins', sans-serif" }}>
                                📍 <strong>Bali, Indonesia</strong> (April 10 - April 18)
                            </Typography>

                            {/* Day-wise itinerary */}
                            <List sx={{ background: "#fafafa", borderRadius: "10px", padding: "20px" }}>
                                {[
                                    { day: "🛬 Day 1", title: "Arrival in Bali", desc: "Check into a luxury beach resort, relax, and explore local markets." },
                                    { day: "🏄‍♂️ Day 2", title: "Water Sports", desc: "Try surfing, jet skiing, and banana boat rides at Kuta Beach." },
                                    { day: "🌿 Day 3", title: "Ubud Exploration", desc: "Visit the Sacred Monkey Forest, Ubud Palace, and local art villages." },
                                    { day: "🌋 Day 4", title: "Volcano & Hot Springs", desc: "Trek up Mount Batur to catch a sunrise view, followed by a relaxing dip in natural hot springs." },
                                    { day: "🏝️ Day 5", title: "Nusa Penida Island", desc: "Take a boat tour to stunning cliffs and beaches of Nusa Penida." }
                                ].map((item, index) => (
                                    <motion.div whileHover={{ scale: 1.02 }} key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={<Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>{item.day}: {item.title}</Typography>}
                                                secondary={<Typography sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>{item.desc}</Typography>}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </motion.div>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>

                    {/* Step-by-Step Guide to Creating an Itinerary */}
                    <Paper sx={{ padding: "30px", background: "#ffffff", borderRadius: "12px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", textAlign: "center", mb: 2, fontFamily: "'Raleway', sans-serif" }}>
                            ✨ How to Create Your Dream Itinerary?
                        </Typography>
                        <List sx={{ fontFamily: "'Borel', sans-serif", fontSize: "1.2rem" }}>
                            <ListItem>
                                ✅ Step 1: Enter your destination & travel dates.
                            </ListItem>
                            <ListItem>
                                ✅ Step 2: Pick must-visit spots & activities.
                            </ListItem>
                            <ListItem>
                                ✅ Step 3: RouteGenie crafts the "perfect" itinerary for you! 🧞‍♂️
                            </ListItem>
                        </List>
                    </Paper>
                </>
            ) : (
                <>
                    {/* New Itinerary Form */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                        <Paper sx={{ padding: "40px", background: "#ffffff", borderRadius: "12px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)", mb: 5 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", textAlign: "center", mb: 3, fontFamily: "'Raleway', sans-serif" }}>
                                ✍️ Create a New Itinerary
                            </Typography>

                            <TextField fullWidth label="Destination" variant="outlined" sx={{ mb: 3 }} value={destination} onChange={(e) => setDestination(e.target.value)} />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={6}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
                                    />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
                                    />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Number of Persons" type="number" variant="outlined" value={numPersons} onChange={(e) => setNumPersons(e.target.value)} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Budget (₹)" type="number" variant="outlined" value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </Grid>
                            </Grid>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Type of Trip</InputLabel>
                                <Select label="Type of Trip" value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Solo">Solo</MenuItem>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Family">Family</MenuItem>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Friends">Friends</MenuItem>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Adventure">Adventure</MenuItem>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Road">Road</MenuItem>
                                    <MenuItem sx={{ "&:hover": { backgroundColor: "#83c5be" }}} value="Business">Business</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="contained" fullWidth sx={{ backgroundColor: "# ", fontWeight: "bold", fontSize: "1.2rem", "&:hover": { backgroundColor: "#ff5722" } }} onClick={handleGenerateItinerary}>
                                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "CREATE NEW ITINERARY"}
                            </Button>
                        </Paper>
                        {/* Message Below Form */}
                        <Box sx={{ textAlign: "center", mt: 5 }}>
                        {itineraries.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: "center",
                                        color: "#666",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "1.5rem",
                                        mt: 4,
                                    }}
                                >
                                    ✨ Your saved itineraries will be displayed here once added!
                                </Typography>
                            </motion.div>
                        )}
                        </Box>
                    </motion.div>
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper
                                sx={{
                                    padding: "15px",
                                    background: "#e8f5e9",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 3,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#2e7d32", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
                                >
                                    ✅ {successMessage}
                                </Typography>

                                {/* View Itinerary Button */}
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#4caf50",
                                        fontWeight: "bold",
                                        padding: "8px 15px",
                                        textTransform: "none",
                                        "&:hover": { backgroundColor: "#388e3c" },
                                    }}
                                    onClick={() => navigate(`/itinerary/${newItineraryId}`)}
                                >
                                    View Itinerary
                                </Button>
                            </Paper>
                        </motion.div>
                    )}
                    {/* Display Itineraries if Available */}
                    {itineraries.length > 0 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <Paper
                                sx={{
                                    padding: "25px",
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                                    mt: 4,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        mb: 3,
                                        fontFamily: "'Raleway', sans-serif",
                                        color: "#333",
                                    }}
                                >
                                    📌 <span style={{ color: "#e63946" }}>Saved Itineraries</span>
                                </Typography>

                                {/* Iterate Over Each Itinerary */}
                                {itineraries.map((itinerary, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Paper
                                            sx={{
                                                padding: "15px",
                                                background: "#f9f9f9",
                                                borderRadius: "8px",
                                                mb: 2,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                transition: "0.3s",
                                                "&:hover": { transform: "scale(1.02)", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" },
                                            }}
                                        >
                                            {/* Left Side - Itinerary Text */}
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "'Poppins', sans-serif",
                                                    color: "#1d3557",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                📍 {itinerary.destination} 
                                                <span style={{ fontSize: "1rem", color: "#666" }}>
                                                    ({itinerary.startDate} - {itinerary.endDate})
                                                </span>
                                            </Typography>

                                            {/* Right Side - View Details Button */}
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#2a9d8f",
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    padding: "8px 15px",
                                                    textTransform: "none",
                                                    transition: "transform 0.2s",
                                                    "&:hover": { backgroundColor: "#ff5722", transform: "scale(1.05)" },
                                                }}
                                                onClick={() => navigate(`/itinerary/${itinerary._id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </Paper>
                                    </motion.div>
                                ))}
                            </Paper>
                        </motion.div>
                    )}
                </>
            )}
        </Box>
    );
};

export default Itinerary;

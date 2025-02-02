import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {
    Box, Typography, Paper, Button, TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl, Grid
} from "@mui/material";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [user, setUser] = useState(null);
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numPersons, setNumPersons] = useState("");
    const [tripType, setTripType] = useState("");
    const [budget, setBudget] = useState("");
    const [travelMode, setTravelMode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    useEffect(() => {
        if (user) {
            API.get("/itineraries")
                .then((res) => setItineraries(res.data))
                .catch(() => setItineraries([]));
        }
    }, [user]);

    const handleCreateItinerary = async () => {
        if (!destination || !startDate || !endDate || !numPersons || !tripType || !budget || !travelMode) {
            return alert("Please fill all fields.");
        }
        setLoading(true);
        try {
            const { data } = await API.post("/itineraries", {
                destination,
                startDate: dayjs(startDate).format("YYYY-MM-DD"),
                endDate: dayjs(endDate).format("YYYY-MM-DD"),
                numPersons,
                tripType,
                budget,
                travelMode
            });
            setItineraries([...itineraries, data]);
            setDestination("");
            setStartDate(null);
            setEndDate(null);
            setNumPersons("");
            setTripType("");
            setBudget("");
            setTravelMode("");
        } catch (error) {
            console.error("Failed to create itinerary", error);
        }
        setLoading(false);
    };

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
                                        <DatePicker fullWidth label="Start Date" value={startDate} onChange={(date) => setStartDate(date)} renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DatePicker fullWidth label="End Date" value={endDate} onChange={(date) => setEndDate(date)} renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />} />
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
                                <Select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                    <MenuItem value="Solo">Solo</MenuItem>
                                    <MenuItem value="Family">Family</MenuItem>
                                    <MenuItem value="Friends">Friends</MenuItem>
                                    <MenuItem value="Adventure">Adventure</MenuItem>
                                    <MenuItem value="Road">Road</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="contained" fullWidth sx={{ backgroundColor: "#ff9800", fontWeight: "bold", "&:hover": { backgroundColor: "#ff5722" } }} onClick={handleCreateItinerary}>
                                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "CREATE ITINERARY"}
                            </Button>

                            {/* 📝 Message Below Form */}
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: "center",
                                    mt: 5,
                                    color: "#666",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "1.5rem",
                                }}
                            >
                                ✨ Your saved itineraries will be displayed here once added!
                            </Typography>
                        </Paper>
                    </motion.div>
                </>
            )}
        </Box>
    );
};

export default Itinerary;

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { faTrash, faEdit, faPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Itinerary = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const sampleItinerary = {
    destination: "Bali, Indonesia",
    duration: "April 10 - April 18",
    details: [
      {
        day: 1,
        title: "Arrival & Beachside Relaxation",
        activities: ["Check-in at The Mulia Resort", "Relax at Nusa Dua Beach", "Enjoy Balinese Dinner by the Shore"],
      },
      {
        day: 2,
        title: "Cultural Exploration & Adventure",
        activities: ["Visit Uluwatu Temple", "Watch Kecak Fire Dance", "Explore Ubud’s Monkey Forest"],
      },
      {
        day: 3,
        title: "Island Adventures & Water Sports",
        activities: ["Snorkeling at Blue Lagoon", "Banana Boat Ride at Tanjung Benoa", "Sunset Cruise with Dinner"],
      },
      {
        day: 4,
        title: "Mountain Escape & Coffee Plantations",
        activities: ["Visit Mount Batur", "Explore Coffee Plantations", "Hot Springs Relaxation"],
      },
    ],
  };

  return (
    <Box sx={{ background: "#f3f4f6", minHeight: "100vh", padding: "50px 10%" }}>
      {/* Page Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontFamily: "'Mystery Quest', cursive",
          textAlign: "center",
          mb: 5,
          color: "#333",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        🧞 Your Magical Travel Itinerary
      </Typography>

      {/* Login Section (Only if Not Logged In) */}
      {!isAuthenticated && (
        <Paper
          sx={{
            padding: "30px",
            background: "linear-gradient(to right, #ff9800, #ff7043)",
            borderRadius: "12px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="h4" sx={{ fontFamily: "'Raleway', sans-serif", mb: 2 }}>
            🔒 Unlock Your Personalized Itinerary!
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", mb: 2 }}>
                Your dream trips are waiting! Sign in now and let <strong>RouteGenie</strong> craft your perfect adventure.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#ffffff",
              color: "#ff5722",
              "&:hover": { backgroundColor: "#f1f1f1" },
              fontWeight: "bold",
              padding: "15px 30px",
              fontSize: "18px",
            }}
            onClick={() => navigate("/login")}
          >
            <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: "8px" }} />
            Login Now
          </Button>
        </Paper>
      )}

      {/* Itinerary Section */}
      <Paper sx={{ padding: "40px", background: "#ffffff", borderRadius: "12px", marginTop: "40px" }}>
        <Typography variant="h3" sx={{ color: "#ff9800", mb: 3, fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
          🌍 Sample Itinerary: {sampleItinerary.destination}
        </Typography>
        <Typography variant="h5" sx={{ color: "#333", mb: 3 }}>
          📅 {sampleItinerary.duration}
        </Typography>

        {sampleItinerary.details.map((day, index) => (
          <Paper key={index} sx={{ padding: "20px", background: "#f7f7f7", borderRadius: "10px", mb: 3 }}>
            <Typography variant="h5" sx={{ color: "#ff7043", fontWeight: "bold", fontFamily: "'Itim', cursive" }}>
              ✨ Day {day.day}: {day.title}
            </Typography>
            <List>
              {day.activities.map((activity, i) => (
                <ListItem key={i}>
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px", color: "#29b6f6" }} />
                  <ListItemText primary={activity} sx={{ fontFamily: "'Poppins', sans-serif" }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Paper>

      {/* Steps Section */}
      <Paper sx={{ mt: 4, padding: "40px", borderRadius: "12px", background: "#fff" }}>
        <Typography variant="h3" sx={{ color: "#ff9800", mb: 3, fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
          ✨ How to Create Your Dream Itinerary?
        </Typography>
        <List sx={{ textAlign: "left", paddingLeft: "20px" }}>
          <ListItem sx={{ fontFamily: "'Shadows Into Light', serif", fontSize: "30px" }}>
            ✅ Step 1: Enter your destination and travel dates.
          </ListItem>
          <ListItem sx={{ fontFamily: "'Shadows Into Light', serif", fontSize: "30px" }}>
            ✅ Step 2: Pick must-visit spots and activities.
          </ListItem>
          <ListItem sx={{ fontFamily: "'Shadows Into Light', serif", fontSize: "30px" }}>
            ✅ Step 3: RouteGenie crafts the perfect itinerary for you! 🧞‍♂️
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Itinerary;

import React, { useMemo } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  // Select a random background image on each page load
  const randomBg = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 15) + 1; // Picks a number between 1 and 15
    return require(`../assets/hero-bg-${randomNumber}.jpg`);
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${randomBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Overlay Effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />

        {/* Animated Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold", fontFamily: "'Mystery Quest', serif" }}>
              Explore the world with{" "}
              <span style={{ fontFamily: "'Mystery Quest', sans-serif", color: "#ff9800", fontWeight: "bold", fontSize: "6rem" }}>
                RouteGenie
              </span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Typography variant="h4" sx={{ mt: 2, fontFamily: "'Caveat', sans-serif" }}>
              Your personal travel assistant for planning seamless trips.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "#ff9800",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "12px 24px",
                borderRadius: "8px",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#ff5722", transform: "scale(1.1)" },
              }}
              component={Link}
              to="/itinerary"
            >
              Start Planning
            </Button>
          </motion.div>

          {/* Login & Signup Buttons */}
          <Box sx={{ display: "flex", gap: "15px", mt: 4, justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#ff9800",
                color: "#ff9800",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": { backgroundColor: "#ff9800", color: "#fff" },
              }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#ff9800",
                color: "#ff9800",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": { backgroundColor: "#ff9800", color: "#fff" },
              }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ background: "#f3f4f6", padding: "50px 10%" }}>
        {/* Section Title */}
        <Typography
            variant="h3"
            sx={{
            fontWeight: "bold",
            fontFamily: "'Raleway', sans-serif",
            textAlign: "center",
            mb: 5,
            color: "#333",
            }}
        >
            ✨ Why Choose <span style={{ fontWeight: "bold", color: "#ff9800" }}>RouteGenie?</span>
        </Typography>

        {/* Feature Cards */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
            {/* Feature 1 */}
            <motion.div whileHover={{ scale: 1.05 }}>
            <Paper
                sx={{
                maxWidth: "320px",
                textAlign: "center",
                padding: "30px",
                borderRadius: "15px",
                background: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img src={require("../assets/itinerary-icon.png")} alt="Itinerary" style={{ width: "90px", marginBottom: "15px" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800", fontFamily: "'Poppins', sans-serif" }}>
                🗺️ Smart Itinerary Planning
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", fontFamily: "'Poppins', sans-serif" }}>
                Automatically generates a personalized itinerary for your trip, saving you time.
                </Typography>
            </Paper>
            </motion.div>

            {/* Feature 2 */}
            <motion.div whileHover={{ scale: 1.05 }}>
            <Paper
                sx={{
                maxWidth: "320px",
                textAlign: "center",
                padding: "30px",
                borderRadius: "15px",
                background: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img src={require("../assets/booking-icon.png")} alt="Bookings" style={{ width: "90px", marginBottom: "15px" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff7043", fontFamily: "'Poppins', sans-serif" }}>
                📅 All Bookings in One Place
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", fontFamily: "'Poppins', sans-serif" }}>
                Manage your flights, hotels, and experiences seamlessly from a single dashboard.
                </Typography>
            </Paper>
            </motion.div>

            {/* Feature 3 */}
            <motion.div whileHover={{ scale: 1.05 }}>
            <Paper
                sx={{
                maxWidth: "320px",
                textAlign: "center",
                padding: "30px",
                borderRadius: "15px",
                background: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img src={require("../assets/weather-icon.png")} alt="Weather Updates" style={{ width: "90px", marginBottom: "15px" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#29b6f6", fontFamily: "'Poppins', sans-serif" }}>
                ☀️ Live Weather Updates
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", fontFamily: "'Poppins', sans-serif" }}>
                Stay updated with real-time weather forecasts for your travel destinations.
                </Typography>
            </Paper>
            </motion.div>
        </Box>
        </Box>

    </Box>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faPlane, faUtensils, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Bookings = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      type: "Hotel",
      name: "The Grand Palace Hotel",
      date: "March 20 - March 27",
      details: "5-star luxury stay in Paris with Eiffel Tower views.",
    },
    {
      id: 2,
      type: "Flight",
      name: "Emirates - Flight EK203",
      date: "March 19",
      details: "Departure: New York → Paris | Business Class | 10:00 AM",
    },
    {
      id: 3,
      type: "Activity",
      name: "Seine River Dinner Cruise",
      date: "March 22",
      details: "Fine dining with a sunset view of the Paris skyline.",
    },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
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
        ✈️ Your Travel Bookings
      </Typography>

      {/* If Not Logged In */}
      {!isAuthenticated ? (
        <>
          <Paper
            sx={{
              padding: "30px",
              background: "linear-gradient(to right, #ff9800, #ff7043)",
              borderRadius: "12px",
              textAlign: "center",
              color: "#fff",
              mb: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontFamily: "'Raleway', sans-serif", mb: 2 }}>
              🔒 Log in to View Your Bookings!
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "'Itim', sans-serif", mb: 2 }}>
              Your trip details are saved for easy access. Log in to manage and edit your bookings.
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
              🔑 Login Now
            </Button>
          </Paper>

          {/* Sample Bookings for John Doe */}
          <Paper sx={{ padding: "40px", background: "#ffffff", borderRadius: "12px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h4" sx={{ color: "#ff9800", mb: 4, fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
              📖 Sample Bookings: John Doe's Paris Trip
            </Typography>
            <List>
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ListItem
                    sx={{
                      background: "#eeeeee",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      padding: "20px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800" }}>
                          {booking.type === "Hotel" && <FontAwesomeIcon icon={faHotel} style={{ marginRight: "10px" }} />}
                          {booking.type === "Flight" && <FontAwesomeIcon icon={faPlane} style={{ marginRight: "10px" }} />}
                          {booking.type === "Activity" && <FontAwesomeIcon icon={faUtensils} style={{ marginRight: "10px" }} />}
                          {booking.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="h6" sx={{ fontSize: "18px", color: "#555" }}>
                            📆 {booking.date}
                          </Typography>
                          <Typography variant="body1" sx={{ fontSize: "16px", color: "#777" }}>
                            ✨ {booking.details}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Paper>
        </>
      ) : (
        // Actual User's Bookings
        <Paper sx={{ padding: "40px", background: "#ffffff", borderRadius: "12px", marginTop: "40px" }}>
          <Typography variant="h3" sx={{ color: "#ff9800", mb: 4, fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
            📅 Your Upcoming Bookings
          </Typography>
          {bookings.length > 0 ? (
            <List>
              {bookings.map((booking) => (
                <ListItem
                  key={booking.id}
                  sx={{
                    background: "#eeeeee",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    padding: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800" }}>
                        {booking.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="h6" sx={{ fontSize: "18px", color: "#555" }}>
                          📆 {booking.date}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "16px", color: "#777" }}>
                          ✨ {booking.details}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton sx={{ color: "#ff5722" }} onClick={() => handleDelete(booking.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                  <IconButton sx={{ color: "#29b6f6", marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h5" sx={{ color: "#777", fontFamily: "'Caveat', cursive", textAlign: "center" }}>
              ✨ No bookings yet! Start planning now! 🧳
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Bookings;

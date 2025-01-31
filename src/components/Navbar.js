import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faMapMarkedAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import logo from "../assets/logo_1.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ background: "#1a1a2e", padding: "10px 20px" }}>
      <Toolbar>
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <motion.img
            src={logo}
            alt="RouteGenie Logo"
            style={{ height: "50px", marginRight: "10px", filter: "drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.5))" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                color: "#f8f8f8",
                textShadow: "1px 1px 5px rgba(255, 255, 255, 0.3)"
              }}
            >
              RouteGenie
            </Typography>
          </motion.div>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {[
            { label: "Home", icon: faMapMarkedAlt, path: "/" },
            { label: "Itinerary", icon: faPlane, path: "/itinerary" },
            { label: "Bookings", icon: faBars, path: "/bookings" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                sx={{
                  color: "#f8f8f8",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  "&:hover": { color: "#ff9800", transform: "scale(1.1)" }
                }}
                component={Link}
                to={item.path}
              >
                <FontAwesomeIcon icon={item.icon} style={{ marginRight: 8 }} />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton sx={{ color: "#f8f8f8", display: { md: "none" } }} onClick={handleDrawerToggle}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          <List sx={{ width: 200, background: "#1a1a2e", height: "100%" }}>
            {[
              { label: "Home", icon: faMapMarkedAlt, path: "/" },
              { label: "Itinerary", icon: faPlane, path: "/itinerary" },
              { label: "Bookings", icon: faBars, path: "/bookings" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem>
                  <Button
                    fullWidth
                    sx={{
                      color: "#f8f8f8",
                      transition: "0.3s",
                      "&:hover": { background: "#ff9800", transform: "scale(1.1)" }
                    }}
                    component={Link}
                    to={item.path}
                    onClick={handleDrawerToggle}
                  >
                    <FontAwesomeIcon icon={item.icon} style={{ marginRight: 8 }} />
                    {item.label}
                  </Button>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

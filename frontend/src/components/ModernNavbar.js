import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  Map as MapIcon,
  BookOnline as BookingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const ModernNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Itinerary", icon: MapIcon, path: "/itinerary" },
    { label: "Bookings", icon: BookingsIcon, path: "/bookings" },
  ];

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const NavButton = ({ item, mobile = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        component={Link}
        to={item.path}
        onClick={mobile ? handleDrawerToggle : undefined}
        startIcon={<item.icon />}
        sx={{
          color: isActivePage(item.path)
            ? theme.palette.primary.main
            : mobile
            ? "#1e293b"
            : "#64748b",
          fontWeight: isActivePage(item.path) ? 700 : 500,
          fontSize: mobile ? "1rem" : "0.875rem",
          padding: mobile ? "12px 24px" : "8px 16px",
          borderRadius: mobile ? "12px" : "8px",
          textTransform: "none",
          minWidth: mobile ? "100%" : "auto",
          justifyContent: mobile ? "flex-start" : "center",
          background: isActivePage(item.path)
            ? mobile
              ? "rgba(99, 102, 241, 0.1)"
              : "rgba(99, 102, 241, 0.08)"
            : "transparent",
          border:
            isActivePage(item.path) && !mobile
              ? `1px solid ${theme.palette.primary.main}`
              : "1px solid transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            background: isActivePage(item.path)
              ? "rgba(99, 102, 241, 0.15)"
              : "rgba(99, 102, 241, 0.05)",
            transform: "translateY(-1px)",
          },
        }}
      >
        {item.label}
      </Button>
    </motion.div>
  );

  const UserSection = ({ mobile = false }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: mobile ? 2 : 1,
        flexDirection: mobile ? "column" : "row",
        width: mobile ? "100%" : "auto",
      }}
    >
      {user ? (
        <>
          {/* Notifications */}
          <IconButton
            sx={{
              color: "#64748b",
              "&:hover": {
                background: "rgba(99, 102, 241, 0.1)",
                color: theme.palette.primary.main,
              },
            }}
          >
            <Badge badgeContent={2} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: mobile ? "8px 0" : 0,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            {mobile && (
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#1e293b" }}
              >
                {user.name}
              </Typography>
            )}
          </Box>

          {/* Logout Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              variant={mobile ? "outlined" : "text"}
              sx={{
                color: mobile ? theme.palette.primary.main : "#64748b",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: mobile ? "10px 20px" : "6px 12px",
                borderRadius: "8px",
                textTransform: "none",
                minWidth: mobile ? "100%" : "auto",
                borderColor: mobile
                  ? theme.palette.primary.main
                  : "transparent",
                "&:hover": {
                  background: mobile
                    ? "rgba(99, 102, 241, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                  color: mobile ? theme.palette.primary.main : "#ef4444",
                  borderColor: mobile
                    ? theme.palette.primary.main
                    : "transparent",
                },
              }}
            >
              {mobile ? "Logout" : "Logout"}
            </Button>
          </motion.div>
        </>
      ) : (
        // Login/Signup buttons for non-authenticated users
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: mobile ? "column" : "row",
            width: mobile ? "100%" : "auto",
          }}
        >
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "8px 20px",
              borderRadius: "8px",
              textTransform: "none",
              minWidth: mobile ? "100%" : "auto",
              "&:hover": {
                background: "rgba(99, 102, 241, 0.1)",
                borderColor: theme.palette.primary.dark,
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "8px 20px",
              borderRadius: "8px",
              textTransform: "none",
              minWidth: mobile ? "100%" : "auto",
              boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
              "&:hover": {
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.49)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(226, 232, 240, 0.8)"
            : "1px solid rgba(226, 232, 240, 0.4)",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Toolbar
          sx={{
            padding: { xs: "0 16px", md: "0 32px" },
            minHeight: "64px",
          }}
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexGrow: isMobile ? 1 : 0,
                marginRight: isMobile ? 0 : 4,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 2,
                  boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                }}
              >
                <MapIcon sx={{ color: "white", fontSize: "1.5rem" }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.02em",
                }}
              >
                RouteGenie
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  marginLeft: "auto",
                  marginRight: 3,
                }}
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NavButton item={item} />
                  </motion.div>
                ))}
              </Box>
              <UserSection />
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#64748b",
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.1)",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 280,
            background: "#ffffff",
            borderLeft: "1px solid #e2e8f0",
          },
        }}
      >
        <Box sx={{ padding: 3 }}>
          {/* Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
              Navigation
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#64748b",
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.1)",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Items */}
          <List sx={{ padding: 0 }}>
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem sx={{ padding: "4px 0" }}>
                  <NavButton item={item} mobile />
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* User Section */}
          <Box
            sx={{ marginTop: 4, paddingTop: 3, borderTop: "1px solid #e2e8f0" }}
          >
            <UserSection mobile />
          </Box>
        </Box>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Box sx={{ height: "64px" }} />
    </>
  );
};

export default ModernNavbar;

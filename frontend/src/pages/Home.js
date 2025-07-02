import React, { useMemo, useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
  Chip,
  Rating,
  IconButton,
  Badge,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Map as MapIcon,
  CalendarMonth as CalendarIcon,
  BookOnline as BookingIcon,
  TravelExplore as ExploreIcon,
  ArrowForward as ArrowIcon,
  CheckCircle as CheckIcon,
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  LocalActivity as ActivityIcon,
  Lightbulb as TipsIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  AttachMoney as CostIcon,
  WbSunny as WeatherIcon,
  Language as CultureIcon,
  Refresh as RefreshIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

const ModernHome = () => {
  const [user, setUser] = useState(null);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [destinationImages, setDestinationImages] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Select a random background image on each page load
  const randomBg = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    return require(`../assets/hero-bg-${randomNumber}.jpg`);
  }, []);

  // Comprehensive destinations database
  const allDestinations = [
    {
      name: "Bali, Indonesia",
      description:
        "Tropical paradise with stunning beaches, ancient temples, and vibrant culture",
      highlights: [
        "Beautiful beaches",
        "Hindu temples",
        "Rice terraces",
        "Volcano hiking",
      ],
      bestTime: "April - October",
      avgCost: "$50-80/day",
      culture: "Hindu-Balinese",
      weather: "Tropical",
      rating: 4.8,
      searchTerm: "bali indonesia beach temple",
      fallbackImage:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      featured: true,
      travelers: "2.1M",
      continent: "Asia",
    },
    {
      name: "Paris, France",
      description:
        "The City of Light, famous for art, fashion, gastronomy, and culture",
      highlights: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre Dame",
        "Seine River",
      ],
      bestTime: "April - June, Sept - Nov",
      avgCost: "$100-150/day",
      culture: "French",
      weather: "Temperate",
      rating: 4.7,
      searchTerm: "paris france eiffel tower",
      fallbackImage:
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
      featured: false,
      travelers: "3.5M",
      continent: "Europe",
    },
    {
      name: "Tokyo, Japan",
      description:
        "Modern metropolis blending cutting-edge technology with ancient traditions",
      highlights: [
        "Shibuya Crossing",
        "Mount Fuji",
        "Temples",
        "Cherry blossoms",
      ],
      bestTime: "March - May, Sept - Nov",
      avgCost: "$80-120/day",
      culture: "Japanese",
      weather: "Temperate",
      rating: 4.9,
      searchTerm: "tokyo japan shibuya mount fuji",
      fallbackImage:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      featured: true,
      travelers: "1.8M",
      continent: "Asia",
    },
    {
      name: "Goa, India",
      description:
        "Coastal paradise with beautiful beaches, Portuguese heritage, and vibrant nightlife",
      highlights: [
        "Pristine beaches",
        "Portuguese churches",
        "Spice plantations",
        "Night markets",
      ],
      bestTime: "November - February",
      avgCost: "$30-50/day",
      culture: "Indo-Portuguese",
      weather: "Tropical",
      rating: 4.5,
      searchTerm: "goa india beach church",
      fallbackImage:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      featured: false,
      travelers: "890K",
      continent: "Asia",
    },
    {
      name: "Dubai, UAE",
      description:
        "Futuristic city with luxury shopping, ultramodern architecture, and desert adventures",
      highlights: [
        "Burj Khalifa",
        "Desert safari",
        "Luxury malls",
        "Gold souk",
      ],
      bestTime: "November - March",
      avgCost: "$80-120/day",
      culture: "Emirati",
      weather: "Desert",
      rating: 4.6,
      searchTerm: "dubai uae burj khalifa desert",
      fallbackImage:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      featured: true,
      travelers: "1.2M",
      continent: "Asia",
    },
    {
      name: "Santorini, Greece",
      description:
        "Stunning island with white-washed buildings, blue domes, and breathtaking sunsets",
      highlights: [
        "Oia sunset",
        "Blue domes",
        "Volcanic beaches",
        "Wine tasting",
      ],
      bestTime: "April - November",
      avgCost: "$70-100/day",
      culture: "Greek",
      weather: "Mediterranean",
      rating: 4.8,
      searchTerm: "santorini greece oia sunset",
      fallbackImage:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      featured: false,
      travelers: "750K",
      continent: "Europe",
    },
  ];

  // Function to fetch image from Unsplash
  const fetchUnsplashImage = async (searchTerm, fallbackUrl) => {
    try {
      const apiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
      const apiUrl = process.env.REACT_APP_UNSPLASH_API_URL;

      if (!apiKey || !apiUrl) {
        return fallbackUrl;
      }

      const response = await fetch(
        `${apiUrl}?query=${encodeURIComponent(
          searchTerm
        )}&client_id=${apiKey}&per_page=1&orientation=landscape`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.results && result.results.length > 0) {
        return result.results[0].urls.regular;
      } else {
        return fallbackUrl;
      }
    } catch (error) {
      return fallbackUrl;
    }
  };

  // Load all destinations initially
  useEffect(() => {
    const loadDestinations = async () => {
      setFeaturedDestinations(allDestinations);

      // Fetch images for all destinations
      const imagePromises = allDestinations.map(async (dest) => {
        const imageUrl = await fetchUnsplashImage(
          dest.searchTerm,
          dest.fallbackImage
        );
        return { [dest.name]: imageUrl };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, img) => ({ ...acc, ...img }), {});
      setDestinationImages(imageMap);
    };

    loadDestinations();
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(featuredDestinations.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(featuredDestinations.length / 3)) %
        Math.ceil(featuredDestinations.length / 3)
    );
  };

  // Function to scroll to destinations section
  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById("destinations-section");
    if (destinationsSection) {
      destinationsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Application features
  const features = [
    {
      icon: MapIcon,
      title: "Smart Itinerary Planning",
      description:
        "Organize your destinations, plan day-wise activities, and keep track of everything in one convenient place for stress-free travel.",
      color: "#6366f1",
      bgColor: "#eef2ff",
    },
    {
      icon: BookingIcon,
      title: "Centralized Booking Management",
      description:
        "Never lose track of your reservations again. Manage flights, hotels, restaurants, and activities all in one organized dashboard.",
      color: "#10b981",
      bgColor: "#ecfdf5",
    },
    {
      icon: CalendarIcon,
      title: "Day-by-Day Organization",
      description:
        "Break down your trip into manageable daily plans with integrated booking details and activity scheduling for seamless travel.",
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  ];

  // Planning steps for travelers
  const planningSteps = [
    {
      step: "Choose your destination and travel dates",
      icon: LocationIcon,
      color: "#6366f1",
      bgColor: "#eef2ff",
    },
    {
      step: "Generate a personalized itinerary",
      icon: MapIcon,
      color: "#10b981",
      bgColor: "#ecfdf5",
    },
    {
      step: "Add and organize your bookings",
      icon: BookingIcon,
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
    {
      step: "Enjoy your perfectly planned trip",
      icon: ExploreIcon,
      color: "#ef4444",
      bgColor: "#fef2f2",
    },
  ];

  // Travel tips
  const travelTips = [
    {
      icon: ScheduleIcon,
      tip: "Plan your itinerary in advance to get better deals on flights and accommodations",
    },
    {
      icon: TipsIcon,
      tip: "Keep all your booking confirmations organized in one place for easy access",
    },
    {
      icon: CheckIcon,
      tip: "Create day-wise plans to make the most of your travel time",
    },
    {
      icon: ExploreIcon,
      tip: "Track your expenses and stay within budget throughout your journey",
    },
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${randomBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Enhanced overlay with gradient and pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%),
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
        />

        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: "float 20s ease-in-out infinite",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  marginBottom: 4,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <StarIcon sx={{ color: "#fbbf24", fontSize: "1.2rem" }} />
                <Typography
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Your Premium Travel Assistant
                </Typography>
              </Box>
            </motion.div>

            {/* Main Headline */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                marginBottom: 3,
                fontSize: { xs: "2.8rem", md: "4.5rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              Plan Your Dream Trip with{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 900,
                  display: "inline-block",
                  transform: "rotate(-1deg)",
                  textShadow: "none",
                }}
              >
                RouteGenie
              </Box>
            </Typography>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 5,
                  fontWeight: 400,
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  lineHeight: 1.4,
                  maxWidth: "700px",
                  margin: "0 auto 40px",
                  color: "rgba(255, 255, 255, 0.95)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                Your intelligent travel companion for seamless journey planning,
                smart booking management, and unforgettable adventures.
              </Typography>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowIcon />}
                  component={Link}
                  to="/itinerary"
                  sx={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    color: "#1e293b",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    padding: "18px 40px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    border: "2px solid transparent",
                    minWidth: "240px",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 40px rgba(251, 191, 36, 0.6)",
                    },
                  }}
                >
                  Start Planning Your Trip
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ExploreIcon />}
                  onClick={scrollToDestinations}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    color: "white",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    padding: "18px 40px",
                    borderRadius: "15px",
                    borderWidth: "2px",
                    textTransform: "none",
                    backdropFilter: "blur(20px)",
                    background: "rgba(255, 255, 255, 0.1)",
                    minWidth: "240px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderWidth: "2px",
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 40px rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  Explore Destinations
                </Button>
              </Box>
            </motion.div>

            {/* Login/Signup buttons for non-authenticated users */}
            {!user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 2, color: "rgba(255, 255, 255, 0.8)" }}
                >
                  Already have an account?
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      padding: "12px 24px",
                      borderRadius: "10px",
                      textTransform: "none",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    to="/signup"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      padding: "12px 24px",
                      borderRadius: "10px",
                      textTransform: "none",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </Box>

      {/* Enhanced How It Works Section - Flow Design */}
      <Box
        sx={{
          padding: "100px 0",
          background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", marginBottom: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  marginBottom: 3,
                  color: "#1e293b",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                How to Plan Your Perfect Trip
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  fontSize: "1.3rem",
                }}
              >
                Follow this simple journey to transform your travel dreams into
                perfectly organized adventures.
              </Typography>
            </Box>
          </motion.div>

          {/* Flow Journey Design */}
          <Box
            sx={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}
          >
            {/* Background Flow Path */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "4px",
                background:
                  "linear-gradient(90deg, #6366f1 0%, #10b981 35%, #f59e0b 70%, #ef4444 100%)",
                borderRadius: "2px",
                zIndex: 0,
                display: { xs: "none", md: "block" },
              }}
            />

            {/* Animated Flow Dots */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "4px",
                overflow: "hidden",
                zIndex: 1,
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  position: "absolute",
                  animation: "flowAnimation 3s infinite linear",
                }}
              />
            </Box>

            <Grid container spacing={0} alignItems="center">
              {planningSteps.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  md={3}
                  key={index}
                  sx={{ position: "relative", zIndex: 2 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    whileHover={{ y: -15, scale: 1.05 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        position: "relative",
                      }}
                    >
                      {/* Step Circle with Icon */}
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 3,
                          boxShadow: `0 15px 35px ${item.color}40`,
                          position: "relative",
                          transition: "all 0.4s ease",
                          "&:hover": {
                            boxShadow: `0 25px 50px ${item.color}60`,
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -8,
                            left: -8,
                            right: -8,
                            bottom: -8,
                            borderRadius: "50%",
                            background: `conic-gradient(from 0deg, ${item.color}30, transparent, ${item.color}30)`,
                            zIndex: -1,
                            animation: `spin${index} 4s linear infinite`,
                          },
                        }}
                      >
                        <item.icon sx={{ fontSize: "3rem", color: "white" }} />

                        {/* Step Number Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: item.color,
                            fontWeight: 800,
                            fontSize: "1rem",
                            boxShadow: `0 4px 15px ${item.color}30`,
                            border: `2px solid ${item.color}`,
                          }}
                        >
                          {index + 1}
                        </Box>
                      </Box>

                      {/* Arrow Connector (except last item) */}
                      {index < planningSteps.length - 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: { xs: "50%", md: "-15%" },
                            transform: {
                              xs: "translateY(50px) rotate(90deg)",
                              md: "translateY(-50%)",
                            },
                            zIndex: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Box
                              sx={{
                                width: 0,
                                height: 0,
                                borderLeft: "15px solid transparent",
                                borderRight: "15px solid transparent",
                                borderTop: `20px solid ${
                                  planningSteps[index + 1]?.color || "#6366f1"
                                }`,
                                transform: "rotate(-90deg)",
                                filter:
                                  "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                              }}
                            />
                          </motion.div>
                        </Box>
                      )}

                      {/* Step Content */}
                      <Box
                        sx={{
                          textAlign: "center",
                          background: `linear-gradient(145deg, ${item.bgColor} 0%, white 100%)`,
                          borderRadius: "20px",
                          padding: "24px 20px",
                          border: `2px solid ${item.color}20`,
                          maxWidth: 280,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            border: `2px solid ${item.color}40`,
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#1e293b",
                            lineHeight: 1.4,
                            fontSize: "1.1rem",
                            marginBottom: 2,
                          }}
                        >
                          {item.step}
                        </Typography>

                        {/* Progress Indicator */}
                        <Box
                          sx={{
                            width: "100%",
                            height: "4px",
                            background: "#e2e8f0",
                            borderRadius: "2px",
                            overflow: "hidden",
                            marginTop: 2,
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 1,
                              delay: index * 0.3 + 0.5,
                            }}
                            style={{
                              height: "100%",
                              background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}cc 100%)`,
                              borderRadius: "2px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Success Destination */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Box
                sx={{
                  marginTop: 6,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Success Badge */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 2,
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    padding: "16px 32px",
                    borderRadius: "50px",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    boxShadow: "0 15px 35px rgba(16, 185, 129, 0.3)",
                    border: "3px solid white",
                  }}
                >
                  <CheckIcon sx={{ fontSize: "1.5rem" }} />
                  Perfect Trip Achieved!
                  <ExploreIcon sx={{ fontSize: "1.5rem" }} />
                </Box>

                {/* Celebration Particles */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, (i % 2 ? 1 : -1) * (50 + i * 20)],
                        y: [0, -30 - i * 10],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: [
                          "#fbbf24",
                          "#10b981",
                          "#6366f1",
                          "#ef4444",
                          "#8b5cf6",
                          "#06b6d4",
                        ][i],
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Box sx={{ textAlign: "center", marginTop: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  marginBottom: 3,
                  fontWeight: 500,
                }}
              >
                Ready to start your journey?
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowIcon />}
                onClick={() => navigate("/itinerary")}
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                  textTransform: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(99, 102, 241, 0.4)",
                  },
                }}
              >
                Begin Your Planning Journey
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes flowAnimation {
            0% {
              left: -20px;
            }
            100% {
              left: 100%;
            }
          }
          @keyframes spin0 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes spin1 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
          @keyframes spin2 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes spin3 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </Box>

      {/* Enhanced Features Section */}
      <Box sx={{ padding: "100px 0", background: "#ffffff" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", marginBottom: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  marginBottom: 3,
                  color: "#1e293b",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Why Choose RouteGenie?
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  fontSize: "1.3rem",
                }}
              >
                Discover the benefits of organized travel planning and
                stress-free journey management.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={5} sx={{ marginTop: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -12 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      padding: "40px",
                      borderRadius: "24px",
                      background: `linear-gradient(145deg, ${feature.bgColor} 0%, #ffffff 100%)`,
                      border: `2px solid ${feature.color}15`,
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.4s ease",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 25px 50px ${feature.color}25`,
                        transform: "translateY(-12px)",
                        border: `2px solid ${feature.color}25`,
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                      },
                    }}
                  >
                    <CardContent
                      sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "25px",
                          background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 32px",
                          boxShadow: `0 15px 35px ${feature.color}35`,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: `linear-gradient(45deg, ${feature.color}20, transparent, ${feature.color}20)`,
                            borderRadius: "27px",
                            zIndex: -1,
                          },
                        }}
                      >
                        <feature.icon
                          sx={{ fontSize: "3rem", color: "white" }}
                        />
                      </Box>

                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          marginBottom: 3,
                          fontSize: "1.5rem",
                        }}
                      >
                        {feature.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#64748b",
                          lineHeight: 1.7,
                          fontSize: "1.1rem",
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Featured Destinations Carousel Section */}
      <Box
        id="destinations-section"
        sx={{
          padding: "100px 0",
          background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      borderRadius: "12px",
                      padding: "8px 16px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      FEATURED
                    </Typography>
                  </Box>
                  <StarIcon sx={{ color: "#fbbf24", fontSize: "1.5rem" }} />
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "#1e293b",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    marginBottom: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Discover Amazing Destinations
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.6,
                    fontSize: "1.3rem",
                  }}
                >
                  Get inspired by these incredible places around the world
                </Typography>
              </Box>

              {/* Carousel Controls */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  onClick={prevSlide}
                  sx={{
                    background: "#ffffff",
                    color: "#6366f1",
                    border: "2px solid #e2e8f0",
                    width: 56,
                    height: 56,
                    "&:hover": {
                      background: "#6366f1",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={nextSlide}
                  sx={{
                    background: "#ffffff",
                    color: "#6366f1",
                    border: "2px solid #e2e8f0",
                    width: 56,
                    height: 56,
                    "&:hover": {
                      background: "#6366f1",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ChevronRightIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </motion.div>

          {/* Carousel Container */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Grid container spacing={4}>
                  {featuredDestinations
                    .slice(currentSlide * 3, currentSlide * 3 + 3)
                    .map((destination, index) => (
                      <Grid item xs={12} md={4} key={destination.name}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -12 }}
                        >
                          <Card
                            sx={{
                              height: "100%",
                              borderRadius: "24px",
                              background: "#ffffff",
                              border: "2px solid #e2e8f0",
                              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                              transition: "all 0.4s ease",
                              overflow: "hidden",
                              position: "relative",
                              "&:hover": {
                                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                                transform: "translateY(-12px)",
                                border: "2px solid #6366f1",
                              },
                            }}
                          >
                            {/* Featured Badge */}
                            {destination.featured && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 16,
                                  right: 16,
                                  zIndex: 2,
                                  background:
                                    "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                                  borderRadius: "20px",
                                  padding: "6px 12px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  boxShadow:
                                    "0 4px 15px rgba(251, 191, 36, 0.4)",
                                }}
                              >
                                <StarIcon
                                  sx={{ fontSize: "1rem", color: "white" }}
                                />
                                <Typography
                                  sx={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  FEATURED
                                </Typography>
                              </Box>
                            )}

                            {/* Destination Image */}
                            <Box
                              sx={{ position: "relative", overflow: "hidden" }}
                            >
                              <CardMedia
                                component="img"
                                height="240"
                                image={
                                  destinationImages[destination.name] ||
                                  destination.fallbackImage
                                }
                                alt={destination.name}
                                sx={{
                                  objectFit: "cover",
                                  transition: "transform 0.4s ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                }}
                                onError={(e) => {
                                  e.target.src = destination.fallbackImage;
                                }}
                              />
                              {/* Gradient Overlay */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "50%",
                                  background:
                                    "linear-gradient(transparent, rgba(0, 0, 0, 0.3))",
                                  display: "flex",
                                  alignItems: "flex-end",
                                  padding: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <LocationIcon
                                    sx={{ color: "white", fontSize: "1.2rem" }}
                                  />
                                  <Typography
                                    sx={{
                                      color: "white",
                                      fontWeight: 600,
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {destination.continent}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <CardContent sx={{ padding: "28px" }}>
                              {/* Header */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  marginBottom: 2,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: 800,
                                    color: "#1e293b",
                                    lineHeight: 1.2,
                                    fontSize: "1.4rem",
                                  }}
                                >
                                  {destination.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <Rating
                                    value={destination.rating}
                                    precision={0.1}
                                    size="small"
                                    readOnly
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#64748b", fontWeight: 600 }}
                                  >
                                    {destination.rating}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Travelers Count */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  marginBottom: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    background: "#f1f5f9",
                                    borderRadius: "20px",
                                    padding: "4px 12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <ExploreIcon
                                    sx={{ fontSize: "1rem", color: "#6366f1" }}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#475569",
                                      fontWeight: 600,
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    {destination.travelers} travelers
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Description */}
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#64748b",
                                  lineHeight: 1.6,
                                  marginBottom: 3,
                                  fontSize: "0.95rem",
                                }}
                              >
                                {destination.description}
                              </Typography>

                              {/* Info Grid */}
                              <Grid
                                container
                                spacing={2}
                                sx={{ marginBottom: 3 }}
                              >
                                <Grid item xs={6}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                      marginBottom: 1,
                                    }}
                                  >
                                    <WeatherIcon
                                      sx={{
                                        fontSize: "1.1rem",
                                        color: "#f59e0b",
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#64748b", fontWeight: 600 }}
                                    >
                                      {destination.weather}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <CostIcon
                                      sx={{
                                        fontSize: "1.1rem",
                                        color: "#10b981",
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#64748b", fontWeight: 600 }}
                                    >
                                      {destination.avgCost}
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xs={6}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                      marginBottom: 1,
                                    }}
                                  >
                                    <CalendarIcon
                                      sx={{
                                        fontSize: "1.1rem",
                                        color: "#6366f1",
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#64748b", fontWeight: 600 }}
                                    >
                                      {destination.bestTime}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <CultureIcon
                                      sx={{
                                        fontSize: "1.1rem",
                                        color: "#ef4444",
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#64748b", fontWeight: 600 }}
                                    >
                                      {destination.culture}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>

                              {/* Highlights */}
                              <Box sx={{ marginBottom: 3 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#1e293b",
                                    marginBottom: 1.5,
                                  }}
                                >
                                  Top Highlights:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.8,
                                  }}
                                >
                                  {destination.highlights
                                    .slice(0, 3)
                                    .map((highlight, i) => (
                                      <Chip
                                        key={i}
                                        label={highlight}
                                        size="small"
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                          color: "white",
                                          fontSize: "0.75rem",
                                          height: 28,
                                          fontWeight: 600,
                                          "& .MuiChip-label": {
                                            padding: "0 12px",
                                          },
                                          "&:hover": {
                                            background:
                                              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                          },
                                        }}
                                      />
                                    ))}
                                </Box>
                              </Box>

                              {/* Action Buttons */}
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  endIcon={<ArrowIcon />}
                                  onClick={() => navigate("/itinerary")}
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    boxShadow:
                                      "0 6px 20px rgba(99, 102, 241, 0.3)",
                                    "&:hover": {
                                      background:
                                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 8px 25px rgba(99, 102, 241, 0.4)",
                                    },
                                  }}
                                >
                                  Plan Trip to {destination.name.split(",")[0]}
                                </Button>
                                <IconButton
                                  sx={{
                                    border: "2px solid #e2e8f0",
                                    borderRadius: "12px",
                                    width: 48,
                                    height: 48,
                                    "&:hover": {
                                      borderColor: "#ef4444",
                                      background: "#fef2f2",
                                    },
                                  }}
                                >
                                  <FavoriteIcon
                                    sx={{
                                      color: "#ef4444",
                                      fontSize: "1.3rem",
                                    }}
                                  />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                </Grid>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                marginTop: 4,
              }}
            >
              {Array.from({
                length: Math.ceil(featuredDestinations.length / 3),
              }).map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  sx={{
                    width: currentSlide === index ? 32 : 12,
                    height: 12,
                    borderRadius: 6,
                    background:
                      currentSlide === index
                        ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                        : "#e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        currentSlide === index
                          ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                          : "#cbd5e1",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Travel Tips Section */}
      <Box sx={{ padding: "100px 0", background: "#ffffff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    marginBottom: 3,
                    color: "#1e293b",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Smart Travel Tips
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#64748b",
                    marginBottom: 4,
                    lineHeight: 1.6,
                    fontSize: "1.3rem",
                  }}
                >
                  Make your travel planning more efficient and enjoyable with
                  these helpful insights.
                </Typography>

                <List sx={{ padding: 0 }}>
                  {travelTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ListItem
                        sx={{ padding: "12px 0", alignItems: "flex-start" }}
                      >
                        <ListItemIcon sx={{ minWidth: 48, marginTop: "4px" }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "10px",
                              background:
                                "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
                            }}
                          >
                            <tip.icon
                              sx={{ color: "white", fontSize: "1.3rem" }}
                            />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={tip.tip}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              lineHeight: 1.6,
                              color: "#64748b",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Enhanced Travel Planning Visual */}
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "48px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "white",
                      marginBottom: 3,
                      fontSize: "2.5rem",
                    }}
                  >
                    Start Your Journey
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      marginBottom: 4,
                      lineHeight: 1.6,
                      fontSize: "1.2rem",
                    }}
                  >
                    Join thousands of travelers who have organized their perfect
                    trips with RouteGenie. From planning to execution, we've got
                    you covered.
                  </Typography>

                  <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                    <Grid item xs={4}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: "white",
                          marginBottom: 1,
                        }}
                      >
                        150+
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        Destinations
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: "white",
                          marginBottom: 1,
                        }}
                      >
                        5K+
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        Happy Travelers
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: "white",
                          marginBottom: 1,
                        }}
                      >
                        4.8★
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        User Rating
                      </Typography>
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate("/itinerary")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                      color: "#1e293b",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      padding: "16px 32px",
                      borderRadius: "12px",
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(251, 191, 36, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 30px rgba(251, 191, 36, 0.5)",
                      },
                    }}
                  >
                    Create Your Itinerary
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          padding: "100px 0",
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Ready for Your Next Adventure?
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: 5,
                  maxWidth: "600px",
                  margin: "0 auto 40px",
                  lineHeight: 1.6,
                  fontSize: "1.3rem",
                }}
              >
                Start planning your dream trip today and experience stress-free
                travel organization.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate("/itinerary")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                      color: "#1e293b",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      padding: "18px 36px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)",
                      textTransform: "none",
                      minWidth: "240px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        boxShadow: "0 15px 40px rgba(251, 191, 36, 0.5)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Plan Your Trip Now
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/bookings")}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "1.2rem",
                      padding: "18px 36px",
                      borderRadius: "15px",
                      borderWidth: "2px",
                      textTransform: "none",
                      minWidth: "240px",
                      "&:hover": {
                        borderColor: "white",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderWidth: "2px",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Manage Bookings
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ModernHome;

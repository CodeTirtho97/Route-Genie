import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  Fade,
  Grow,
  Zoom,
  Paper,
  Avatar,
  Rating,
  Badge,
  LinearProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Map as MapIcon,
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  AttachMoney as BudgetIcon,
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  LocalActivity as ActivityIcon,
  Lightbulb as TipIcon,
  ArrowForward as ArrowIcon,
  Check as CheckIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  Schedule as TimeIcon,
  TrendingUp as TrendingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  AutoAwesome as MagicIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  FavoriteBorder as FavoriteIcon,
} from "@mui/icons-material";

// Sample data for demo purposes
const sampleItineraries = [
  {
    _id: "sample1",
    destination: "Bali, Indonesia",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    numPersons: 2,
    tripType: "Romance",
    budget: 150000,
    days: [
      {
        title: "Day 1 - Arrival & Ubud",
        activities: [
          "Airport pickup and hotel check-in",
          "Explore Ubud Rice Terraces",
          "Traditional Balinese dinner at Locavore",
        ],
      },
      {
        title: "Day 2 - Temples & Culture",
        activities: [
          "Visit Tanah Lot Temple at sunrise",
          "Explore Uluwatu Temple",
          "Kecak Fire Dance performance",
        ],
      },
      {
        title: "Day 3 - Beach & Relaxation",
        activities: [
          "Seminyak Beach morning",
          "Spa treatment at COMO Shambhala",
          "Sunset dinner at La Lucciola",
        ],
      },
    ],
    bookings: [
      {
        category: "Flight",
        name: "Delhi to Denpasar",
        date: "2025-03-15",
        time: "08:30",
        price: 35000,
      },
      {
        category: "Hotel",
        name: "COMO Uma Ubud",
        date: "2025-03-15",
        time: "15:00",
        price: 45000,
      },
    ],
  },
  {
    _id: "sample2",
    destination: "Tokyo, Japan",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    numPersons: 1,
    tripType: "Solo",
    budget: 200000,
    days: [
      {
        title: "Day 1 - Shibuya & Harajuku",
        activities: [
          "Shibuya Crossing experience",
          "Meiji Shrine visit",
          "Harajuku street food tour",
        ],
      },
      {
        title: "Day 2 - Traditional Tokyo",
        activities: [
          "Senso-ji Temple in Asakusa",
          "Traditional tea ceremony",
          "Kabuki performance",
        ],
      },
    ],
    bookings: [
      {
        category: "Flight",
        name: "Mumbai to Narita",
        date: "2025-04-10",
        time: "06:15",
        price: 55000,
      },
    ],
  },
];

const demoItinerary = {
  destination: "Paris, France",
  startDate: "2025-05-01",
  endDate: "2025-05-08",
  numPersons: 2,
  tripType: "Romance",
  budget: 250000,
  days: [
    {
      title: "Day 1 - Arrival & Champs-Élysées",
      activities: [
        "Airport transfer to hotel",
        "Stroll down Champs-Élysées",
        "Welcome dinner at Le Grand Véfour",
      ],
    },
    {
      title: "Day 2 - Louvre & Seine",
      activities: [
        "Private Louvre Museum tour",
        "Seine River cruise",
        "Dinner at Michelin-starred L'Ambroisie",
      ],
    },
    {
      title: "Day 3 - Eiffel Tower & Montmartre",
      activities: [
        "Eiffel Tower sunrise visit",
        "Montmartre artists district",
        "Sacré-Cœur Basilica visit",
      ],
    },
    {
      title: "Day 4 - Versailles Day Trip",
      activities: [
        "Palace of Versailles tour",
        "Gardens and Marie Antoinette's Estate",
        "Traditional French bistro dinner",
      ],
    },
    {
      title: "Day 5 - Latin Quarter & Art",
      activities: [
        "Latin Quarter exploration",
        "Musée d'Orsay visit",
        "Evening at Opera Garnier",
      ],
    },
  ],
};

const tripTypes = [
  { value: "Solo", icon: "🧳", description: "Perfect for self-discovery" },
  { value: "Romance", icon: "💕", description: "Romantic getaways" },
  { value: "Family", icon: "👨‍👩‍👧‍👦", description: "Fun for all ages" },
  { value: "Friends", icon: "👥", description: "Group adventures" },
  { value: "Adventure", icon: "🏔️", description: "Thrill seekers" },
  { value: "Business", icon: "💼", description: "Work meets travel" },
];

const benefits = [
  {
    icon: MagicIcon,
    title: "AI-Powered Planning",
    description: "Smart recommendations based on your preferences",
    color: "#6366f1",
  },
  {
    icon: SecurityIcon,
    title: "100% Free Forever",
    description: "No hidden costs, no premium features locked",
    color: "#10b981",
  },
  //   {
  //     icon: SupportIcon,
  //     title: "24/7 Support",
  //     description: "Get help whenever you need it",
  //     color: "#f59e0b",
  //   },
  {
    icon: TrendingIcon,
    title: "Real-time Updates",
    description: "Live booking integration and notifications",
    color: "#ef4444",
  },
];

const ModernItinerary = () => {
  const [user, setUser] = useState(null);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numPersons, setNumPersons] = useState("");
  const [tripType, setTripType] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [itineraries, setItineraries] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newItineraryId, setNewItineraryId] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // If user is logged in, fetch their itineraries
    if (storedUser) {
      fetchSavedItineraries();
    } else {
      // For non-logged users, show sample itineraries
      setItineraries(sampleItineraries);
    }
  }, []);

  // Demo animation effect
  useEffect(() => {
    let interval;
    if (isPlaying && showDemo) {
      interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % demoItinerary.days.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showDemo]);

  const fetchSavedItineraries = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/itineraries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(data);
    } catch (error) {
      console.error("Error fetching itineraries", error);
    }
  };

  const handleGenerateItinerary = async () => {
    if (
      !destination ||
      !startDate ||
      !endDate ||
      !numPersons ||
      !tripType ||
      !budget
    ) {
      return alert("Please fill all fields.");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to create itineraries!");
        navigate("/login");
        return;
      }

      const itineraryData = {
        destination,
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        numPersons,
        tripType,
        budget,
      };

      const generatedResponse = await API.post(
        "/itineraries/generate-itinerary",
        itineraryData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const generatedItinerary = generatedResponse.data;

      const { data } = await API.post(
        "/itineraries",
        { ...generatedItinerary },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Itinerary successfully created!");
      setNewItineraryId(data._id);

      // Reset form
      setDestination("");
      setStartDate(null);
      setEndDate(null);
      setNumPersons("");
      setTripType("");
      setBudget("");

      fetchSavedItineraries();

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Failed to generate itinerary:", error);
      alert("Error: " + error.response?.data?.msg || "Something went wrong!");
    }
    setLoading(false);
  };

  const startDemo = () => {
    setShowDemo(true);
    setIsPlaying(true);
    setDemoStep(0);
  };

  const stopDemo = () => {
    setIsPlaying(false);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl" sx={{ padding: "60px 20px" }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 8 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                padding: "8px 20px",
                borderRadius: "50px",
                marginBottom: 3,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <MagicIcon sx={{ fontSize: "1.1rem" }} />
              AI-Powered Travel Planning
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.1,
                marginBottom: 3,
                background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Create Your Perfect{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Travel Itinerary
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#64748b",
                maxWidth: "700px",
                margin: "0 auto 40px",
                lineHeight: 1.6,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              Transform your travel dreams into organized, day-by-day plans with
              smart booking management and personalized recommendations.
            </Typography>

            {/* Benefits Row */}
            <Grid
              container
              spacing={2}
              sx={{ maxWidth: "800px", margin: "0 auto 40px" }}
            >
              {benefits.map((benefit, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "12px",
                          background: `${benefit.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                        }}
                      >
                        <benefit.icon
                          sx={{ color: benefit.color, fontSize: "1.5rem" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1e293b",
                          marginBottom: 0.5,
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#64748b", fontSize: "0.75rem" }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Call to Action */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)",
                    borderRadius: "20px",
                    padding: "24px",
                    marginBottom: 4,
                    border: "2px solid #f59e0b",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#92400e", marginBottom: 1 }}
                  >
                    🎉 Get Started for FREE!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#78350f", marginBottom: 2 }}
                  >
                    Create unlimited itineraries, manage all your bookings, and
                    get personalized recommendations - completely free forever!
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/signup")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      padding: "12px 32px",
                      borderRadius: "12px",
                      marginRight: 2,
                    }}
                  >
                    Sign Up Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={startDemo}
                    sx={{
                      borderColor: "#6366f1",
                      color: "#6366f1",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      padding: "12px 24px",
                      borderRadius: "12px",
                    }}
                  >
                    See Demo
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>
        </motion.div>

        {/* Demo Section for Non-Authenticated Users */}
        <AnimatePresence>
          {!user && showDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                sx={{
                  padding: "32px",
                  borderRadius: "24px",
                  marginBottom: 6,
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#1e293b",
                        marginBottom: 1,
                      }}
                    >
                      Live Demo: Paris Romantic Getaway
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#64748b" }}>
                      See how RouteGenie creates detailed, day-by-day
                      itineraries
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      onClick={isPlaying ? stopDemo : () => setIsPlaying(true)}
                      sx={{
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        color: "white",
                        width: 48,
                        height: 48,
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        },
                      }}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/signup")}
                      sx={{
                        background:
                          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                        color: "#1e293b",
                        fontWeight: 700,
                      }}
                    >
                      Create Your Own
                    </Button>
                  </Box>
                </Box>

                {/* Demo Itinerary Header */}
                <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "16px",
                        background: "#f1f5f9",
                        borderRadius: "12px",
                      }}
                    >
                      <LocationIcon
                        sx={{
                          color: "#6366f1",
                          fontSize: "2rem",
                          marginBottom: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        {demoItinerary.destination}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Destination
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "16px",
                        background: "#f1f5f9",
                        borderRadius: "12px",
                      }}
                    >
                      <CalendarIcon
                        sx={{
                          color: "#10b981",
                          fontSize: "2rem",
                          marginBottom: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        7 Days
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Duration
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "16px",
                        background: "#f1f5f9",
                        borderRadius: "12px",
                      }}
                    >
                      <PeopleIcon
                        sx={{
                          color: "#f59e0b",
                          fontSize: "2rem",
                          marginBottom: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        {demoItinerary.numPersons} People
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Travelers
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "16px",
                        background: "#f1f5f9",
                        borderRadius: "12px",
                      }}
                    >
                      <BudgetIcon
                        sx={{
                          color: "#ef4444",
                          fontSize: "2rem",
                          marginBottom: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        ₹{demoItinerary.budget.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Budget
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Animated Day Cards */}
                <Box
                  sx={{
                    position: "relative",
                    height: "300px",
                    overflow: "hidden",
                    borderRadius: "16px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={demoStep}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      style={{ position: "absolute", width: "100%" }}
                    >
                      <Card
                        sx={{
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          color: "white",
                          height: "280px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          padding: "32px",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, marginBottom: 3 }}
                        >
                          {demoItinerary.days[demoStep].title}
                        </Typography>
                        <List>
                          {demoItinerary.days[demoStep].activities.map(
                            (activity, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.2,
                                }}
                              >
                                <ListItem sx={{ padding: "8px 0" }}>
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      background: "white",
                                      marginRight: 2,
                                    }}
                                  />
                                  <ListItemText
                                    primary={activity}
                                    sx={{
                                      "& .MuiListItemText-primary": {
                                        fontSize: "1.1rem",
                                        fontWeight: 500,
                                      },
                                    }}
                                  />
                                </ListItem>
                              </motion.div>
                            )
                          )}
                        </List>
                      </Card>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Indicators */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {demoItinerary.days.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: index === demoStep ? 24 : 8,
                          height: 8,
                          borderRadius: 4,
                          background:
                            index === demoStep
                              ? "white"
                              : "rgba(255, 255, 255, 0.3)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onClick={() => setDemoStep(index)}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Demo CTA */}
                <Box sx={{ textAlign: "center", marginTop: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#1e293b", marginBottom: 2, fontWeight: 600 }}
                  >
                    Love what you see? Create your own personalized itinerary!
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate("/signup")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      padding: "16px 32px",
                      borderRadius: "12px",
                    }}
                  >
                    Get Started Free
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Split Layout */}
        <Grid container spacing={6}>
          {/* Left Side - Itinerary Creation Form */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper
                sx={{
                  padding: "40px",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  position: "sticky",
                  top: 100,
                }}
              >
                <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "20px",
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    <MapIcon sx={{ fontSize: "2.5rem", color: "white" }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: 2,
                    }}
                  >
                    Plan Your Journey
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#64748b", fontSize: "1.1rem" }}
                  >
                    Tell us about your dream trip and we'll create a
                    personalized itinerary
                  </Typography>
                </Box>

                <form>
                  <TextField
                    fullWidth
                    label="Where do you want to go?"
                    variant="outlined"
                    placeholder="e.g., Paris, Tokyo, Bali..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    sx={{
                      marginBottom: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                      },
                    }}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                      <Grid item xs={6}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(date) => setStartDate(date)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              fullWidth: true,
                              sx: {
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(date) => setEndDate(date)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              fullWidth: true,
                              sx: {
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </LocalizationProvider>

                  <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Number of Travelers"
                        type="number"
                        variant="outlined"
                        placeholder="2"
                        value={numPersons}
                        onChange={(e) => setNumPersons(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Budget (₹)"
                        type="number"
                        variant="outlined"
                        placeholder="100000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Trip Type Selection */}
                  <Box sx={{ marginBottom: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        marginBottom: 2,
                      }}
                    >
                      What type of trip is this?
                    </Typography>
                    <Grid container spacing={2}>
                      {tripTypes.map((type) => (
                        <Grid item xs={6} md={4} key={type.value}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              onClick={() => setTripType(type.value)}
                              sx={{
                                padding: "16px",
                                cursor: "pointer",
                                textAlign: "center",
                                border:
                                  tripType === type.value
                                    ? "2px solid #6366f1"
                                    : "2px solid #e2e8f0",
                                background:
                                  tripType === type.value
                                    ? "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)"
                                    : "#ffffff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #6366f1",
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              <Typography variant="h4" sx={{ marginBottom: 1 }}>
                                {type.icon}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: "#1e293b",
                                  marginBottom: 0.5,
                                }}
                              >
                                {type.value}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "#64748b" }}
                              >
                                {type.description}
                              </Typography>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Create Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleGenerateItinerary}
                    disabled={loading}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      padding: "18px",
                      borderRadius: "12px",
                      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 30px rgba(99, 102, 241, 0.4)",
                      },
                      "&:disabled": {
                        background: "#94a3b8",
                        transform: "none",
                      },
                    }}
                  >
                    {loading ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CircularProgress size={24} sx={{ color: "white" }} />
                        Creating Your Itinerary...
                      </Box>
                    ) : (
                      <>
                        <MagicIcon sx={{ marginRight: 1 }} />
                        {user ? "Create My Itinerary" : "Sign Up to Create"}
                      </>
                    )}
                  </Button>

                  {!user && (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "#64748b",
                        marginTop: 2,
                        fontSize: "0.9rem",
                      }}
                    >
                      Already have an account?{" "}
                      <Button
                        variant="text"
                        onClick={() => navigate("/login")}
                        sx={{
                          color: "#6366f1",
                          fontWeight: 600,
                          textTransform: "none",
                          padding: 0,
                          minWidth: "auto",
                        }}
                      >
                        Log in here
                      </Button>
                    </Typography>
                  )}
                </form>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right Side - Saved Itineraries or Samples */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Box sx={{ marginBottom: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 2,
                  }}
                >
                  {user ? "Your Travel Plans" : "Sample Itineraries"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#64748b", fontSize: "1.1rem" }}
                >
                  {user
                    ? "Manage and view all your created itineraries"
                    : "See what kind of detailed itineraries you can create"}
                </Typography>
              </Box>

              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Paper
                      sx={{
                        padding: "20px",
                        background:
                          "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                        border: "2px solid #10b981",
                        borderRadius: "16px",
                        marginBottom: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CheckIcon
                          sx={{ color: "#065f46", fontSize: "1.5rem" }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "#065f46", fontWeight: 700 }}
                        >
                          {successMessage}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/itinerary/${newItineraryId}`)}
                        sx={{
                          background: "#10b981",
                          color: "white",
                          fontWeight: 600,
                          "&:hover": { background: "#059669" },
                        }}
                      >
                        View Details
                      </Button>
                    </Paper>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Itineraries Grid */}
              {itineraries.length > 0 ? (
                <Grid container spacing={3}>
                  {itineraries.map((itinerary, index) => (
                    <Grid item xs={12} key={itinerary._id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <Card
                          sx={{
                            borderRadius: "20px",
                            background:
                              "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                            border: "2px solid #e2e8f0",
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                            transition: "all 0.3s ease",
                            overflow: "hidden",
                            position: "relative",
                            "&:hover": {
                              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                              transform: "translateY(-4px)",
                              border: "2px solid #6366f1",
                            },
                          }}
                        >
                          {/* Sample Badge for non-users */}
                          {!user && (
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
                                boxShadow: "0 4px 15px rgba(251, 191, 36, 0.4)",
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
                                SAMPLE
                              </Typography>
                            </Box>
                          )}

                          <CardContent sx={{ padding: "32px" }}>
                            {/* Header */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 3,
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#1e293b",
                                    marginBottom: 1,
                                  }}
                                >
                                  {itinerary.destination}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#64748b", fontSize: "1rem" }}
                                >
                                  {itinerary.startDate} - {itinerary.endDate}
                                </Typography>
                              </Box>
                              {user && (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      background: "#f1f5f9",
                                      "&:hover": { background: "#e2e8f0" },
                                    }}
                                  >
                                    <ShareIcon sx={{ fontSize: "1.1rem" }} />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      background: "#f1f5f9",
                                      "&:hover": {
                                        background: "#fef2f2",
                                        color: "#ef4444",
                                      },
                                    }}
                                  >
                                    <FavoriteIcon sx={{ fontSize: "1.1rem" }} />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>

                            {/* Trip Details Grid */}
                            <Grid
                              container
                              spacing={2}
                              sx={{ marginBottom: 3 }}
                            >
                              <Grid item xs={4}>
                                <Box sx={{ textAlign: "center" }}>
                                  <PeopleIcon
                                    sx={{
                                      color: "#6366f1",
                                      fontSize: "1.5rem",
                                      marginBottom: 0.5,
                                    }}
                                  />
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#1e293b" }}
                                  >
                                    {itinerary.numPersons}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#64748b" }}
                                  >
                                    Travelers
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={4}>
                                <Box sx={{ textAlign: "center" }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      background:
                                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                      color: "white",
                                      padding: "4px 8px",
                                      borderRadius: "8px",
                                      fontWeight: 600,
                                      fontSize: "0.75rem",
                                      marginBottom: 0.5,
                                    }}
                                  >
                                    {itinerary.tripType}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#64748b" }}
                                  >
                                    Trip Type
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={4}>
                                <Box sx={{ textAlign: "center" }}>
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#10b981" }}
                                  >
                                    ₹{(itinerary.budget || 0).toLocaleString()}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#64748b" }}
                                  >
                                    Budget
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>

                            {/* Days Preview */}
                            {itinerary.days && itinerary.days.length > 0 && (
                              <Box sx={{ marginBottom: 3 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "#1e293b",
                                    marginBottom: 1.5,
                                  }}
                                >
                                  Day-wise Preview:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {itinerary.days
                                    .slice(0, 3)
                                    .map((day, dayIndex) => (
                                      <Chip
                                        key={dayIndex}
                                        label={day.title}
                                        size="small"
                                        sx={{
                                          background: "#f1f5f9",
                                          color: "#475569",
                                          fontWeight: 500,
                                          fontSize: "0.75rem",
                                        }}
                                      />
                                    ))}
                                  {itinerary.days.length > 3 && (
                                    <Chip
                                      label={`+${
                                        itinerary.days.length - 3
                                      } more`}
                                      size="small"
                                      sx={{
                                        background: "#eef2ff",
                                        color: "#6366f1",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            )}

                            {/* Bookings Preview */}
                            {itinerary.bookings &&
                              itinerary.bookings.length > 0 && (
                                <Box sx={{ marginBottom: 3 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 600,
                                      color: "#1e293b",
                                      marginBottom: 1.5,
                                    }}
                                  >
                                    Sample Bookings:
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 1,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {itinerary.bookings
                                      .slice(0, 2)
                                      .map((booking, bookingIndex) => (
                                        <Box
                                          key={bookingIndex}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            background: "#f8fafc",
                                            padding: "6px 12px",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0",
                                          }}
                                        >
                                          {booking.category === "Flight" && (
                                            <FlightIcon
                                              sx={{
                                                fontSize: "1rem",
                                                color: "#6366f1",
                                              }}
                                            />
                                          )}
                                          {booking.category === "Hotel" && (
                                            <HotelIcon
                                              sx={{
                                                fontSize: "1rem",
                                                color: "#10b981",
                                              }}
                                            />
                                          )}
                                          {booking.category ===
                                            "Restaurant" && (
                                            <RestaurantIcon
                                              sx={{
                                                fontSize: "1rem",
                                                color: "#f59e0b",
                                              }}
                                            />
                                          )}
                                          {booking.category === "Activity" && (
                                            <ActivityIcon
                                              sx={{
                                                fontSize: "1rem",
                                                color: "#ef4444",
                                              }}
                                            />
                                          )}
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              fontWeight: 600,
                                              color: "#475569",
                                            }}
                                          >
                                            {booking.category}
                                          </Typography>
                                        </Box>
                                      ))}
                                  </Box>
                                </Box>
                              )}

                            {/* Action Button */}
                            <Button
                              variant="contained"
                              fullWidth
                              endIcon={
                                user ? <VisibilityIcon /> : <ArrowIcon />
                              }
                              onClick={() => {
                                if (user) {
                                  navigate(`/itinerary/${itinerary._id}`);
                                } else {
                                  navigate("/signup");
                                }
                              }}
                              sx={{
                                background: user
                                  ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                                  : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                                color: user ? "white" : "#1e293b",
                                fontWeight: 700,
                                fontSize: "1rem",
                                padding: "14px",
                                borderRadius: "12px",
                                textTransform: "none",
                                boxShadow: user
                                  ? "0 6px 20px rgba(99, 102, 241, 0.3)"
                                  : "0 6px 20px rgba(251, 191, 36, 0.3)",
                                "&:hover": {
                                  background: user
                                    ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                                    : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                  transform: "translateY(-2px)",
                                  boxShadow: user
                                    ? "0 8px 25px rgba(99, 102, 241, 0.4)"
                                    : "0 8px 25px rgba(251, 191, 36, 0.4)",
                                },
                              }}
                            >
                              {user
                                ? "View Full Details"
                                : "Sign Up to Create Like This"}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      padding: "60px 40px",
                      background:
                        "linear-gradient(145deg, #f8fafc 0%, #ffffff 100%)",
                      borderRadius: "20px",
                      border: "2px dashed #cbd5e1",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background:
                          "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <MapIcon sx={{ fontSize: "2.5rem", color: "#64748b" }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#475569",
                        marginBottom: 2,
                      }}
                    >
                      Your travel adventures start here!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#64748b",
                        marginBottom: 3,
                        maxWidth: "400px",
                        margin: "0 auto 24px",
                      }}
                    >
                      Create your first itinerary using the form on the left.
                      It's completely free and takes just a few minutes.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // Scroll to form
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      sx={{
                        borderColor: "#6366f1",
                        color: "#6366f1",
                        fontWeight: 600,
                        padding: "12px 24px",
                        borderRadius: "12px",
                      }}
                    >
                      Start Planning Now
                    </Button>
                  </Box>
                </motion.div>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ModernItinerary;

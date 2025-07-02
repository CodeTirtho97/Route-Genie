import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  CircularProgress,
  IconButton,
  InputAdornment,
  Container,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Wc as GenderIcon,
  ArrowForward as ArrowIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Close as CloseIcon,
  Gavel as LegalIcon,
  Shield as PrivacyIcon,
} from "@mui/icons-material";

const ModernSignup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(userData.password);

  const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return "";
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 25) return "#ef4444";
    if (strength <= 50) return "#f59e0b";
    if (strength <= 75) return "#10b981";
    return "#059669";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (userData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/signup", userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event("userStateChange"));

      navigate("/itinerary");
    } catch (err) {
      setError(err.response?.data?.msg || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "dob") {
      // Handle DOB separately if needed for validation
      setUserData({ ...userData, [field]: value });
    } else {
      setUserData({ ...userData, [field]: value });
    }
    setError(""); // Clear error when user types
  };

  // Handle DOB change and combine day, month, year
  const handleDobChange = (field, value) => {
    let newDay = dobDay;
    let newMonth = dobMonth;
    let newYear = dobYear;

    if (field === "day") {
      setDobDay(value);
      newDay = value;
    }
    if (field === "month") {
      setDobMonth(value);
      newMonth = value;
    }
    if (field === "year") {
      setDobYear(value);
      newYear = value;
    }

    // Combine into YYYY-MM-DD format if all fields are filled
    if (newDay && newMonth && newYear) {
      const formattedDate = `${newYear}-${newMonth
        .toString()
        .padStart(2, "0")}-${newDay.toString().padStart(2, "0")}`;
      setUserData({ ...userData, dob: formattedDate });
    }
  };

  // Generate arrays for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const benefits = [
    {
      icon: SecurityIcon,
      title: "100% Free Forever",
      description: "No hidden costs, completely free",
    },
    {
      icon: SpeedIcon,
      title: "AI-Powered Planning",
      description: "Smart recommendations tailored to you",
    },
    {
      icon: SupportIcon,
      title: "Unlimited Everything",
      description: "Create unlimited trips and bookings",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "float 20s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              display: "flex",
              background: "rgba(255, 255, 255, 0.98)", // Increased opacity for better contrast
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {/* Left Side - Benefits & Branding */}
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(145deg, #1e293b 0%, #334155 100%)", // Changed to darker background
                color: "white",
                padding: { xs: "40px 32px", md: "60px 48px" },
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle Background Pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    marginBottom: 3,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    color: "#ffffff",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Start Your Journey Today
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 4,
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    color: "#e2e8f0",
                    fontWeight: 400,
                  }}
                >
                  Join our community of smart travelers and discover how easy
                  trip planning can be. Your next adventure is just a few clicks
                  away!
                </Typography>

                {/* Benefits List */}
                <Box sx={{ marginBottom: 0 }}>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 3,
                          padding: "16px",
                          borderRadius: "12px",
                          background: "rgba(255, 255, 255, 0.08)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 2,
                            flexShrink: 0,
                          }}
                        >
                          <benefit.icon
                            sx={{ fontSize: "1.2rem", color: "#ffffff" }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              marginBottom: 0.5,
                              color: "#ffffff",
                              fontSize: "1rem",
                            }}
                          >
                            {benefit.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#cbd5e1",
                              fontSize: "0.85rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {benefit.description}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>

            {/* Right Side - Signup Form */}
            <Box
              sx={{
                flex: 1,
                padding: { xs: "40px 32px", md: "60px 48px" },
                minWidth: 0,
              }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box sx={{ marginBottom: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: 1,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#64748b",
                      fontWeight: 400,
                      fontSize: "1.1rem",
                    }}
                  >
                    Start planning your dream trips for free
                  </Typography>
                </Box>
              </motion.div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      marginBottom: 3,
                      borderRadius: "12px",
                      "& .MuiAlert-message": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              {/* Signup Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form onSubmit={handleSignup}>
                  {/* Name Field */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    sx={{
                      marginBottom: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6366f1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Email Field */}
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    sx={{
                      marginBottom: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6366f1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Date of Birth and Gender Row */}
                  <Box sx={{ marginBottom: 3 }}>
                    {/* Date of Birth Label */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#374151",
                        fontWeight: 500,
                        marginBottom: 1.5,
                        fontSize: "0.875rem",
                      }}
                    >
                      Date of Birth *
                    </Typography>

                    {/* DOB Dropdowns Container */}
                    <Box sx={{ display: "flex", gap: 1.5, marginBottom: 3 }}>
                      {/* Day Dropdown */}
                      <TextField
                        select
                        label="Day"
                        value={dobDay}
                        onChange={(e) => handleDobChange("day", e.target.value)}
                        sx={{
                          flex: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "& fieldset": {
                              borderColor: "#e2e8f0",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#6366f1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiSelect-select": {
                            padding: "14px",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: "#1e293b",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#64748b",
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "#6366f1",
                            },
                          },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                marginTop: "4px",
                                "& .MuiMenuItem-root": {
                                  fontSize: "1rem",
                                  fontWeight: 500,
                                  color: "#374151",
                                  padding: "12px 16px",
                                  "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                                    color: "#6366f1",
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                                    color: "#6366f1",
                                    fontWeight: 600,
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(99, 102, 241, 0.16)",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        }}
                        required
                      >
                        {days.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Month Dropdown */}
                      <TextField
                        select
                        label="Month"
                        value={dobMonth}
                        onChange={(e) =>
                          handleDobChange("month", e.target.value)
                        }
                        sx={{
                          flex: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "& fieldset": {
                              borderColor: "#e2e8f0",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#6366f1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiSelect-select": {
                            padding: "14px",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: "#1e293b",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#64748b",
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "#6366f1",
                            },
                          },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                marginTop: "4px",
                                "& .MuiMenuItem-root": {
                                  fontSize: "1rem",
                                  fontWeight: 500,
                                  color: "#374151",
                                  padding: "12px 16px",
                                  "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                                    color: "#6366f1",
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                                    color: "#6366f1",
                                    fontWeight: 600,
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(99, 102, 241, 0.16)",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        }}
                        required
                      >
                        {months.map((month) => (
                          <MenuItem key={month.value} value={month.value}>
                            {month.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Year Dropdown */}
                      <TextField
                        select
                        label="Year"
                        value={dobYear}
                        onChange={(e) =>
                          handleDobChange("year", e.target.value)
                        }
                        sx={{
                          flex: 1.2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "& fieldset": {
                              borderColor: "#e2e8f0",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#6366f1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiSelect-select": {
                            padding: "14px",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: "#1e293b",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#64748b",
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "#6366f1",
                            },
                          },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                marginTop: "4px",
                                maxHeight: "200px",
                                "& .MuiMenuItem-root": {
                                  fontSize: "1rem",
                                  fontWeight: 500,
                                  color: "#374151",
                                  padding: "12px 16px",
                                  "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                                    color: "#6366f1",
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                                    color: "#6366f1",
                                    fontWeight: 600,
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(99, 102, 241, 0.16)",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        }}
                        required
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>

                    {/* Gender Dropdown */}
                    <TextField
                      select
                      fullWidth
                      label="Gender"
                      value={userData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          "& fieldset": {
                            borderColor: "#e2e8f0",
                            borderWidth: "2px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#6366f1",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#6366f1",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiSelect-select": {
                          padding: "14px",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#1e293b",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#64748b",
                          fontWeight: 500,
                          "&.Mui-focused": {
                            color: "#6366f1",
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <GenderIcon
                              sx={{ color: "#6366f1", fontSize: "1.3rem" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              borderRadius: "12px",
                              border: "1px solid #e2e8f0",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                              marginTop: "4px",
                              "& .MuiMenuItem-root": {
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "#374151",
                                padding: "12px 16px",
                                "&:hover": {
                                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                                  color: "#6366f1",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                                  color: "#6366f1",
                                  fontWeight: 600,
                                  "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.16)",
                                  },
                                },
                              },
                            },
                          },
                        },
                      }}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Box>

                  {/* Password Field */}
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    sx={{
                      marginBottom: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6366f1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ color: "#64748b" }}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Password Strength Indicator */}
                  {userData.password && (
                    <Box sx={{ marginBottom: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 1,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                          Password Strength
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: getPasswordStrengthColor(passwordStrength),
                            fontWeight: 600,
                          }}
                        >
                          {getPasswordStrengthLabel(passwordStrength)}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#e2e8f0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              getPasswordStrengthColor(passwordStrength),
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Confirm Password Field */}
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    value={userData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    error={
                      userData.confirmPassword &&
                      userData.password !== userData.confirmPassword
                    }
                    helperText={
                      userData.confirmPassword &&
                      userData.password !== userData.confirmPassword
                        ? "Passwords don't match"
                        : ""
                    }
                    sx={{
                      marginBottom: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6366f1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                            sx={{ color: "#64748b" }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Terms and Conditions */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        sx={{
                          color: "#6366f1",
                          "&.Mui-checked": {
                            color: "#6366f1",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        I agree to the{" "}
                        <Button
                          variant="text"
                          onClick={() => setTermsModalOpen(true)}
                          sx={{
                            color: "#6366f1",
                            fontWeight: 600,
                            textTransform: "none",
                            padding: 0,
                            minWidth: "auto",
                            textDecoration: "underline",
                            "&:hover": {
                              background: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="text"
                          onClick={() => setPrivacyModalOpen(true)}
                          sx={{
                            color: "#6366f1",
                            fontWeight: 600,
                            textTransform: "none",
                            padding: 0,
                            minWidth: "auto",
                            textDecoration: "underline",
                            "&:hover": {
                              background: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Privacy Policy
                        </Button>
                      </Typography>
                    }
                    sx={{ marginBottom: 3 }}
                  />

                  {/* Signup Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading || !agreedToTerms}
                    endIcon={!loading && <ArrowIcon />}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      padding: "16px",
                      borderRadius: "12px",
                      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                      textTransform: "none",
                      marginBottom: 4,
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
                        Creating Account...
                      </Box>
                    ) : (
                      "Create Free Account"
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "1rem",
                  }}
                >
                  Already have an account?{" "}
                  <Button
                    component={Link}
                    to="/login"
                    variant="text"
                    sx={{
                      color: "#6366f1",
                      fontWeight: 700,
                      textTransform: "none",
                      textDecoration: "none",
                      padding: 0,
                      minWidth: "auto",
                      "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign in here
                  </Button>
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Terms of Service Modal */}
      <Dialog
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LegalIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
              Terms of Service
            </Typography>
          </Box>
          <IconButton
            onClick={() => setTermsModalOpen(false)}
            sx={{
              color: "#64748b",
              "&:hover": { background: "rgba(99, 102, 241, 0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ padding: "24px" }}>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", marginBottom: 3 }}
          >
            Last updated: January 2025
          </Typography>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              1. Acceptance of Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, marginBottom: 2, color: "#475569" }}
            >
              By accessing and using RouteGenie, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              2. Use License
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, marginBottom: 2, color: "#475569" }}
            >
              Permission is granted to temporarily download one copy of
              RouteGenie per device for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </Typography>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Modify or copy the materials"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Use the materials for any commercial purpose or for any public display"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Attempt to reverse engineer any software contained in RouteGenie"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              3. User Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, marginBottom: 2, color: "#475569" }}
            >
              To access certain features of the service, you may be required to
              create an account. You are responsible for:
            </Typography>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Maintaining the confidentiality of your account and password"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• All activities that occur under your account"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Providing accurate and complete information"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              4. Service Availability
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "#475569" }}
            >
              RouteGenie is provided "as is" and we make no warranties about the
              service's reliability, stability, or availability. We reserve the
              right to modify or discontinue the service at any time without
              notice.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              5. Limitation of Liability
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "#475569" }}
            >
              In no event shall RouteGenie or its suppliers be liable for any
              damages arising out of the use or inability to use the materials
              on RouteGenie, even if authorized representative has been notified
              orally or in writing.
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#f1f5f9",
              padding: "16px",
              borderRadius: "12px",
              marginTop: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#475569", fontStyle: "italic" }}
            >
              These terms may be updated from time to time. Continued use of
              RouteGenie constitutes acceptance of any changes.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "24px", borderTop: "1px solid #e2e8f0" }}>
          <Button
            onClick={() => setTermsModalOpen(false)}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              padding: "10px 24px",
            }}
          >
            I Understand
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog
        open={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PrivacyIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
              Privacy Policy
            </Typography>
          </Box>
          <IconButton
            onClick={() => setPrivacyModalOpen(false)}
            sx={{
              color: "#64748b",
              "&:hover": { background: "rgba(16, 185, 129, 0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ padding: "24px" }}>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", marginBottom: 3 }}
          >
            Last updated: January 2025
          </Typography>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              Information We Collect
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, marginBottom: 2, color: "#475569" }}
            >
              We collect information you provide directly to us, such as when
              you create an account, use our services, or contact us for
              support.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                marginBottom: 2,
              }}
            >
              {[
                "Personal Information",
                "Travel Preferences",
                "Usage Data",
                "Device Information",
              ].map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  size="small"
                  sx={{
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              How We Use Your Information
            </Typography>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Provide and improve our travel planning services"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Personalize your experience and recommendations"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Communicate with you about your account and trips"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Analyze usage patterns to enhance our platform"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              Information Sharing
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "#475569" }}
            >
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy. We may share information with trusted
              partners who assist us in operating our website and serving you.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              Data Security
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "#475569" }}
            >
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. This includes encryption, secure
              servers, and regular security audits.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: 2, color: "#1e293b" }}
            >
              Your Rights
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, marginBottom: 2, color: "#475569" }}
            >
              You have the right to:
            </Typography>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Access and update your personal information"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Request deletion of your account and data"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Opt-out of marketing communications"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
              <ListItem sx={{ padding: "4px 0" }}>
                <ListItemText
                  primary="• Export your travel data"
                  sx={{ "& .MuiListItemText-primary": { color: "#475569" } }}
                />
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              background: "#ecfdf5",
              padding: "16px",
              borderRadius: "12px",
              marginTop: 3,
              border: "1px solid #d1fae5",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#065f46", fontWeight: 500, marginBottom: 1 }}
            >
              🔒 Your Privacy Matters
            </Typography>
            <Typography variant="body2" sx={{ color: "#047857" }}>
              We are committed to protecting your privacy and being transparent
              about our data practices. If you have any questions, please
              contact us at privacy@routegenie.com
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "24px", borderTop: "1px solid #e2e8f0" }}>
          <Button
            onClick={() => setPrivacyModalOpen(false)}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              padding: "10px 24px",
            }}
          >
            I Understand
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default ModernSignup;

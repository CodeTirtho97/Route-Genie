import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowForward as ArrowIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
} from "@mui/icons-material";

const ModernLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event("userStateChange"));

      navigate("/itinerary");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const benefits = [
    {
      icon: SecurityIcon,
      title: "Secure & Private",
      description: "Your data is encrypted and protected",
    },
    {
      icon: SpeedIcon,
      title: "Lightning Fast",
      description: "Create itineraries in under 2 minutes",
    },
    {
      icon: SupportIcon,
      title: "24/7 Support",
      description: "Get help whenever you need it",
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
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {/* Left Side - Login Form */}
            <Box
              sx={{
                flex: 1,
                padding: { xs: "40px 32px", md: "60px 48px" },
                minWidth: 0,
              }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
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
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#64748b",
                      fontWeight: 400,
                      fontSize: "1.1rem",
                    }}
                  >
                    Sign in to continue your travel planning journey
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

              {/* Login Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(""); // Clear error when user types
                    }}
                    sx={{
                      marginBottom: 3,
                      marginTop: 4,
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

                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(""); // Clear error when user types
                    }}
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

                  {/* Forgot Password */}
                  {/* <Box sx={{ textAlign: "right", marginBottom: 3 }}>
                    <Button
                      variant="text"
                      sx={{
                        color: "#6366f1",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          background: "rgba(99, 102, 241, 0.1)",
                        },
                      }}
                    >
                      Forgot Password?
                    </Button>
                  </Box> */}

                  {/* Login Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
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
                      marginTop: 4,
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
                        Signing In...
                      </Box>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Sign Up Link */}
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
                  Don't have an account?{" "}
                  <Button
                    component={Link}
                    to="/signup"
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
                    Sign up for free
                  </Button>
                </Typography>
              </motion.div>
            </Box>

            {/* Right Side - Benefits & Branding */}
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
                initial={{ opacity: 0, x: 20 }}
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
                  Your Travel Dreams Await
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
                  Join thousands of travelers who have organized their perfect
                  trips with RouteGenie. Start planning your next adventure
                  today!
                </Typography>

                {/* Benefits List */}
                <Box sx={{ marginBottom: 0 }}>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
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
          </Box>
        </motion.div>
      </Container>

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

export default ModernLogin;

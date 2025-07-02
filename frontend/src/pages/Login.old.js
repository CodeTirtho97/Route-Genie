import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/itinerary");
            window.location.reload(); // ✅ Ensure Navbar updates after login
        } catch (err) {
            setError(err.response?.data?.msg || "Invalid credentials");
        }
        setLoading(false);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #FCEEB5, #FFDDC1)" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper sx={{ padding: "50px", width: "450px", textAlign: "center", borderRadius: "15px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)", background: "#ffffff" }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif", color: "#333", mb: 4 }}>
                        Login to <span style={{ color: "#ff9800" }}>RouteGenie</span>
                    </Typography>

                    {/* ✅ Error message (hidden until needed) */}
                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <TextField 
                        fullWidth 
                        label="Email" 
                        variant="outlined" 
                        sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} 
                        value={email} 
                        onChange={(e) => { setEmail(e.target.value); setError(""); }} 
                    />
                    
                    <TextField 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        sx={{ mb: 4, fontSize: "18px", background: "#fff", borderRadius: "5px" }} 
                        value={password} 
                        onChange={(e) => { setPassword(e.target.value); setError(""); }} 
                    />

                    {/* ✅ Login Button with Loading State */}
                    <Button 
                        fullWidth 
                        variant="contained" 
                        sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#ff5722" }, fontWeight: "bold", padding: "16px", fontSize: "18px" }} 
                        onClick={handleLogin} 
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
                    </Button>

                    <Typography variant="body1" sx={{ mt: 3, fontSize: "18px" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#29b6f6", textDecoration: "none", fontWeight: "bold" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default Login;

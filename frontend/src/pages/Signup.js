import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { Box, TextField, Button, Typography, Paper, Alert, MenuItem } from "@mui/material";
import { motion } from "framer-motion";

const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", dob: "", gender: "" });
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (userData.password !== userData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { data } = await API.post("/auth/signup", userData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/itinerary");
        } catch (err) {
            setError(err.response?.data?.msg || "Error signing up");
        }
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #FCEEB5, #FFDDC1)" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper sx={{ padding: "50px", width: "500px", textAlign: "center", borderRadius: "15px", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)", background: "#ffffff" }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif", color: "#333", mb: 4 }}>
                        Create an Account
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <TextField fullWidth label="Full Name" variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
                    <TextField select fullWidth label="Gender" variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <TextField fullWidth label="Confirm Password" type="password" variant="outlined" sx={{ mb: 4, fontSize: "18px", background: "#fff", borderRadius: "5px" }} value={userData.confirmPassword} onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} />
                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#ff5722" }, fontWeight: "bold", padding: "16px", fontSize: "18px" }} onClick={handleSignup}>
                        Sign Up
                    </Button>
                    <Typography variant="body1" sx={{ mt: 3, fontSize: "18px" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#29b6f6", textDecoration: "none", fontWeight: "bold" }}>
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default Signup;

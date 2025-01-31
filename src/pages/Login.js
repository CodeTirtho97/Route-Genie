import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to right, #FCEEB5, #FFDDC1)",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    sx={{
                        padding: "50px",
                        width: "450px",
                        textAlign: "center",
                        borderRadius: "15px",
                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                        background: "#ffffff",
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif", color: "#333", mb: 4 }}>
                        Login to <span style={{ color: "#ff9800" }}>RouteGenie</span>
                    </Typography>
                    <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 3, fontSize: "18px", background: "#fff", borderRadius: "5px" }} />
                    <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 4, fontSize: "18px", background: "#fff", borderRadius: "5px" }} />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#ff9800",
                            "&:hover": { backgroundColor: "#ff5722" },
                            fontWeight: "bold",
                            padding: "16px",
                            fontSize: "18px",
                        }}
                    >
                        Login
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

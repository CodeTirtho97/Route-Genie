import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#1a1a2e",
                color: "#f8f8f8",
                textAlign: "center",
                padding: "15px, 0",
                position: "relative",
                bottom: 0,
                width: "100%",
                mt: "auto"
            }}
        >
            <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>
            © {new Date().getFullYear()} RouteGenie. All Rights Reserved.
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
                Designed for seamless travel experiences.
            </Typography>
        </Box>
    );
};

export default Footer;
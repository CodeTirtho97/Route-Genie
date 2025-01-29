import React, { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Home = () => {
    const randomBg = useMemo(() => {
        const randomNumber = Math.floor(Math.random() * 15) + 1;
        return require(`../assets/hero-bg-${randomNumber}.jpg`);
    }, []);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${randomBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
            }}
            >
                {/* Overlay Effect */}
                <Box 
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1,
                    }}
                />

                {/* Animated Content */}
                <Box sx={{ position: "relative", zIndex: 2}}>
                    <motion.div
                        initial={{opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                fontWeight: "bold", 
                                fontFamily: "'Mystery Quest', serif", 
                                color: "#fff"
                            }}
                        >
                            Explore the world with{" "}
                            <span style={{ 
                                fontFamily: "'Itim', serif", 
                                fontSize: "6rem",
                                color: "#ef233c",
                                fontWeight: "bold",
                            }}>
                                RouteGenie
                            </span>
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        >
                        <Typography variant="h4" sx={{ mt: 2, fontFamily: "'Caveat', serif", color: "#c2f8cb" }}>
                            Your Personal Travel Assistant for planning seamless trips.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0}}
                        animate={{ scale: 1, opacity: 1}}
                        transition={{ duration: 0.8, delay: 0.6 }}    
                    >
                        <Button
                            variant="contained"
                            sx={{
                                mt: 4,
                                backgroundColor: "#ff9800",
                                color: "#fff",
                                fontSize: "18px",
                                fontWeight: "bold",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                transition: "0.3s",
                                "&:hover": { backgroundColor: "#ff5722", transform: "scale(1.1)" },
                            }}
                            component={Link}
                            to="/itinerary"
                        >
                            Start Planning
                        </Button>
                    </motion.div>
                </Box>
            </Box>
    );
};

export default Home;
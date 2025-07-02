import React from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Map as MapIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Favorite as HeartIcon,
  Twitter,
} from "@mui/icons-material";

const ModernFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const socialLinks = [
    {
      icon: GitHubIcon,
      href: "https://github.com/CodeTirtho97",
      label: "GitHub",
    },
    {
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/tirthoraj-bhattacharya/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://x.com/lucifer_7951", label: "Twitter" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        marginTop: "auto",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ padding: { xs: "32px 16px", md: "40px 24px" } }}
      >
        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Logo */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                }}
              >
                <MapIcon sx={{ color: "white", fontSize: "1.25rem" }} />
              </Box>

              {/* Brand Name */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.01em",
                }}
              >
                RouteGenie
              </Typography>
            </Box>
          </motion.div>

          {/* Center - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Made with
              <HeartIcon sx={{ fontSize: "1rem", color: "#ef4444" }} />
              by CodeTirtho97
            </Typography>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        width: 36,
                        height: 36,
                        color: "#64748b",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "white",
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                          border: "1px solid transparent",
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: "1.125rem" }} />
                    </IconButton>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>
        </Box>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginTop: 2.5,
              paddingTop: 2.5,
              borderTop: "1px solid rgba(226, 232, 240, 0.5)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              Built with React • Node.js • MongoDB • Material-UI
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernFooter;

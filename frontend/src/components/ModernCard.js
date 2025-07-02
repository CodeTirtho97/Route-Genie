// frontend/src/components/ModernCard.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FlightTakeoff,
  Hotel,
  Restaurant,
  LocalActivity,
  Train,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

// Category icon mapping without emojis
const getCategoryIcon = (category) => {
  const iconMap = {
    Flight: FlightTakeoff,
    Hotel: Hotel,
    Restaurant: Restaurant,
    Activity: LocalActivity,
    Train: Train,
  };
  return iconMap[category] || LocalActivity;
};

// Professional color mapping
const getCategoryColor = (category) => {
  const colorMap = {
    Flight: { bg: "#dbeafe", border: "#3b82f6", icon: "#1d4ed8" },
    Hotel: { bg: "#d1fae5", border: "#10b981", icon: "#059669" },
    Restaurant: { bg: "#fee2e2", border: "#ef4444", icon: "#dc2626" },
    Activity: { bg: "#fef3c7", border: "#f59e0b", icon: "#d97706" },
    Train: { bg: "#e0e7ff", border: "#6366f1", icon: "#4f46e5" },
  };
  return colorMap[category] || colorMap["Activity"];
};

// Modern Booking Card Component
export const ModernBookingCard = ({
  booking,
  onEdit,
  onDelete,
  showActions = true,
  elevation = 1,
}) => {
  const theme = useTheme();
  const CategoryIcon = getCategoryIcon(booking.category);
  const colors = getCategoryColor(booking.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          border: `1px solid ${colors.border}20`,
          background: `linear-gradient(145deg, ${colors.bg} 0%, #ffffff 100%)`,
          boxShadow:
            elevation === 1
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "visible",
          "&:hover": {
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {/* Category Badge */}
        <Box
          sx={{
            position: "absolute",
            top: -8,
            left: 16,
            zIndex: 2,
          }}
        >
          <Chip
            icon={<CategoryIcon sx={{ fontSize: "1rem" }} />}
            label={booking.category}
            sx={{
              background: colors.border,
              color: "white",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 28,
              "& .MuiChip-icon": {
                color: "white",
              },
            }}
          />
        </Box>

        <CardContent sx={{ padding: "24px", paddingTop: "32px" }}>
          {/* Header with Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 0.5,
                  lineHeight: 1.3,
                }}
              >
                {booking.name}
              </Typography>

              {booking.origin && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  From: {booking.origin}
                </Typography>
              )}
            </Box>

            {showActions && (
              <IconButton
                size="small"
                sx={{
                  color: "#64748b",
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.1)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>

          {/* Date and Time */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: 2,
              padding: "12px",
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Date
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                {booking.formattedDate}
              </Typography>
            </Box>
            {booking.formattedTime !== "No Time Set" && (
              <>
                <Box sx={{ width: 1, background: "#e2e8f0" }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", fontWeight: 500 }}
                  >
                    Time
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    {booking.formattedTime}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {/* Price */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: showActions ? 2 : 0,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Total Cost
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.icon,
                  fontSize: "1.25rem",
                }}
              >
                ₹{booking.price?.toLocaleString()}
              </Typography>
            </Box>

            {booking.notes && (
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontStyle: "italic",
                  maxWidth: "40%",
                  textAlign: "right",
                }}
              >
                "{booking.notes}"
              </Typography>
            )}
          </Box>

          {/* Action Buttons */}
          {showActions && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                paddingTop: 2,
                borderTop: "1px solid rgba(226, 232, 240, 0.8)",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={() => onEdit?.(booking)}
                sx={{
                  borderColor: colors.border,
                  color: colors.icon,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  textTransform: "none",
                  "&:hover": {
                    background: `${colors.border}15`,
                    borderColor: colors.icon,
                  },
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => onDelete?.(booking)}
                sx={{
                  color: "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(239, 68, 68, 0.1)",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Modern Itinerary Card Component
export const ModernItineraryCard = ({
  itinerary,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid #e2e8f0",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <CardContent sx={{ padding: "24px" }}>
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
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 0.5,
                }}
              >
                {itinerary.destination}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                {itinerary.startDate} - {itinerary.endDate}
              </Typography>
            </Box>

            {showActions && (
              <IconButton
                size="small"
                sx={{
                  color: "#64748b",
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.1)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>

          {/* Trip Details */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              marginBottom: 3,
              padding: "16px",
              background: "rgba(99, 102, 241, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(99, 102, 241, 0.1)",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Travelers
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1e293b" }}
              >
                {itinerary.numPersons}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Type
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1e293b" }}
              >
                {itinerary.tripType}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Budget
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#10b981" }}
              >
                ₹{itinerary.budget?.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Action Button */}
          {showActions && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => onView?.(itinerary)}
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "12px",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.49)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              View Details
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Modern Feature Card Component (for Home page)
export const ModernFeatureCard = ({
  icon: IconComponent,
  title,
  description,
  color = "primary",
  delay = 0,
}) => {
  const getColorScheme = (color) => {
    const schemes = {
      primary: { bg: "#dbeafe", icon: "#3b82f6", border: "#93c5fd" },
      success: { bg: "#d1fae5", icon: "#10b981", border: "#86efac" },
      warning: { bg: "#fef3c7", icon: "#f59e0b", border: "#fcd34d" },
      purple: { bg: "#ede9fe", icon: "#8b5cf6", border: "#c4b5fd" },
    };
    return schemes[color] || schemes.primary;
  };

  const colorScheme = getColorScheme(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      <Card
        sx={{
          padding: "32px",
          borderRadius: "20px",
          background: `linear-gradient(145deg, ${colorScheme.bg} 0%, #ffffff 100%)`,
          border: `1px solid ${colorScheme.border}40`,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.4s ease",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transform: "translateY(-8px)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${colorScheme.icon} 0%, ${colorScheme.border} 100%)`,
          },
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${colorScheme.icon} 0%, ${colorScheme.border} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: `0 8px 25px 0 ${colorScheme.icon}40`,
            }}
          >
            <IconComponent sx={{ fontSize: "2.5rem", color: "white" }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 2,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Modern Stats Card Component
export const ModernStatsCard = ({
  title,
  value,
  icon: IconComponent,
  trend,
  trendValue,
  color = "primary",
}) => {
  const getColorScheme = (color) => {
    const schemes = {
      primary: { main: "#6366f1", bg: "#eef2ff", light: "#c7d2fe" },
      success: { main: "#10b981", bg: "#ecfdf5", light: "#86efac" },
      warning: { main: "#f59e0b", bg: "#fffbeb", light: "#fcd34d" },
      error: { main: "#ef4444", bg: "#fef2f2", light: "#fca5a5" },
    };
    return schemes[color] || schemes.primary;
  };

  const colorScheme = getColorScheme(color);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          padding: "24px",
          borderRadius: "16px",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid #e2e8f0",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 500, marginBottom: 1 }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#1e293b",
                  marginBottom: 1,
                }}
              >
                {value}
              </Typography>
              {trend && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: trend === "up" ? "#10b981" : "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    {trend === "up" ? "+" : "-"}
                    {trendValue}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    from last month
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: colorScheme.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconComponent
                sx={{ fontSize: "1.5rem", color: colorScheme.main }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default {
  ModernBookingCard,
  ModernItineraryCard,
  ModernFeatureCard,
  ModernStatsCard,
};

// frontend/src/components/ModernButton.js
import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

// Primary Gradient Button
export const ModernPrimaryButton = ({
  children,
  loading = false,
  disabled = false,
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  ...props
}) => {
  const getSizeStyles = (size) => {
    const sizes = {
      small: { padding: "8px 16px", fontSize: "0.75rem" },
      medium: { padding: "12px 24px", fontSize: "0.875rem" },
      large: { padding: "16px 32px", fontSize: "1rem" },
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles(size);

  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="contained"
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={loading ? null : startIcon}
        endIcon={loading ? null : endIcon}
        onClick={onClick}
        sx={{
          background: disabled
            ? "#94a3b8"
            : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "12px",
          boxShadow: disabled
            ? "none"
            : "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
          transition: "all 0.3s ease",
          border: "none",
          position: "relative",
          overflow: "hidden",
          ...sizeStyles,
          "&:hover": {
            background: disabled
              ? "#94a3b8"
              : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            boxShadow: disabled
              ? "none"
              : "0 6px 20px 0 rgba(99, 102, 241, 0.49)",
            transform: disabled || loading ? "none" : "translateY(-2px)",
          },
          "&:active": {
            transform: disabled || loading ? "none" : "translateY(0)",
          },
          "&.Mui-disabled": {
            background: "#94a3b8",
            color: "white",
          },
        }}
        {...props}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: "white" }} />
            {children}
          </Box>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
};

// Secondary Outline Button
export const ModernSecondaryButton = ({
  children,
  loading = false,
  disabled = false,
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  color = "primary",
  ...props
}) => {
  const getSizeStyles = (size) => {
    const sizes = {
      small: { padding: "8px 16px", fontSize: "0.75rem" },
      medium: { padding: "12px 24px", fontSize: "0.875rem" },
      large: { padding: "16px 32px", fontSize: "1rem" },
    };
    return sizes[size] || sizes.medium;
  };

  const getColorStyles = (color) => {
    const colors = {
      primary: {
        border: "#6366f1",
        text: "#6366f1",
        hover: "rgba(99, 102, 241, 0.1)",
        hoverBorder: "#4f46e5",
      },
      success: {
        border: "#10b981",
        text: "#10b981",
        hover: "rgba(16, 185, 129, 0.1)",
        hoverBorder: "#059669",
      },
      error: {
        border: "#ef4444",
        text: "#ef4444",
        hover: "rgba(239, 68, 68, 0.1)",
        hoverBorder: "#dc2626",
      },
      warning: {
        border: "#f59e0b",
        text: "#f59e0b",
        hover: "rgba(245, 158, 11, 0.1)",
        hoverBorder: "#d97706",
      },
    };
    return colors[color] || colors.primary;
  };

  const sizeStyles = getSizeStyles(size);
  const colorStyles = getColorStyles(color);

  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="outlined"
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={loading ? null : startIcon}
        endIcon={loading ? null : endIcon}
        onClick={onClick}
        sx={{
          borderColor: disabled ? "#94a3b8" : colorStyles.border,
          color: disabled ? "#94a3b8" : colorStyles.text,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "12px",
          borderWidth: "2px",
          background: "white",
          transition: "all 0.3s ease",
          ...sizeStyles,
          "&:hover": {
            borderColor: disabled ? "#94a3b8" : colorStyles.hoverBorder,
            background: disabled ? "white" : colorStyles.hover,
            borderWidth: "2px",
            transform: disabled || loading ? "none" : "translateY(-1px)",
          },
          "&:active": {
            transform: disabled || loading ? "none" : "translateY(0)",
          },
          "&.Mui-disabled": {
            borderColor: "#94a3b8",
            color: "#94a3b8",
          },
        }}
        {...props}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: colorStyles.text }} />
            {children}
          </Box>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
};

// Ghost/Text Button
export const ModernGhostButton = ({
  children,
  loading = false,
  disabled = false,
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  color = "primary",
  ...props
}) => {
  const getSizeStyles = (size) => {
    const sizes = {
      small: { padding: "6px 12px", fontSize: "0.75rem" },
      medium: { padding: "10px 16px", fontSize: "0.875rem" },
      large: { padding: "14px 20px", fontSize: "1rem" },
    };
    return sizes[size] || sizes.medium;
  };

  const getColorStyles = (color) => {
    const colors = {
      primary: { text: "#6366f1", hover: "rgba(99, 102, 241, 0.1)" },
      success: { text: "#10b981", hover: "rgba(16, 185, 129, 0.1)" },
      error: { text: "#ef4444", hover: "rgba(239, 68, 68, 0.1)" },
      warning: { text: "#f59e0b", hover: "rgba(245, 158, 11, 0.1)" },
      gray: { text: "#64748b", hover: "rgba(100, 116, 139, 0.1)" },
    };
    return colors[color] || colors.primary;
  };

  const sizeStyles = getSizeStyles(size);
  const colorStyles = getColorStyles(color);

  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="text"
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={loading ? null : startIcon}
        endIcon={loading ? null : endIcon}
        onClick={onClick}
        sx={{
          color: disabled ? "#94a3b8" : colorStyles.text,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "8px",
          background: "transparent",
          transition: "all 0.3s ease",
          ...sizeStyles,
          "&:hover": {
            background: disabled ? "transparent" : colorStyles.hover,
            transform: disabled || loading ? "none" : "translateY(-1px)",
          },
          "&:active": {
            transform: disabled || loading ? "none" : "translateY(0)",
          },
          "&.Mui-disabled": {
            color: "#94a3b8",
          },
        }}
        {...props}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: colorStyles.text }} />
            {children}
          </Box>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
};

// Danger Button
export const ModernDangerButton = ({
  children,
  loading = false,
  disabled = false,
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  variant = "contained", // 'contained' or 'outlined'
  ...props
}) => {
  const getSizeStyles = (size) => {
    const sizes = {
      small: { padding: "8px 16px", fontSize: "0.75rem" },
      medium: { padding: "12px 24px", fontSize: "0.875rem" },
      large: { padding: "16px 32px", fontSize: "1rem" },
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles(size);

  const containedStyles = {
    background: disabled
      ? "#94a3b8"
      : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    boxShadow: disabled ? "none" : "0 4px 14px 0 rgba(239, 68, 68, 0.39)",
    "&:hover": {
      background: disabled
        ? "#94a3b8"
        : "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      boxShadow: disabled ? "none" : "0 6px 20px 0 rgba(239, 68, 68, 0.49)",
    },
  };

  const outlinedStyles = {
    borderColor: disabled ? "#94a3b8" : "#ef4444",
    color: disabled ? "#94a3b8" : "#ef4444",
    background: "white",
    borderWidth: "2px",
    "&:hover": {
      borderColor: disabled ? "#94a3b8" : "#dc2626",
      background: disabled ? "white" : "rgba(239, 68, 68, 0.1)",
      borderWidth: "2px",
    },
  };

  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={loading ? null : startIcon}
        endIcon={loading ? null : endIcon}
        onClick={onClick}
        sx={{
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          ...sizeStyles,
          ...(variant === "contained" ? containedStyles : outlinedStyles),
          "&:active": {
            transform: disabled || loading ? "none" : "translateY(0)",
          },
          "&.Mui-disabled": {
            ...(variant === "contained"
              ? {
                  background: "#94a3b8",
                  color: "white",
                }
              : {
                  borderColor: "#94a3b8",
                  color: "#94a3b8",
                }),
          },
        }}
        {...props}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress
              size={16}
              sx={{ color: variant === "contained" ? "white" : "#ef4444" }}
            />
            {children}
          </Box>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
};

// Floating Action Button
export const ModernFloatingButton = ({
  children,
  icon,
  loading = false,
  disabled = false,
  size = "medium",
  onClick,
  color = "primary",
  position = { bottom: 24, right: 24 },
  ...props
}) => {
  const getSizeStyles = (size) => {
    const sizes = {
      small: { width: 48, height: 48, fontSize: "1.25rem" },
      medium: { width: 56, height: 56, fontSize: "1.5rem" },
      large: { width: 64, height: 64, fontSize: "1.75rem" },
    };
    return sizes[size] || sizes.medium;
  };

  const getColorStyles = (color) => {
    const colors = {
      primary: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    };
    return colors[color] || colors.primary;
  };

  const sizeStyles = getSizeStyles(size);
  const backgroundGradient = getColorStyles(color);

  return (
    <motion.div
      style={{
        position: "fixed",
        zIndex: 1000,
        ...position,
      }}
      whileHover={{ scale: disabled || loading ? 1 : 1.1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="contained"
        disabled={disabled || loading}
        onClick={onClick}
        sx={{
          ...sizeStyles,
          borderRadius: "50%",
          minWidth: "auto",
          padding: 0,
          background: disabled ? "#94a3b8" : backgroundGradient,
          color: "white",
          boxShadow: disabled ? "none" : "0 8px 25px 0 rgba(99, 102, 241, 0.4)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: disabled ? "#94a3b8" : backgroundGradient,
            boxShadow: disabled
              ? "none"
              : "0 12px 30px 0 rgba(99, 102, 241, 0.5)",
            filter: disabled ? "none" : "brightness(1.1)",
          },
          "&.Mui-disabled": {
            background: "#94a3b8",
            color: "white",
          },
        }}
        {...props}
      >
        {loading ? (
          <CircularProgress
            size={sizeStyles.width * 0.4}
            sx={{ color: "white" }}
          />
        ) : (
          icon || children
        )}
      </Button>
    </motion.div>
  );
};

export default {
  ModernPrimaryButton,
  ModernSecondaryButton,
  ModernGhostButton,
  ModernDangerButton,
  ModernFloatingButton,
};

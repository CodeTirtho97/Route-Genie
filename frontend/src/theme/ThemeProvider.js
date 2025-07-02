import React from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import modernTheme from "./modernTheme";

const ThemeProvider = ({ children }) => {
  return (
    <MUIThemeProvider theme={modernTheme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MUIThemeProvider>
  );
};

export default ThemeProvider;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider";
import "./styles/modernGlobals.css";
import ModernNavbar from "./components/ModernNavbar";
import ModernFooter from "./components/ModernFooter";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import ItineraryDetails from "./pages/ItineraryDetails";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import ManualBookingForm from "./pages/ManualBookingForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ModernNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route
            path="/itinerary/:itineraryId"
            element={<ItineraryDetails />}
          />
          <Route
            path="/bookings/details/:itineraryId"
            element={<BookingDetails />}
          />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/bookings/existing/:itineraryId"
            element={<ManualBookingForm />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ModernFooter />
      </Router>
    </ThemeProvider>
  );
}

export default App;

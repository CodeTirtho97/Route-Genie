import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import ItineraryDetails from "./pages/ItineraryDetails";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import ManualBookingForm from "./pages/ManualBookingForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext"; // ✅ Import AuthContext
import useAutoLogout from "./hooks/useAutoLogout"; // ✅ Import Auto Logout Hook

function App() {
  const { logout } = useContext(AuthContext); // ✅ Get logout function from AuthContext

  useAutoLogout(logout); // ✅ Enable Auto Logout on inactivity

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/itinerary/:itineraryId" element={<ItineraryDetails />} />
        <Route path="/bookings/details/:itineraryId" element={<BookingDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/existing/:itineraryId" element={<ManualBookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

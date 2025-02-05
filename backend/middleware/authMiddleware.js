const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // ✅ Fetch the user for itinerary-related operations
            const user = await User.findById(decoded.id).select("-password");
            
            if (!user) {
                console.error("❌ No user found for this token.");
                return res.status(401).json({ msg: "Not authorized, no user found" });
            }

            // ✅ Attach user object to request (for itineraries)
            req.user = user;

            // ✅ Also attach just the ID (for bookings)
            req.userId = user._id.toString();  

            next();
        } catch (error) {
            console.error("❌ Invalid token:", error);
            return res.status(401).json({ msg: "Not authorized, token failed" });
        }
    } else {
        console.error("❌ No token provided");
        return res.status(401).json({ msg: "Not authorized, no token" });
    }
};

module.exports = protect;

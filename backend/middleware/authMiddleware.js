const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // ✅ Attach user to request

            if (!req.user) {
                return res.status(401).json({ msg: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ msg: "Invalid token" });
        }
    } else {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
};

module.exports = protect;

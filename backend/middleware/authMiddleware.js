const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded.id; // Attach user ID to request object
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = protect;
